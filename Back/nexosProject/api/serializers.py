from rest_framework import serializers
from .models import Departamentos
 
#serializador para los datos = formato JSON 
class DepartamentosSerializer(serializers.Serializer):
    class Meta: #esta clase le da las meta instrucciones al serializador
        model = Departamentos
        fields = ('codigo_departamento','nombre_departamento')