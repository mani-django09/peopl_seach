from rest_framework import serializers
from .models import SearchLog, APIResponseCache, AffiliateClick, SiteConfiguration


class PhoneSearchSerializer(serializers.Serializer):
    """Serializer for phone search requests"""
    
    number = serializers.CharField(max_length=20, required=True)
    
    def validate_number(self, value):
        """Validate phone number format"""
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Phone number is required")
        
        # Basic length check
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 7 or len(cleaned) > 15:
            raise serializers.ValidationError("Phone number must be between 7 and 15 digits")
        
        return value.strip()


class SearchLogSerializer(serializers.ModelSerializer):
    """Serializer for search log entries"""
    
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    user_email = serializers.SerializerMethodField()
    
    class Meta:
        model = SearchLog
        fields = [
            'id',
            'phone_number',
            'normalized_number',
            'ip_address',
            'user_email',
            'found_results',
            'api_source',
            'cache_hit',
            'created_at',
            'referrer'
        ]
        read_only_fields = fields
    
    def get_user_email(self, obj):
        """Get user email if available"""
        return obj.user.email if obj.user else None


class APIResponseCacheSerializer(serializers.ModelSerializer):
    """Serializer for API response cache entries"""
    
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    expires_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    is_expired = serializers.SerializerMethodField()
    
    class Meta:
        model = APIResponseCache
        fields = [
            'id',
            'cache_key',
            'api_source',
            'hit_count',
            'created_at',
            'expires_at',
            'is_expired'
        ]
        read_only_fields = fields
    
    def get_is_expired(self, obj):
        """Check if cache entry is expired"""
        return obj.is_expired()


class AffiliateClickSerializer(serializers.ModelSerializer):
    """Serializer for affiliate click tracking"""
    
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    search_phone_number = serializers.SerializerMethodField()
    
    class Meta:
        model = AffiliateClick
        fields = [
            'id',
            'affiliate_name',
            'affiliate_url',
            'ip_address',
            'converted',
            'created_at',
            'search_phone_number'
        ]
        read_only_fields = fields
    
    def get_search_phone_number(self, obj):
        """Get the phone number from related search"""
        return obj.search_log.phone_number if obj.search_log else None


class SiteConfigurationSerializer(serializers.ModelSerializer):
    """Serializer for site configuration"""
    
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    
    class Meta:
        model = SiteConfiguration
        fields = [
            'id',
            'key',
            'value',
            'description',
            'is_active',
            'created_at',
            'updated_at'
        ]
    
    def validate_key(self, value):
        """Validate configuration key"""
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Configuration key is required")
        return value.strip().lower()


class PhoneSearchResponseSerializer(serializers.Serializer):
    """Serializer for phone search API responses"""
    
    number = serializers.CharField(max_length=20)
    valid = serializers.BooleanField()
    country_code = serializers.CharField(max_length=3, allow_null=True, required=False)
    country_name = serializers.CharField(max_length=100, allow_null=True, required=False)
    location = serializers.CharField(max_length=200, allow_null=True, required=False)
    carrier = serializers.CharField(max_length=100, allow_null=True, required=False)
    line_type = serializers.CharField(max_length=50, allow_null=True, required=False)
    source = serializers.CharField(max_length=50, default='numverify')
    cached = serializers.BooleanField(default=False)
    affiliate_url = serializers.URLField(required=False)
    error = serializers.CharField(max_length=200, allow_null=True, required=False)


class AffiliateClickTrackingSerializer(serializers.Serializer):
    """Serializer for affiliate click tracking requests"""
    
    search_log_id = serializers.IntegerField(required=True)
    affiliate_name = serializers.CharField(max_length=100, default='truthfinder')
    affiliate_url = serializers.URLField(required=False)
    click_id = serializers.CharField(max_length=255, required=False, allow_blank=True)
    
    def validate_search_log_id(self, value):
        """Validate search log ID exists"""
        try:
            SearchLog.objects.get(id=value)
        except SearchLog.DoesNotExist:
            raise serializers.ValidationError("Invalid search log ID")
        return value


class AnalyticsSummarySerializer(serializers.Serializer):
    """Serializer for analytics summary data"""
    
    today = serializers.DictField()
    yesterday = serializers.DictField()
    last_7_days = serializers.DictField()
    
    def to_representation(self, instance):
        """Custom representation for analytics data"""
        return {
            'today': {
                'searches': instance.get('today_searches', 0)
            },
            'yesterday': {
                'searches': instance.get('yesterday_searches', 0)
            },
            'last_7_days': {
                'searches': instance.get('week_searches', 0),
                'affiliate_clicks': instance.get('week_affiliate_clicks', 0),
                'cache_hit_rate': instance.get('cache_hit_rate', 0.0),
                'conversion_rate': instance.get('conversion_rate', 0.0)
            }
        }