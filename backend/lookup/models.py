from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class SearchLog(models.Model):
    """Track phone number search requests"""
    
    phone_number = models.CharField(max_length=20, db_index=True)
    normalized_number = models.CharField(max_length=20, db_index=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    found_results = models.BooleanField(default=False)
    api_source = models.CharField(max_length=50, default='numverify')
    cache_hit = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    referrer = models.URLField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['ip_address', 'created_at']),
            models.Index(fields=['phone_number', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.phone_number} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class APIResponseCache(models.Model):
    """Cache API responses to reduce external API calls"""
    
    cache_key = models.CharField(max_length=100, unique=True, db_index=True)
    response_data = models.JSONField()
    api_source = models.CharField(max_length=50, default='numverify')
    
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(db_index=True)
    hit_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['expires_at']),
        ]
    
    def is_expired(self):
        return timezone.now() > self.expires_at
    
    def increment_hit_count(self):
        self.hit_count += 1
        self.save(update_fields=['hit_count'])
    
    def __str__(self):
        return f"{self.cache_key} ({self.api_source})"


class AffiliateClick(models.Model):
    """Track affiliate link clicks for analytics"""
    
    search_log = models.ForeignKey(SearchLog, on_delete=models.CASCADE, related_name='affiliate_clicks')
    affiliate_name = models.CharField(max_length=100, default='truthfinder')
    affiliate_url = models.URLField()
    
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    click_id = models.CharField(max_length=255, blank=True)
    
    converted = models.BooleanField(default=False)
    conversion_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['affiliate_name', 'created_at']),
            models.Index(fields=['ip_address', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.affiliate_name} click - {self.created_at.strftime('%Y-%m-%d')}"


class SiteConfiguration(models.Model):
    """Store site-wide configuration settings"""
    
    key = models.CharField(max_length=100, unique=True, db_index=True)
    value = models.TextField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['key']
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configurations'
    
    def __str__(self):
        return f"{self.key}: {self.value[:50]}..."


class PhoneNumberAnalytics(models.Model):
    """Store analytics data for phone numbers"""
    
    phone_number = models.CharField(max_length=20, unique=True, db_index=True)
    search_count = models.PositiveIntegerField(default=1)
    first_searched = models.DateTimeField(auto_now_add=True)
    last_searched = models.DateTimeField(auto_now=True)
    
    # Flags for spam/suspicious numbers
    is_spam = models.BooleanField(default=False)
    spam_reports = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-search_count']
        verbose_name = 'Phone Number Analytics'
        verbose_name_plural = 'Phone Number Analytics'
    
    def increment_search_count(self):
        self.search_count += 1
        self.last_searched = timezone.now()
        self.save(update_fields=['search_count', 'last_searched'])
    
    def __str__(self):
        return f"{self.phone_number} ({self.search_count} searches)"


class IPRateLimit(models.Model):
    """Track API rate limits per IP address"""
    
    ip_address = models.GenericIPAddressField(unique=True, db_index=True)
    hour_count = models.PositiveIntegerField(default=0)
    day_count = models.PositiveIntegerField(default=0)
    
    hour_reset = models.DateTimeField(auto_now_add=True)
    day_reset = models.DateTimeField(auto_now_add=True)
    
    is_blocked = models.BooleanField(default=False)
    blocked_until = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'IP Rate Limit'
        verbose_name_plural = 'IP Rate Limits'
    
    def is_hour_limit_exceeded(self, max_per_hour=50):
        """Check if hourly limit is exceeded"""
        if timezone.now() > self.hour_reset + timezone.timedelta(hours=1):
            # Reset hourly counter
            self.hour_count = 0
            self.hour_reset = timezone.now()
            self.save()
        
        return self.hour_count >= max_per_hour
    
    def is_day_limit_exceeded(self, max_per_day=100):
        """Check if daily limit is exceeded"""
        if timezone.now() > self.day_reset + timezone.timedelta(days=1):
            # Reset daily counter
            self.day_count = 0
            self.day_reset = timezone.now()
            self.save()
        
        return self.day_count >= max_per_day
    
    def increment_counters(self):
        """Increment both hourly and daily counters"""
        self.hour_count += 1
        self.day_count += 1
        self.save()
    
    def __str__(self):
        return f"{self.ip_address} - {self.hour_count}/hr, {self.day_count}/day"


class UserFeedback(models.Model):
    """Store user feedback about search results"""
    
    FEEDBACK_TYPES = [
        ('accurate', 'Information was accurate'),
        ('inaccurate', 'Information was incorrect'),
        ('helpful', 'Very helpful'),
        ('not_helpful', 'Not helpful'),
        ('missing_info', 'Missing information'),
        ('spam_report', 'Report as spam number'),
    ]
    
    search_log = models.ForeignKey(SearchLog, on_delete=models.CASCADE, related_name='feedback')
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPES)
    rating = models.PositiveSmallIntegerField(null=True, blank=True)  # 1-5 stars
    comments = models.TextField(blank=True)
    
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['search_log', 'ip_address']  # Prevent duplicate feedback
    
    def __str__(self):
        return f"{self.feedback_type} - {self.search_log.phone_number}"


