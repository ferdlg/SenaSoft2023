from rest_framework import serializers
from api.models import Departamentos
from api.models import Empleados
from api.models import Ciudades
from api.models import TipoDocumento

#serializador para los datos = formato JSON 
class DepartamentosSerializer(serializers.ModelSerializer):
    class Meta: #esta clase le da las meta instrucciones al serializador
        model = Departamentos
        fields = '__all__'

class CiudadesSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Ciudades
        fields = '__all__'

class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleados
        fields = '__all__'

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'
