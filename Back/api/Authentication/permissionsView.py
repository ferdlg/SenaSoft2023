from django.db.models.signals import post_migrate
from django.contrib.auth.management import create_permissions
from api.models import Permissions
from django.apps import apps

def create_permissions(sender, **kwargs):
        app_models = apps.get_app_config(sender.label).get_models()
        for model in app_models:
                Permissions.objects.get_or_create(
                        codename = f' can_custom_permission_{model._meta.mode_name}',
                        name = f'Can custom permission for {model._meta.verbose_name}',
                        content_type = None,
                )
                
post_migrate.connect(create_permissions)
