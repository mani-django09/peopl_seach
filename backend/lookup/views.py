from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.cache import cache
import json
import logging
import phonenumbers
from phonenumbers import NumberParseException, PhoneNumberFormat
from .models import SearchLog
from .utils import get_client_ip, validate_phone_number

logger = logging.getLogger(__name__)

# ==================== US AREA CODE TO LOCATION MAPPING ====================
US_AREA_CODE_LOCATIONS = {
    # New York
    '212': 'Manhattan, New York', '646': 'Manhattan, New York', '332': 'Manhattan, New York',
    '718': 'Brooklyn/Queens, New York', '347': 'Brooklyn/Queens, New York', '929': 'Brooklyn/Queens, New York',
    '917': 'New York City, New York', '845': 'Hudson Valley, New York', '914': 'Westchester County, New York',
    '516': 'Long Island, New York', '631': 'Long Island, New York', '585': 'Rochester, New York',
    '716': 'Buffalo, New York', '315': 'Syracuse, New York', '518': 'Albany, New York',
    
    # California
    '213': 'Los Angeles, California', '310': 'Los Angeles, California', '323': 'Los Angeles, California',
    '424': 'Los Angeles, California', '747': 'Los Angeles, California', '818': 'San Fernando Valley, California',
    '415': 'San Francisco, California', '628': 'San Francisco, California', '510': 'Oakland, California',
    '408': 'San Jose, California', '669': 'San Jose, California', '650': 'San Mateo, California',
    '925': 'Contra Costa County, California', '831': 'Monterey, California', '559': 'Fresno, California',
    '916': 'Sacramento, California', '619': 'San Diego, California', '858': 'San Diego, California',
    '760': 'Palm Springs, California', '951': 'Riverside, California',
    
    # Florida
    '305': 'Miami, Florida', '786': 'Miami, Florida', '954': 'Fort Lauderdale, Florida',
    '754': 'Fort Lauderdale, Florida', '561': 'West Palm Beach, Florida', '772': 'Port St. Lucie, Florida',
    '407': 'Orlando, Florida', '321': 'Orlando, Florida', '689': 'Orlando, Florida',
    '813': 'Tampa, Florida', '727': 'St. Petersburg, Florida', '941': 'Sarasota, Florida',
    '239': 'Naples, Florida', '904': 'Jacksonville, Florida', '850': 'Tallahassee, Florida',
    
    # Texas
    '214': 'Dallas, Texas', '469': 'Dallas, Texas', '972': 'Dallas, Texas', '945': 'Dallas, Texas',
    '713': 'Houston, Texas', '281': 'Houston, Texas', '832': 'Houston, Texas', '346': 'Houston, Texas',
    '210': 'San Antonio, Texas', '726': 'San Antonio, Texas', '512': 'Austin, Texas', '737': 'Austin, Texas',
    '817': 'Fort Worth, Texas', '682': 'Fort Worth, Texas', '915': 'El Paso, Texas',
    '956': 'Laredo, Texas', '361': 'Corpus Christi, Texas',
    
    # Illinois
    '312': 'Chicago, Illinois', '773': 'Chicago, Illinois', '872': 'Chicago, Illinois',
    '630': 'Chicago Suburbs, Illinois', '331': 'Chicago Suburbs, Illinois', '847': 'Chicago Suburbs, Illinois',
    '224': 'Chicago Suburbs, Illinois', '217': 'Springfield, Illinois', '309': 'Peoria, Illinois',
    
    # Georgia
    '404': 'Atlanta, Georgia', '678': 'Atlanta, Georgia', '770': 'Atlanta, Georgia',
    '470': 'Atlanta, Georgia', '762': 'Augusta, Georgia', '912': 'Savannah, Georgia',
    
    # Pennsylvania
    '215': 'Philadelphia, Pennsylvania', '267': 'Philadelphia, Pennsylvania', '445': 'Philadelphia, Pennsylvania',
    '610': 'Philadelphia Suburbs, Pennsylvania', '484': 'Philadelphia Suburbs, Pennsylvania',
    '412': 'Pittsburgh, Pennsylvania', '724': 'Pittsburgh Suburbs, Pennsylvania', '878': 'Pittsburgh, Pennsylvania',
    '717': 'Harrisburg, Pennsylvania', '570': 'Scranton, Pennsylvania',
    
    # Ohio
    '216': 'Cleveland, Ohio', '440': 'Cleveland Suburbs, Ohio', '614': 'Columbus, Ohio',
    '380': 'Columbus, Ohio', '513': 'Cincinnati, Ohio', '937': 'Dayton, Ohio', '419': 'Toledo, Ohio',
    
    # Michigan
    '313': 'Detroit, Michigan', '248': 'Detroit Suburbs, Michigan', '734': 'Ann Arbor, Michigan',
    '616': 'Grand Rapids, Michigan', '517': 'Lansing, Michigan', '810': 'Flint, Michigan',
    
    # Washington
    '206': 'Seattle, Washington', '425': 'Seattle Suburbs, Washington', '253': 'Tacoma, Washington',
    '509': 'Spokane, Washington', '360': 'Olympia, Washington', '564': 'Washington',
    
    # Massachusetts
    '617': 'Boston, Massachusetts', '857': 'Boston, Massachusetts', '781': 'Boston Suburbs, Massachusetts',
    '339': 'Boston Suburbs, Massachusetts', '508': 'Worcester, Massachusetts', '774': 'Worcester, Massachusetts',
    '413': 'Springfield, Massachusetts', '351': 'Massachusetts',
    
    # Arizona
    '602': 'Phoenix, Arizona', '623': 'Phoenix, Arizona', '480': 'Phoenix, Arizona',
    '520': 'Tucson, Arizona', '928': 'Flagstaff, Arizona',
    
    # Nevada
    '702': 'Las Vegas, Nevada', '725': 'Las Vegas, Nevada', '775': 'Reno, Nevada',
    
    # Colorado
    '303': 'Denver, Colorado', '720': 'Denver, Colorado', '970': 'Fort Collins, Colorado',
    '719': 'Colorado Springs, Colorado',
    
    # Oregon
    '503': 'Portland, Oregon', '971': 'Portland, Oregon', '541': 'Eugene, Oregon',
    
    # North Carolina
    '704': 'Charlotte, North Carolina', '980': 'Charlotte, North Carolina', '919': 'Raleigh, North Carolina',
    '984': 'Raleigh, North Carolina', '336': 'Greensboro, North Carolina', '910': 'Wilmington, North Carolina',
    
    # Virginia
    '703': 'Northern Virginia', '571': 'Northern Virginia', '804': 'Richmond, Virginia',
    '757': 'Norfolk, Virginia', '540': 'Roanoke, Virginia',
    
    # Maryland
    '301': 'Maryland', '240': 'Maryland', '410': 'Baltimore, Maryland', '443': 'Baltimore, Maryland',
    
    # Washington DC
    '202': 'Washington, DC',
    
    # Tennessee
    '615': 'Nashville, Tennessee', '629': 'Nashville, Tennessee', '901': 'Memphis, Tennessee',
    '423': 'Chattanooga, Tennessee', '865': 'Knoxville, Tennessee',
    
    # Wisconsin
    '414': 'Milwaukee, Wisconsin', '262': 'Milwaukee Suburbs, Wisconsin', '608': 'Madison, Wisconsin',
    '920': 'Green Bay, Wisconsin', '715': 'Eau Claire, Wisconsin',
    
    # Minnesota
    '612': 'Minneapolis, Minnesota', '651': 'St. Paul, Minnesota', '763': 'Minneapolis Suburbs, Minnesota',
    '952': 'Minneapolis Suburbs, Minnesota', '320': 'St. Cloud, Minnesota', '507': 'Rochester, Minnesota',
    
    # Missouri
    '314': 'St. Louis, Missouri', '636': 'St. Louis Suburbs, Missouri', '816': 'Kansas City, Missouri',
    '417': 'Springfield, Missouri', '573': 'Columbia, Missouri',
    
    # Indiana
    '317': 'Indianapolis, Indiana', '463': 'Indianapolis, Indiana', '812': 'Evansville, Indiana',
    '219': 'Gary, Indiana', '260': 'Fort Wayne, Indiana', '574': 'South Bend, Indiana',
    
    # Louisiana
    '504': 'New Orleans, Louisiana', '985': 'New Orleans Suburbs, Louisiana', '225': 'Baton Rouge, Louisiana',
    '318': 'Shreveport, Louisiana', '337': 'Lafayette, Louisiana',
    
    # Kentucky
    '502': 'Louisville, Kentucky', '859': 'Lexington, Kentucky', '270': 'Bowling Green, Kentucky',
    
    # Alabama
    '205': 'Birmingham, Alabama', '659': 'Birmingham, Alabama', '256': 'Huntsville, Alabama',
    '334': 'Montgomery, Alabama', '251': 'Mobile, Alabama',
    
    # South Carolina
    '803': 'Columbia, South Carolina', '843': 'Charleston, South Carolina', '864': 'Greenville, South Carolina',
    
    # Oklahoma
    '405': 'Oklahoma City, Oklahoma', '918': 'Tulsa, Oklahoma', '580': 'Lawton, Oklahoma',
    
    # Connecticut
    '203': 'New Haven, Connecticut', '475': 'New Haven, Connecticut', '860': 'Hartford, Connecticut',
    '959': 'Hartford, Connecticut',
    
    # Iowa
    '515': 'Des Moines, Iowa', '319': 'Cedar Rapids, Iowa', '563': 'Davenport, Iowa',
    
    # Arkansas
    '501': 'Little Rock, Arkansas', '479': 'Fayetteville, Arkansas', '870': 'Jonesboro, Arkansas',
    
    # Mississippi
    '601': 'Jackson, Mississippi', '662': 'Tupelo, Mississippi', '228': 'Gulfport, Mississippi',
    
    # Kansas
    '316': 'Wichita, Kansas', '785': 'Topeka, Kansas', '913': 'Kansas City, Kansas',
    
    # New Mexico
    '505': 'Albuquerque, New Mexico', '575': 'Las Cruces, New Mexico',
    
    # Nebraska
    '402': 'Omaha, Nebraska', '531': 'Omaha, Nebraska', '308': 'Grand Island, Nebraska',
    
    # West Virginia
    '304': 'Charleston, West Virginia', '681': 'West Virginia',
    
    # Idaho
    '208': 'Boise, Idaho', '986': 'Idaho',
    
    # Hawaii
    '808': 'Hawaii',
    
    # Alaska
    '907': 'Alaska',
    
    # Maine
    '207': 'Maine',
    
    # New Hampshire
    '603': 'New Hampshire',
    
    # Vermont
    '802': 'Vermont',
    
    # Rhode Island
    '401': 'Rhode Island',
    
    # Delaware
    '302': 'Delaware',
    
    # Montana
    '406': 'Montana',
    
    # Wyoming
    '307': 'Wyoming',
    
    # North Dakota
    '701': 'North Dakota',
    
    # South Dakota
    '605': 'South Dakota',
    
    # Utah
    '801': 'Salt Lake City, Utah', '385': 'Salt Lake City, Utah', '435': 'Provo, Utah',
}

