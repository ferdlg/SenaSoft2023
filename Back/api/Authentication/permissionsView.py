from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from api.models import Empleados, Ciudades, Departamentos

content_type = ContentType.objects.get_for_model(Empleados)

permission = Permission.objects.create(
    
)