from django.http import JsonResponse
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from api.models import TipoDocumento
from api.serializers import TipoDocumentoSerializer
import json

def mostrar_tipo_documento(request):
    tipo_documento = TipoDocumento.objects.all()
    serializer = TipoDocumentoSerializer(tipo_documento, many=True)

    if len(tipo_documento)>0:
            datos = {'message':"Succes", 'Tipo de documentos':serializer.data}
    else: 
            datos = {'message':"No se encontraron tipos de documentos..."}
    return JsonResponse(datos)