# ==================== US AREA CODE TO CARRIER MAPPING ====================
US_AREA_CODE_CARRIERS = {
    '212': 'Verizon Wireless', '646': 'Verizon Wireless', '718': 'T-Mobile',
    '347': 'T-Mobile', '917': 'Verizon Wireless', '929': 'Metro PCS',
    '310': 'AT&T Wireless', '323': 'T-Mobile', '213': 'AT&T Wireless',
    '424': 'Verizon Wireless', '818': 'AT&T Wireless', '415': 'Verizon Wireless',
    '628': 'T-Mobile', '510': 'AT&T Wireless', '408': 'Verizon Wireless',
    '669': 'T-Mobile', '650': 'AT&T Wireless', '925': 'AT&T Wireless',
    '305': 'T-Mobile', '786': 'Metro PCS', '954': 'AT&T Wireless',
    '561': 'Verizon Wireless', '407': 'T-Mobile', '321': 'Verizon Wireless',
    '813': 'Verizon Wireless', '727': 'AT&T Wireless', '904': 'AT&T Wireless',
    '404': 'AT&T Wireless', '678': 'T-Mobile', '770': 'Verizon Wireless',
    '470': 'Sprint', '312': 'Verizon Wireless', '773': 'T-Mobile',
    '872': 'AT&T Wireless', '630': 'AT&T Wireless', '847': 'Verizon Wireless',
    '702': 'T-Mobile', '725': 'AT&T Wireless', '303': 'Verizon Wireless',
    '720': 'T-Mobile', '206': 'T-Mobile', '425': 'Verizon Wireless',
    '253': 'AT&T Wireless', '503': 'Verizon Wireless', '971': 'T-Mobile',
    '602': 'Verizon Wireless', '623': 'AT&T Wireless', '480': 'T-Mobile',
    '520': 'AT&T Wireless', '928': 'Verizon Wireless', '214': 'AT&T Wireless',
    '469': 'Verizon Wireless', '972': 'T-Mobile', '713': 'AT&T Wireless',
    '281': 'Verizon Wireless', '832': 'T-Mobile', '210': 'AT&T Wireless',
    '512': 'Verizon Wireless', '737': 'T-Mobile', '817': 'AT&T Wireless',
    '202': 'Verizon Wireless', '301': 'AT&T Wireless', '240': 'T-Mobile',
    '410': 'Verizon Wireless', '443': 'T-Mobile', '571': 'Verizon Wireless',
    '703': 'AT&T Wireless', '804': 'Verizon Wireless', '757': 'AT&T Wireless',
    '617': 'Verizon Wireless', '857': 'T-Mobile', '781': 'AT&T Wireless',
    '508': 'Verizon Wireless', '413': 'AT&T Wireless', '215': 'Verizon Wireless',
    '267': 'T-Mobile', '610': 'Verizon Wireless', '484': 'T-Mobile',
    '412': 'Verizon Wireless', '724': 'AT&T Wireless', '216': 'Verizon Wireless',
    '614': 'AT&T Wireless', '513': 'Verizon Wireless', '313': 'T-Mobile',
}


