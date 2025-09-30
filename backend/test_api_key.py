# test_api_key.py - Updated version with HTTPS and better error handling
import os
import requests
from decouple import config
import ssl
import urllib3

# Disable SSL warnings for testing (remove in production)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
api_key = config('NUMVERIFY_API_KEY', default='')

print("="*50)
print("NumVerify API Key Test (HTTPS)")
print("="*50)

if not api_key:
    print("ERROR: No API key found!")
    print("Create a .env file with: NUMVERIFY_API_KEY=your_key_here")
    exit(1)

print(f"API Key found: {api_key[:10]}...{api_key[-4:]}")

# Test multiple endpoints and protocols
test_configs = [
    {
        'name': 'HTTPS (Recommended)',
        'url': 'https://apilayer.net/api/validate',
        'verify_ssl': True
    },
    {
        'name': 'HTTPS (No SSL Verify)',
        'url': 'https://apilayer.net/api/validate',
        'verify_ssl': False
    },
    {
        'name': 'HTTP (Fallback)',
        'url': 'http://apilayer.net/api/validate',
        'verify_ssl': True
    }
]

test_number = "17182222222"

for config_test in test_configs:
    print(f"\n{'-'*30}")
    print(f"Testing: {config_test['name']}")
    print(f"URL: {config_test['url']}")
    print(f"{'-'*30}")
    
    params = {
        'access_key': api_key,
        'number': test_number,
        'format': 1
    }
    
    headers = {
        'User-Agent': 'NumberLookup.us/1.0'
    }
    
    try:
        response = requests.get(
            config_test['url'], 
            params=params, 
            headers=headers,
            timeout=15,
            verify=config_test['verify_ssl']
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("API Response received!")
            
            # Check for API errors
            if 'error' in data:
                print(f"API Error: {data['error']}")
            else:
                print(f"Valid: {data.get('valid', False)}")
                print(f"Country: {data.get('country_name', 'N/A')}")
                print(f"Location: {data.get('location', 'N/A')}")
                print(f"Carrier: {data.get('carrier', 'N/A')}")
                print(f"Line Type: {data.get('line_type', 'N/A')}")
                
                if data.get('valid'):
                    print("SUCCESS! This configuration works.")
                    break
        else:
            print(f"HTTP Error: {response.status_code}")
            print(f"Response: {response.text[:200]}...")

    except requests.exceptions.SSLError as e:
        print(f"SSL Error: {str(e)}")
        print("Try the 'No SSL Verify' option or check your internet connection")
    except requests.exceptions.ConnectionError as e:
        print(f"Connection Error: {str(e)}")
        print("Check your internet connection or firewall settings")
    except requests.exceptions.Timeout as e:
        print(f"Timeout Error: {str(e)}")
        print("API is taking too long to respond")
    except Exception as e:
        print(f"Request failed: {str(e)}")

print(f"\n{'='*50}")
print("Test Complete!")
print("If all tests failed, check:")
print("1. Internet connection")
print("2. Corporate firewall blocking requests")
print("3. NumVerify API key validity")
print("4. Try running from a different network")
print("="*50)