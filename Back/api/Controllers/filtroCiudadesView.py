from django.http import JsonResponse
#tener acceso  a las ciudades en la base de datos apartir del modelo
from api.models import Ciudades, Departamentos
#llamar al serializador 
from api.serializers import CiudadesSerializer
from django.views.decorators.csrf import csrf_exempt
#funcion para filtrar ciudades de acuerdo al id del departamento
import json

@csrf_exempt 
def filtro_ciudades (request):
    if request.method == 'POST':
            #leer la solicitud en json 
            data = json.loads(request.body.decode('utf-8'))
            if "departamento_id" in data:
                '''id_departamento = campo en la bd
                departamento_id = campo en el json '''
                id_departamento = data["departamento_id"]
                departamento = Departamentos.objects.get(pk = id_departamento)
                ciudades = Ciudades.objects.filter(id_departamento_fk = departamento)
                serializer = CiudadesSerializer(ciudades, many=True)
                return JsonResponse({'ciudades': serializer.data})
            else:
                return JsonResponse({'error':'seleccione un departamento valido'})