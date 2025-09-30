from django.urls import path
from . import views

app_name = 'lookup'

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('search/people/', views.people_search, name='people_search'),  
    path('search/address/', views.address_search, name='address_search'), 
    path('search/phone/<str:number>/', views.phone_search, name='phone_search'),
    path('search/background/', views.background_check_search, name='background_check_search'),  # NEW
    path('track/affiliate-click/', views.track_affiliate_click, name='track_affiliate_click'),
    #path('test-api/', views.test_api, name='test_api'),
]