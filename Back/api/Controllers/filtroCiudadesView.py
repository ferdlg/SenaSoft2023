from django.http import JsonResponse
#tener acceso  a las ciudades en la base de datos apartir del modelo
from api.models import Ciudades, Departamentos
#llamar al serializador 
from api.serializers import CiudadesSerializer
from django.views.decorators.csrf import csrf_exempt
#funcion para filtrar ciudades de acuerdo al id del departamento
import json

@csrf_exempt 
def filtro_ciudades ( request, id_departamento):
            try: 
                id_departamento_fk = request.GET.get('id_departamento_fk')
                ciudades = list(Ciudades.objects.filter(id_departamento = id_departamento_fk).values())
                if(ciudades):
                    return JsonResponse({'ciudades':ciudades})
                else:
                    return JsonResponse({'error':'seleccione un departamento valido'}, status = 400)
            except Exception:
                return JsonResponse({'error': str(Exception)}, status=400)