@require_http_methods(["GET"])
def health_check(request):
    """API health check endpoint"""
    return JsonResponse({
        'status': 'healthy',
        'message': 'NumberLookup.us API - US Numbers Only',
        'timestamp': timezone.now().isoformat(),
        'version': '1.0.0',
        'supported_countries': ['United States'],
        'area_codes_supported': len(US_AREA_CODE_LOCATIONS)
    })


@require_http_methods(["GET"])
def phone_search(request, number):
    """
    Main phone search endpoint - US numbers only
    
    Args:
        number: Phone number (should be 11 digits starting with 1 for US)
        
    Returns:
        JSON with phone information or error
    """
    try:
        logger.info(f"=== Phone search for: {number} ===")
        
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Validate phone number
        validation = validate_phone_number(number)
        if not validation['valid']:
            logger.error(f"Validation failed: {validation['error']}")
            return JsonResponse({
                'error': validation['error'],
                'number': number,
                'valid': False
            }, status=400)
        
        normalized_number = validation['normalized']
        logger.info(f"Normalized: {normalized_number}")
        
        # Check if it's a US number
        if not normalized_number.startswith('+1'):
            return JsonResponse({
                'error': 'Only US phone numbers are supported',
                'number': number,
                'valid': False,
                'suggestion': 'Please enter a valid 10-digit US phone number'
            }, status=400)
        
        # Check cache first
        cache_key = f"phone_us:{normalized_number}"
        cached_result = cache.get(cache_key)
        
        if cached_result:
            logger.info(f"Cache HIT for {normalized_number}")
            cached_result['cached'] = True
            
            SearchLog.objects.create(
                phone_number=number,
                normalized_number=normalized_number,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='cache',
                cache_hit=True
            )
            
            return JsonResponse(cached_result)
        
        logger.info(f"Cache MISS - processing {normalized_number}")
        
        # Parse the US number
        try:
            parsed_number = phonenumbers.parse(normalized_number, None)
            
            if not phonenumbers.is_valid_number(parsed_number):
                return JsonResponse({
                    'error': 'Invalid US phone number',
                    'number': number,
                    'valid': False
                }, status=400)
            
            region_code = phonenumbers.region_code_for_number(parsed_number)
            
            # Double-check it's US
            if region_code != 'US':
                return JsonResponse({
                    'error': 'Only US phone numbers are supported',
                    'number': number,
                    'valid': False
                }, status=400)
            
            # Format for display
            formatted = phonenumbers.format_number(parsed_number, PhoneNumberFormat.NATIONAL)
            
            # Get line type
            number_type = phonenumbers.number_type(parsed_number)
            line_type_map = {
                phonenumbers.PhoneNumberType.MOBILE: 'mobile',
                phonenumbers.PhoneNumberType.FIXED_LINE: 'landline',
                phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE: 'mobile',
                phonenumbers.PhoneNumberType.TOLL_FREE: 'toll_free',
                phonenumbers.PhoneNumberType.VOIP: 'voip',
            }
            line_type = line_type_map.get(number_type, 'mobile')
            
            # Get area code and lookup location/carrier
            national_str = str(parsed_number.national_number)
            area_code = national_str[:3] if len(national_str) >= 10 else None
            
            location = 'United States'
            carrier = 'Wireless Carrier'
            
            if area_code:
                location = US_AREA_CODE_LOCATIONS.get(area_code, f'Area Code {area_code}, United States')
                carrier = US_AREA_CODE_CARRIERS.get(area_code, 'Wireless Carrier')
            
            # Build result
            result = {
                'number': normalized_number,
                'formatted_number': formatted,
                'valid': True,
                'country_code': 'US',
                'country_name': 'United States',
                'location': location,
                'carrier': carrier,
                'line_type': line_type,
                'area_code': area_code,
                'source': 'phonenumbers',
                'cached': False,
                'affiliate_url': 'https://www.truthfinder.com/?a=default&o=100265&utm_source=numberlookup'
            }
            
            logger.info(f"Result: Location={location}, Carrier={carrier}")
            
            # Cache for 1 hour
            cache.set(cache_key, result, 3600)
            
            # Log search
            try:
                SearchLog.objects.create(
                    phone_number=number,
                    normalized_number=normalized_number,
                    ip_address=client_ip,
                    user_agent=user_agent,
                    found_results=True,
                    api_source='phonenumbers',
                    cache_hit=False
                )
            except Exception as e:
                logger.error(f"Failed to log search: {e}")
            
            return JsonResponse(result)
            
        except NumberParseException as e:
            logger.error(f"Parse error: {str(e)}")
            return JsonResponse({
                'error': f'Unable to parse phone number: {str(e)}',
                'number': number,
                'valid': False
            }, status=400)
            
    except Exception as e:
        logger.error(f"Search error: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Search failed',
            'number': number,
            'valid': False,
            'message': 'Please try again'
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def track_affiliate_click(request):
    """Track affiliate link clicks"""
    try:
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST.dict()
        
        phone_number = data.get('phone_number', '')
        affiliate_name = data.get('affiliate_name', 'truthfinder')
        client_ip = get_client_ip(request)
        
        logger.info(f"Affiliate click: {affiliate_name} for {phone_number} from {client_ip}")
        
        return JsonResponse({
            'success': True,
            'message': 'Click tracked successfully'
        })
        
    except Exception as e:
        logger.error(f"Tracking error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Tracking failed'
        }, status=500)


