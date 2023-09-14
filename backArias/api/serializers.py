from rest_framework import serializers
from .models import Ciudades, Departamentos, Empleados, Roles, TipoDocumento

class CiudadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudades
        fields = '__all__'


class DepartamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamentos
        fields = '__all__'


class EmpleadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleados
        fields = '__all__'


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'


class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'



# Define otros serializadores para tus modelos




