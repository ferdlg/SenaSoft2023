from rest_framework import serializers
from api.models import Departamentos
from api.models import Empleados
from api.models import Ciudades
from api.models import TipoDocumento

#serializador para los datos = formato JSON 
class DepartamentosSerializer(serializers.Serializer):
    class Meta: #esta clase le da las meta instrucciones al serializador
        model = Departamentos
        fields = all

class CiudadesSerializer(serializers.Serializer): 
    class Meta:
        model = Ciudades
        fields = all

class EmpleadosSerializer(serializers.Serializer):
    class Meta:
        model = Empleados
        fields = all

class TipoDocumentoSerializer(serializers.Serializer):
    class Meta:
        model = TipoDocumento
        fields = all