@require_http_methods(["GET"])
def test_api(request):
    """Test endpoint with sample US numbers"""
    return JsonResponse({
        'status': 'healthy',
        'message': 'API supports US phone numbers only',
        'timestamp': timezone.now().isoformat(),
        'version': '1.0.0',
        'supported_countries': ['United States'],
        'area_codes_count': len(US_AREA_CODE_LOCATIONS),
        'test_numbers': {
            'new_york': '+1 (718) 222-2222',
            'los_angeles': '+1 (310) 555-1234',
            'chicago': '+1 (312) 555-5678',
            'miami': '+1 (305) 555-9999'
        },
        'sample_area_codes': list(US_AREA_CODE_LOCATIONS.keys())[:20]
    })
    





@require_http_methods(["GET"])
def people_search(request):
    """
    People search endpoint - Search by name and optional location
    
    Args:
        first_name: First name to search
        last_name: Last name to search
        city: Optional city
        state: Optional state
        
    Returns:
        JSON with search results or error
    """
    try:
        first_name = request.GET.get('first_name', '').strip()
        last_name = request.GET.get('last_name', '').strip()
        city = request.GET.get('city', '').strip()
        state = request.GET.get('state', '').strip()
        
        logger.info(f"=== People search: {first_name} {last_name} ===")
        
        if not first_name and not last_name:
            return JsonResponse({
                'error': 'Please provide at least a first name or last name',
                'success': False
            }, status=400)
        
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Build search query
        full_name = f"{first_name} {last_name}".strip()
        
        # Check cache first
        cache_key = f"people:{full_name.lower().replace(' ', '_')}"
        if city:
            cache_key += f":{city.lower()}"
        if state:
            cache_key += f":{state.lower()}"
            
        cached_result = cache.get(cache_key)
        
        if cached_result:
            logger.info(f"Cache HIT for {full_name}")
            cached_result['cached'] = True
            
            SearchLog.objects.create(
                phone_number=full_name,
                normalized_number=full_name,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='cache',
                cache_hit=True
            )
            
            return JsonResponse(cached_result)
        
        logger.info(f"Cache MISS - processing {full_name}")
        
        # Since we don't have a real people search API, return mock data
        # In production, you would integrate with services like:
        # - Whitepages API
        # - Pipl API
        # - PeopleFinders API
        # - TruthFinder API
        
        # Mock response based on name
        result = {
            'success': True,
            'query': {
                'first_name': first_name,
                'last_name': last_name,
                'city': city,
                'state': state,
                'full_name': full_name
            },
            'results': [
                {
                    'name': full_name,
                    'age': '35-40',
                    'current_address': {
                        'street': '123 Main Street',
                        'city': city if city else 'New York',
                        'state': state if state else 'NY',
                        'zip': '10001'
                    },
                    'phone_numbers': [
                        {
                            'number': '(555) 123-4567',
                            'type': 'Mobile',
                            'carrier': 'Verizon Wireless'
                        }
                    ],
                    'relatives': [
                        'Jane Doe (Spouse)',
                        'John Doe Sr. (Parent)',
                        'Emily Doe (Child)'
                    ],
                    'past_addresses': [
                        {
                            'street': '456 Oak Avenue',
                            'city': 'Los Angeles',
                            'state': 'CA',
                            'zip': '90001',
                            'years': '2015-2020'
                        }
                    ],
                    'email_addresses': [
                        f"{first_name.lower()}.{last_name.lower()}@example.com"
                    ],
                    'social_media': {
                        'facebook': f"https://facebook.com/{first_name.lower()}{last_name.lower()}",
                        'linkedin': f"https://linkedin.com/in/{first_name.lower()}-{last_name.lower()}"
                    }
                }
            ],
            'total_results': 1,
            'source': 'mock_data',
            'cached': False,
            'affiliate_url': 'https://www.truthfinder.com/?a=default&o=100265&utm_source=numberlookup',
            'message': 'This is demo data. Connect a real people search API for production use.'
        }
        
        # Cache for 1 hour
        cache.set(cache_key, result, 3600)
        
        # Log search
        try:
            SearchLog.objects.create(
                phone_number=full_name,
                normalized_number=full_name,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='mock_data',
                cache_hit=False
            )
        except Exception as e:
            logger.error(f"Failed to log search: {e}")
        
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"People search error: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Search failed',
            'success': False,
            'message': 'Please try again'
        }, status=500)
        
        
        
        
        




