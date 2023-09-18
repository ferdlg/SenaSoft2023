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

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'


class EmpleadosSerializer(serializers.ModelSerializer):
    tipo_documento = TipoDocumentoSerializer(source = 'id_tipo_documento_fk', read_only = True) # traer datos de otros modelos para mostrar en el front
    departamento = DepartamentosSerializer(source = 'id_departamento_fk', read_only = True)
    ciudad = CiudadesSerializer(source = 'id_ciudad_fk', read_only = True)
    class Meta:
        model = Empleados
        fields = [
            'id_empleado',
            'numero_documento',
            'nombres_empleado',
            'apellidos_empleado',
            'ciudad',
            'direccion',
            'email',
            'telefono',
            'fecha_hora_crear',
            'tipo_documento',
            'departamento',
            'fecha_hora_modificar'
         ]

