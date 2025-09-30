from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    """Root API endpoint"""
    return JsonResponse({
        'message': 'NumberLookup.us API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health/',
            'phone_search': '/api/search/phone/<number>/',
            'test': '/api/test-api/',
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('lookup.urls')),
    path('', api_root),  # Add this line
]