# Add this to your existing views.py file

@require_http_methods(["GET"])
def address_search(request):
    """
    Address search endpoint - Find property records and residents by address
    
    Args:
        street: Street address
        city: City name
        state: State code (e.g., CA, NY)
        zip_code: ZIP code (optional)
        
    Returns:
        JSON with property information or error
    """
    try:
        street = request.GET.get('street', '').strip()
        city = request.GET.get('city', '').strip()
        state = request.GET.get('state', '').strip()
        zip_code = request.GET.get('zip_code', '').strip()
        
        logger.info(f"=== Address search: {street}, {city}, {state} ===")
        
        if not street or not city or not state:
            return JsonResponse({
                'error': 'Please provide street, city, and state',
                'success': False
            }, status=400)
        
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Build full address
        full_address = f"{street}, {city}, {state}"
        if zip_code:
            full_address += f" {zip_code}"
        
        # Check cache first
        cache_key = f"address:{street.lower().replace(' ', '_')}:{city.lower()}:{state.lower()}"
        if zip_code:
            cache_key += f":{zip_code}"
            
        cached_result = cache.get(cache_key)
        
        if cached_result:
            logger.info(f"Cache HIT for {full_address}")
            cached_result['cached'] = True
            
            SearchLog.objects.create(
                phone_number=full_address,
                normalized_number=full_address,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='cache',
                cache_hit=True
            )
            
            return JsonResponse(cached_result)
        
        logger.info(f"Cache MISS - processing {full_address}")
        
        # In production, integrate with real property APIs like:
        # - Zillow API
        # - Redfin API
        # - Attom Data Solutions
        # - CoreLogic
        # For now, return mock data
        
        # Generate mock property data based on address
        property_value = 250000 + (hash(street) % 500000)
        year_built = 1950 + (hash(city) % 70)
        sqft = 1200 + (hash(street + city) % 2000)
        
        result = {
            'success': True,
            'query': {
                'street': street,
                'city': city,
                'state': state,
                'zip_code': zip_code,
                'full_address': full_address
            },
            'property': {
                'address': {
                    'street': street,
                    'city': city,
                    'state': state,
                    'zip_code': zip_code or '10001',
                    'county': 'Sample County',
                    'formatted': full_address
                },
                'details': {
                    'property_type': 'Single Family Home',
                    'year_built': year_built,
                    'square_feet': sqft,
                    'lot_size': f"{sqft * 2} sqft",
                    'bedrooms': 3,
                    'bathrooms': 2,
                    'stories': 2,
                    'garage': '2-car attached',
                    'heating': 'Forced air, natural gas',
                    'cooling': 'Central A/C'
                },
                'value': {
                    'estimated_value': f"${property_value:,}",
                    'tax_assessment': f"${int(property_value * 0.85):,}",
                    'last_sale_price': f"${int(property_value * 0.92):,}",
                    'last_sale_date': '2020-03-15',
                    'price_per_sqft': f"${int(property_value / sqft)}"
                },
                'tax_info': {
                    'annual_tax': f"${int(property_value * 0.012):,}",
                    'tax_year': '2024',
                    'parcel_number': f"APN-{hash(street) % 10000:04d}",
                    'exemptions': []
                },
                'owner': {
                    'name': 'John & Jane Doe',
                    'owner_type': 'Individual',
                    'ownership_years': '5 years',
                    'mailing_address': full_address
                },
                'residents': [
                    {
                        'name': 'John Doe',
                        'age_range': '45-50',
                        'length_of_residence': '5 years',
                        'phone_numbers': ['(555) 123-4567']
                    },
                    {
                        'name': 'Jane Doe',
                        'age_range': '40-45',
                        'length_of_residence': '5 years',
                        'phone_numbers': ['(555) 123-4568']
                    }
                ],
                'past_residents': [
                    {
                        'name': 'Robert Smith',
                        'years_lived': '2015-2019',
                        'age_range': '55-60'
                    },
                    {
                        'name': 'Mary Smith',
                        'years_lived': '2015-2019',
                        'age_range': '50-55'
                    }
                ],
                'sale_history': [
                    {
                        'date': '2020-03-15',
                        'price': f"${int(property_value * 0.92):,}",
                        'type': 'Sold'
                    },
                    {
                        'date': '2019-11-20',
                        'price': f"${int(property_value * 0.91):,}",
                        'type': 'Listed'
                    },
                    {
                        'date': '2015-07-10',
                        'price': f"${int(property_value * 0.75):,}",
                        'type': 'Sold'
                    }
                ],
                'neighborhood': {
                    'school_rating': '8/10',
                    'crime_rating': 'Low',
                    'walkability_score': 65,
                    'transit_score': 45,
                    'median_home_value': f"${property_value:,}",
                    'median_rent': f"${int(property_value * 0.004):,}/month"
                }
            },
            'source': 'mock_data',
            'cached': False,
            'affiliate_url': 'https://www.truthfinder.com/?a=default&o=100265&utm_source=numberlookup',
            'message': 'This is demo data. Connect a real property API for production use.'
        }
        
        # Cache for 1 hour
        cache.set(cache_key, result, 3600)
        
        # Log search
        try:
            SearchLog.objects.create(
                phone_number=full_address,
                normalized_number=full_address,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='mock_data',
                cache_hit=False
            )
        except Exception as e:
            logger.error(f"Failed to log search: {e}")
        
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"Address search error: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Search failed',
            'success': False,
            'message': 'Please try again'
        }, status=500)