class PopularSearch(models.Model):
    """Track popular phone number searches for trending/suggestions"""
    
    phone_number = models.CharField(max_length=20, unique=True, db_index=True)
    search_count = models.PositiveIntegerField(default=1)
    
    # Metadata about the number
    location = models.CharField(max_length=200, blank=True)
    carrier = models.CharField(max_length=100, blank=True)
    line_type = models.CharField(max_length=50, blank=True)
    
    is_trending = models.BooleanField(default=False, db_index=True)
    trend_score = models.FloatField(default=0.0)
    
    first_searched = models.DateTimeField(auto_now_add=True)
    last_searched = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-search_count', '-last_searched']
        verbose_name = 'Popular Search'
        verbose_name_plural = 'Popular Searches'
    
    def update_trend_score(self):
        """Calculate trending score based on recent activity"""
        from datetime import timedelta
        
        recent_searches = SearchLog.objects.filter(
            normalized_number__icontains=self.phone_number.replace('+', ''),
            created_at__gte=timezone.now() - timedelta(days=7)
        ).count()
        
        # Simple trending algorithm
        self.trend_score = recent_searches * 1.0
        if recent_searches > 10:
            self.is_trending = True
        else:
            self.is_trending = False
        
        self.save(update_fields=['trend_score', 'is_trending'])
    
    def __str__(self):
        return f"{self.phone_number} ({self.search_count} searches)"


class APIErrorLog(models.Model):
    """Log API errors for monitoring and debugging"""
    
    api_source = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    error_message = models.TextField()
    error_code = models.CharField(max_length=20, blank=True)
    
    request_data = models.JSONField(null=True, blank=True)
    response_data = models.JSONField(null=True, blank=True)
    
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    resolved = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['api_source', 'created_at']),
            models.Index(fields=['resolved', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.api_source} error - {self.phone_number} - {self.created_at.strftime('%Y-%m-%d')}"


class SiteStatistics(models.Model):
    """Store daily site statistics"""
    
    date = models.DateField(unique=True, db_index=True)
    
    total_searches = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    successful_searches = models.PositiveIntegerField(default=0)
    failed_searches = models.PositiveIntegerField(default=0)
    
    affiliate_clicks = models.PositiveIntegerField(default=0)
    conversion_rate = models.FloatField(default=0.0)
    
    cache_hit_rate = models.FloatField(default=0.0)
    avg_response_time = models.FloatField(default=0.0)  # in seconds
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name = 'Site Statistics'
        verbose_name_plural = 'Site Statistics'
    
    @classmethod
    def get_or_create_today(cls):
        """Get or create today's statistics record"""
        today = timezone.now().date()
        stats, created = cls.objects.get_or_create(date=today)
        return stats
    
    def calculate_conversion_rate(self):
        """Calculate affiliate conversion rate"""
        if self.total_searches > 0:
            self.conversion_rate = (self.affiliate_clicks / self.total_searches) * 100
        else:
            self.conversion_rate = 0.0
        self.save(update_fields=['conversion_rate'])
    
    def __str__(self):
        return f"Stats for {self.date} - {self.total_searches} searches"