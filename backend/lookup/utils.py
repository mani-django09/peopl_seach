import re
import logging
import phonenumbers
from phonenumbers import NumberParseException
import requests
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)


def get_client_ip(request) -> str:
    """
    Get the real client IP address from the request.
    Handles proxy headers like X-Forwarded-For.
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # Take the first IP if there are multiple
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
    
    return ip


def validate_phone_number(phone_input: str) -> Dict[str, Any]:
    """
    Validate and parse phone number using phonenumbers library.
    
    Args:
        phone_input: Raw phone number string
        
    Returns:
        Dict with validation results and normalized number
    """
    try:
        # Clean the input
        cleaned_input = clean_phone_input(phone_input)
        
        if not cleaned_input:
            return {
                'valid': False,
                'error': 'Phone number is required',
                'normalized': None
            }
        
        # Parse the number (default to US if no country code)
        try:
            # Try parsing with country code first
            if cleaned_input.startswith('+'):
                parsed_number = phonenumbers.parse(cleaned_input, None)
            else:
                # Assume US if no country code
                parsed_number = phonenumbers.parse(cleaned_input, "US")
        except NumberParseException as e:
            return {
                'valid': False,
                'error': f'Invalid phone number format: {str(e)}',
                'normalized': None
            }
        
        # Validate the parsed number
        if not phonenumbers.is_valid_number(parsed_number):
            return {
                'valid': False,
                'error': 'Phone number is not valid',
                'normalized': None
            }
        
        # Normalize to E.164 format
        normalized = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
        
        # Get country information
        country_code = phonenumbers.region_code_for_number(parsed_number)
        
        return {
            'valid': True,
            'normalized': normalized,
            'country_code': country_code,
            'error': None
        }
        
    except Exception as e:
        logger.error(f"Phone validation error for '{phone_input}': {str(e)}")
        return {
            'valid': False,
            'error': 'Phone number validation failed',
            'normalized': None
        }


def clean_phone_input(phone_input: str) -> str:
    """
    Clean phone number input by removing unwanted characters.
    
    Args:
        phone_input: Raw phone number string
        
    Returns:
        Cleaned phone number string
    """
    if not phone_input:
        return ''
    
    # Remove common formatting characters but keep + for country codes
    cleaned = re.sub(r'[^\d+]', '', str(phone_input).strip())
    
    # Ensure we don't have multiple + signs
    if cleaned.count('+') > 1:
        # Keep only the first +
        parts = cleaned.split('+')
        cleaned = '+' + ''.join(parts[1:])
    
    return cleaned


def normalize_phone_number(phone_input: str, default_country: str = "US") -> Optional[str]:
    """
    Normalize phone number to E.164 format.
    
    Args:
        phone_input: Raw phone number string
        default_country: Default country code if none provided
        
    Returns:
        E.164 formatted phone number or None if invalid
    """
    validation_result = validate_phone_number(phone_input)
    return validation_result.get('normalized') if validation_result['valid'] else None


def query_numverify_api(phone_number: str, api_key: str) -> Dict[str, Any]:
    """
    Query the NumVerify API for phone number information.
    
    Args:
        phone_number: E.164 formatted phone number (without +)
        api_key: NumVerify API key
        
    Returns:
        API response as dictionary
    """
    try:
        # Remove + if present
        clean_number = phone_number.lstrip('+')
        
        url = "http://apilayer.net/api/validate"
        params = {
            'access_key': api_key,
            'number': clean_number,
            'country_code': '',  # Auto-detect
            'format': 1  # JSON format
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        return response.json()
        
    except requests.RequestException as e:
        logger.error(f"NumVerify API request failed: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"NumVerify API error: {str(e)}")
        raise


def map_numverify_response(api_response: Dict[str, Any], normalized_number: str) -> Dict[str, Any]:
    """
    Map NumVerify API response to our standard format.
    
    Args:
        api_response: Raw NumVerify API response
        normalized_number: E.164 formatted phone number
        
    Returns:
        Standardized response dictionary
    """
    try:
        # Handle API errors
        if not api_response.get('valid', False):
            return {
                'number': normalized_number,
                'valid': False,
                'country_code': None,
                'country_name': None,
                'location': None,
                'carrier': None,
                'line_type': None,
                'source': 'numverify',
                'error': 'Phone number not found or invalid'
            }
        
        # Map successful response
        return {
            'number': normalized_number,
            'valid': True,
            'country_code': api_response.get('country_code', '').upper(),
            'country_name': api_response.get('country_name', ''),
            'location': format_location(
                api_response.get('location', ''),
                api_response.get('country_code', '')
            ),
            'carrier': api_response.get('carrier', ''),
            'line_type': map_line_type(api_response.get('line_type', '')),
            'source': 'numverify'
        }
        
    except Exception as e:
        logger.error(f"Response mapping error: {str(e)}")
        return {
            'number': normalized_number,
            'valid': False,
            'error': 'Failed to process API response',
            'source': 'numverify'
        }


def format_location(location: str, country_code: str) -> str:
    """
    Format location string for display.
    
    Args:
        location: Raw location from API
        country_code: Country code
        
    Returns:
        Formatted location string
    """
    if not location:
        return ''
    
    # Add country code suffix if US
    if country_code and country_code.upper() == 'US' and location:
        # Check if location already has state info
        if ',' not in location:
            return f"{location}, US"
    
    return location


def map_line_type(line_type: str) -> str:
    """
    Map line type to standardized values.
    
    Args:
        line_type: Raw line type from API
        
    Returns:
        Standardized line type
    """
    if not line_type:
        return 'unknown'
    
    line_type_lower = line_type.lower()
    
    # Map common line types
    if 'mobile' in line_type_lower or 'cell' in line_type_lower:
        return 'mobile'
    elif 'landline' in line_type_lower or 'fixed' in line_type_lower:
        return 'landline'
    elif 'voip' in line_type_lower:
        return 'voip'
    elif 'toll' in line_type_lower:
        return 'toll_free'
    else:
        return line_type_lower


def is_valid_us_phone(phone_number: str) -> bool:
    """
    Quick validation for US phone numbers.
    
    Args:
        phone_number: Phone number string
        
    Returns:
        True if appears to be valid US phone number
    """
    # Clean the number
    cleaned = re.sub(r'[^\d]', '', phone_number)
    
    # US numbers should be 10 or 11 digits
    if len(cleaned) == 10:
        # Standard 10-digit US number
        return cleaned[0] not in '01' and cleaned[3] not in '01'
    elif len(cleaned) == 11 and cleaned[0] == '1':
        # 11-digit with country code
        return cleaned[1] not in '01' and cleaned[4] not in '01'
    
    return False


def generate_phone_suggestions(invalid_input: str) -> list:
    """
    Generate phone number format suggestions for invalid inputs.
    
    Args:
        invalid_input: The invalid phone number input
        
    Returns:
        List of suggested formats
    """
    suggestions = []
    
    # Extract digits only
    digits = re.sub(r'[^\d]', '', invalid_input)
    
    if len(digits) == 10:
        # Format as US number
        formatted = f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
        suggestions.append(formatted)
        suggestions.append(f"+1{digits}")
    elif len(digits) == 11 and digits[0] == '1':
        # Remove leading 1 and format
        us_digits = digits[1:]
        formatted = f"({us_digits[:3]}) {us_digits[3:6]}-{us_digits[6:]}"
        suggestions.append(formatted)
        suggestions.append(f"+{digits}")
    
    return suggestions[:3]  # Limit to 3 suggestions


def sanitize_user_input(input_str: str) -> str:
    """
    Sanitize user input to prevent XSS and other attacks.
    
    Args:
        input_str: Raw user input
        
    Returns:
        Sanitized string
    """
    if not input_str:
        return ''
    
    # Convert to string and strip
    sanitized = str(input_str).strip()
    
    # Remove potentially dangerous characters
    dangerous_chars = ['<', '>', '"', "'", '&', '\n', '\r', '\t']
    for char in dangerous_chars:
        sanitized = sanitized.replace(char, '')
    
    # Limit length
    return sanitized[:100]


def calculate_cache_ttl(response_data: Dict[str, Any]) -> int:
    """
    Calculate cache TTL based on response data quality.
    
    Args:
        response_data: API response data
        
    Returns:
        TTL in seconds
    """
    base_ttl = 7 * 24 * 3600  # 7 days in seconds
    
    # Reduce TTL for invalid numbers
    if not response_data.get('valid', False):
        return base_ttl // 2  # 3.5 days for invalid numbers
    
    # Increase TTL for complete data
    has_carrier = bool(response_data.get('carrier'))
    has_location = bool(response_data.get('location'))
    
    if has_carrier and has_location:
        return base_ttl  # Full 7 days
    elif has_carrier or has_location:
        return int(base_ttl * 0.75)  # ~5 days
    else:
        return base_ttl // 2  # 3.5 days for minimal data
    
    return base_ttl


def format_phone_for_display(phone_number: str) -> str:
    """
    Format phone number for user-friendly display.
    
    Args:
        phone_number: E.164 formatted phone number
        
    Returns:
        Formatted phone number for display
    """
    try:
        parsed = phonenumbers.parse(phone_number, None)
        country_code = phonenumbers.region_code_for_number(parsed)
        
        if country_code == 'US':
            # Format US numbers as (XXX) XXX-XXXX
            return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.NATIONAL)
        else:
            # Format international numbers
            return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
            
    except Exception as e:
        logger.warning(f"Phone formatting error for {phone_number}: {str(e)}")
        return phone_number


def extract_area_code(phone_number: str) -> Optional[str]:
    """
    Extract area code from phone number.
    
    Args:
        phone_number: Phone number string
        
    Returns:
        Area code or None if not found/applicable
    """
    try:
        parsed = phonenumbers.parse(phone_number, None)
        
        # Only extract area code for US/Canada numbers
        country_code = phonenumbers.region_code_for_number(parsed)
        if country_code in ['US', 'CA']:
            national_number = str(parsed.national_number)
            if len(national_number) >= 10:
                return national_number[:3]
                
    except Exception as e:
        logger.warning(f"Area code extraction error for {phone_number}: {str(e)}")
    
    return None


def get_phone_number_type_description(line_type: str) -> str:
    """
    Get user-friendly description of phone line type.
    
    Args:
        line_type: Line type from API
        
    Returns:
        User-friendly description
    """
    descriptions = {
        'mobile': 'Mobile/Cellular phone',
        'landline': 'Landline phone',
        'voip': 'Voice over IP (VoIP)',
        'toll_free': 'Toll-free number',
        'premium': 'Premium rate number',
        'unknown': 'Unknown phone type'
    }
    
    return descriptions.get(line_type, f'{line_type.title()} phone')


def is_phone_number_suspicious(phone_number: str, response_data: Dict[str, Any]) -> bool:
    """
    Check if phone number shows suspicious characteristics.
    
    Args:
        phone_number: Phone number to check
        response_data: API response data
        
    Returns:
        True if suspicious patterns detected
    """
    try:
        # Check for common suspicious patterns
        digits = re.sub(r'[^\d]', '', phone_number)
        
        # All same digits (like 1111111111)
        if len(set(digits)) == 1:
            return True
            
        # Sequential digits (like 1234567890)
        if digits in '01234567890123456789':
            return True
            
        # Invalid area codes (555-01XX are reserved for movies/TV)
        if len(digits) >= 6 and digits[3:6] == '555' and digits[6:8] in ['01']:
            return True
            
        # Check if marked as invalid but somehow got through
        if not response_data.get('valid', True):
            return True
            
    except Exception as e:
        logger.warning(f"Suspicious number check error: {str(e)}")
    
    return False