# Add this to your existing views.py file

@require_http_methods(["GET"])
def background_check_search(request):
    """
    Background check endpoint - Search for comprehensive background information
    
    Args:
        first_name: First name to search
        last_name: Last name to search
        city: Optional city
        state: Optional state
        
    Returns:
        JSON with background check results or error
    """
    try:
        first_name = request.GET.get('first_name', '').strip()
        last_name = request.GET.get('last_name', '').strip()
        city = request.GET.get('city', '').strip()
        state = request.GET.get('state', '').strip()
        
        logger.info(f"=== Background check: {first_name} {last_name} ===")
        
        if not first_name or not last_name:
            return JsonResponse({
                'error': 'Please provide both first name and last name',
                'success': False
            }, status=400)
        
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Build search query
        full_name = f"{first_name} {last_name}".strip()
        
        # Check cache first
        cache_key = f"background:{full_name.lower().replace(' ', '_')}"
        if city:
            cache_key += f":{city.lower()}"
        if state:
            cache_key += f":{state.lower()}"
            
        cached_result = cache.get(cache_key)
        
        if cached_result:
            logger.info(f"Cache HIT for {full_name}")
            cached_result['cached'] = True
            
            SearchLog.objects.create(
                phone_number=full_name,
                normalized_number=full_name,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='cache',
                cache_hit=True
            )
            
            return JsonResponse(cached_result)
        
        logger.info(f"Cache MISS - processing {full_name}")
        
        # In production, integrate with background check APIs like:
        # - Checkr API
        # - GoodHire API
        # - Accurate Background
        # - Sterling Check
        # For now, return mock data
        
        # Mock background check data
        result = {
            'success': True,
            'query': {
                'first_name': first_name,
                'last_name': last_name,
                'city': city,
                'state': state,
                'full_name': full_name
            },
            'subject': {
                'name': full_name,
                'age': '35-40',
                'current_address': {
                    'street': '123 Main Street',
                    'city': city if city else 'New York',
                    'state': state if state else 'NY',
                    'zip': '10001'
                },
                'aliases': [f'{first_name} D.', f'{first_name[:3]}']
            },
            'criminal_records': {
                'summary': 'No serious criminal records found',
                'records_found': 0,
                'details': []
            },
            'court_records': {
                'civil_cases': 1,
                'traffic_violations': 2,
                'small_claims': 0,
                'details': [
                    {
                        'type': 'Civil Case',
                        'case_number': 'CV-2019-12345',
                        'date': '2019-05-15',
                        'court': 'County Superior Court',
                        'status': 'Closed',
                        'description': 'Contract Dispute'
                    },
                    {
                        'type': 'Traffic Violation',
                        'case_number': 'TR-2020-67890',
                        'date': '2020-08-22',
                        'court': 'Municipal Court',
                        'status': 'Resolved',
                        'description': 'Speeding - 15 over limit'
                    }
                ]
            },
            'property_records': [
                {
                    'address': '123 Main Street',
                    'city': city if city else 'New York',
                    'state': state if state else 'NY',
                    'ownership_type': 'Owner',
                    'value': '$450,000',
                    'purchase_date': '2018-03-10',
                    'purchase_price': '$420,000'
                }
            ],
            'phone_numbers': [
                {'number': '(555) 123-4567', 'type': 'Mobile', 'carrier': 'Verizon'},
                {'number': '(555) 987-6543', 'type': 'Landline', 'carrier': 'AT&T'}
            ],
            'email_addresses': [
                f"{first_name.lower()}.{last_name.lower()}@email.com",
                f"{first_name.lower()}{last_name.lower()}@gmail.com"
            ],
            'employment_history': [
                {
                    'company': 'Tech Corp Inc.',
                    'position': 'Senior Developer',
                    'years': '2015 - Present',
                    'location': f'{city if city else "New York"}, {state if state else "NY"}'
                }
            ],
            'education': [
                {
                    'institution': 'State University',
                    'degree': 'Bachelor of Science',
                    'field': 'Computer Science',
                    'year': '2012'
                }
            ],
            'relatives': [
                f'{first_name[0]}ane {last_name} (Spouse)',
                f'{first_name} {last_name} Sr. (Parent)',
                f'Emily {last_name} (Sibling)'
            ],
            'social_media': [
                {'platform': 'LinkedIn', 'url': f'linkedin.com/in/{first_name.lower()}{last_name.lower()}', 'verified': True},
                {'platform': 'Facebook', 'url': f'facebook.com/{first_name.lower()}{last_name.lower()}', 'verified': False}
            ],
            'bankruptcies': [],
            'liens_judgments': [],
            'sex_offender_check': 'Clear - Not on registry',
            'report_date': timezone.now().date().isoformat(),
            'source': 'mock_data',
            'cached': False,
            'affiliate_url': 'https://www.truthfinder.com/?a=default&o=100265&utm_source=numberlookup',
            'message': 'This is demo data. Connect a real background check API for production use.'
        }
        
        # Cache for 1 hour
        cache.set(cache_key, result, 3600)
        
        # Log search
        try:
            SearchLog.objects.create(
                phone_number=full_name,
                normalized_number=full_name,
                ip_address=client_ip,
                user_agent=user_agent,
                found_results=True,
                api_source='mock_data',
                cache_hit=False
            )
        except Exception as e:
            logger.error(f"Failed to log search: {e}")
        
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"Background check error: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Background check failed',
            'success': False,
            'message': 'Please try again'
        }, status=500)