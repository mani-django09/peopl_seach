# backend/lookup/management/commands/cleanup_cache.py
from django.core.management.base import BaseCommand
from django.utils import timezone
from lookup.models import APIResponseCache

class Command(BaseCommand):
    help = 'Clean up expired cache entries'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting',
        )

    def handle(self, *args, **options):
        expired_entries = APIResponseCache.objects.filter(expires_at__lt=timezone.now())
        count = expired_entries.count()
        
        if options['dry_run']:
            self.stdout.write(
                self.style.WARNING(f'Would delete {count} expired cache entries')
            )
        else:
            deleted_count = expired_entries.delete()[0]
            self.stdout.write(
                self.style.SUCCESS(f'Successfully deleted {deleted_count} expired cache entries')
            )