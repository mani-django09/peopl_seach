from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count, Avg
from .models import (
    SearchLog, 
    APIResponseCache, 
    AffiliateClick, 
    SiteConfiguration,
    PhoneNumberAnalytics,
    IPRateLimit,
    UserFeedback,
    SiteStatistics,
    APIErrorLog
)


@admin.register(SearchLog)
class SearchLogAdmin(admin.ModelAdmin):
    list_display = [
        'phone_number', 
        'formatted_ip', 
        'found_results', 
        'api_source', 
        'cache_hit',
        'created_at'
    ]
    list_filter = [
        'found_results', 
        'api_source', 
        'cache_hit', 
        'created_at'
    ]
    search_fields = ['phone_number', 'normalized_number', 'ip_address']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    def formatted_ip(self, obj):
        return format_html('<code>{}</code>', obj.ip_address)
    formatted_ip.short_description = 'IP Address'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(APIResponseCache)
class APIResponseCacheAdmin(admin.ModelAdmin):
    list_display = [
        'cache_key', 
        'api_source', 
        'hit_count', 
        'is_expired_display',
        'created_at', 
        'expires_at'
    ]
    list_filter = ['api_source', 'created_at']
    search_fields = ['cache_key']
    readonly_fields = ['created_at', 'hit_count']
    
    def is_expired_display(self, obj):
        if obj.is_expired():
            return format_html('<span style="color: red;">Expired</span>')
        return format_html('<span style="color: green;">Active</span>')
    is_expired_display.short_description = 'Status'


@admin.register(AffiliateClick)
class AffiliateClickAdmin(admin.ModelAdmin):
    list_display = [
        'affiliate_name', 
        'phone_number_display',
        'converted', 
        'conversion_value',
        'formatted_ip',
        'created_at'
    ]
    list_filter = ['affiliate_name', 'converted', 'created_at']
    search_fields = ['affiliate_name', 'search_log__phone_number', 'ip_address']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    def phone_number_display(self, obj):
        return obj.search_log.phone_number if obj.search_log else 'N/A'
    phone_number_display.short_description = 'Phone Number'
    
    def formatted_ip(self, obj):
        return format_html('<code>{}</code>', obj.ip_address)
    formatted_ip.short_description = 'IP Address'


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ['key', 'value_preview', 'is_active', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['key', 'value', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    def value_preview(self, obj):
        return obj.value[:100] + '...' if len(obj.value) > 100 else obj.value
    value_preview.short_description = 'Value'


@admin.register(PhoneNumberAnalytics)
class PhoneNumberAnalyticsAdmin(admin.ModelAdmin):
    list_display = [
        'phone_number', 
        'search_count', 
        'is_spam',
        'spam_reports',
        'first_searched', 
        'last_searched'
    ]
    list_filter = ['is_spam', 'first_searched', 'last_searched']
    search_fields = ['phone_number']
    readonly_fields = ['first_searched', 'last_searched']
    
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            total_searches=Count('phone_number')
        )


@admin.register(IPRateLimit)
class IPRateLimitAdmin(admin.ModelAdmin):
    list_display = [
        'formatted_ip',
        'hour_count',
        'day_count', 
        'is_blocked',
        'blocked_until',
        'updated_at'
    ]
    list_filter = ['is_blocked', 'created_at']
    search_fields = ['ip_address']
    readonly_fields = ['created_at', 'updated_at']
    
    def formatted_ip(self, obj):
        color = 'red' if obj.is_blocked else 'green'
        return format_html('<span style="color: {};">{}</span>', color, obj.ip_address)
    formatted_ip.short_description = 'IP Address'


@admin.register(UserFeedback)
class UserFeedbackAdmin(admin.ModelAdmin):
    list_display = [
        'phone_number_display',
        'feedback_type',
        'rating',
        'comments_preview',
        'created_at'
    ]
    list_filter = ['feedback_type', 'rating', 'created_at']
    search_fields = ['search_log__phone_number', 'comments']
    readonly_fields = ['created_at']
    
    def phone_number_display(self, obj):
        return obj.search_log.phone_number if obj.search_log else 'N/A'
    phone_number_display.short_description = 'Phone Number'
    
    def comments_preview(self, obj):
        return obj.comments[:50] + '...' if len(obj.comments) > 50 else obj.comments
    comments_preview.short_description = 'Comments'


@admin.register(SiteStatistics)
class SiteStatisticsAdmin(admin.ModelAdmin):
    list_display = [
        'date',
        'total_searches',
        'unique_visitors',
        'success_rate_display',
        'conversion_rate_display',
        'cache_hit_rate_display'
    ]
    list_filter = ['date']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'date'
    
    def success_rate_display(self, obj):
        if obj.total_searches > 0:
            rate = (obj.successful_searches / obj.total_searches) * 100
            color = 'green' if rate > 80 else 'orange' if rate > 60 else 'red'
            return format_html('<span style="color: {};">{:.1f}%</span>', color, rate)
        return 'N/A'
    success_rate_display.short_description = 'Success Rate'
    
    def conversion_rate_display(self, obj):
        color = 'green' if obj.conversion_rate > 5 else 'orange' if obj.conversion_rate > 2 else 'red'
        return format_html('<span style="color: {};">{:.2f}%</span>', color, obj.conversion_rate)
    conversion_rate_display.short_description = 'Conversion Rate'
    
    def cache_hit_rate_display(self, obj):
        color = 'green' if obj.cache_hit_rate > 70 else 'orange' if obj.cache_hit_rate > 40 else 'red'
        return format_html('<span style="color: {};">{:.1f}%</span>', color, obj.cache_hit_rate)
    cache_hit_rate_display.short_description = 'Cache Hit Rate'


@admin.register(APIErrorLog)
class APIErrorLogAdmin(admin.ModelAdmin):
    list_display = [
        'api_source',
        'phone_number',
        'error_code',
        'error_message_preview',
        'resolved',
        'created_at'
    ]
    list_filter = ['api_source', 'resolved', 'created_at']
    search_fields = ['phone_number', 'error_message', 'error_code']
    readonly_fields = ['created_at']
    
    def error_message_preview(self, obj):
        return obj.error_message[:100] + '...' if len(obj.error_message) > 100 else obj.error_message
    error_message_preview.short_description = 'Error Message'


# Custom admin site configuration
admin.site.site_header = 'NumberLookup.us Administration'
admin.site.site_title = 'NumberLookup.us Admin'
admin.site.index_title = 'Welcome to NumberLookup.us Administration'