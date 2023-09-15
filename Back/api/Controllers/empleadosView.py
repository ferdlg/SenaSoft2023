from typing import Any
from django import http
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.shortcuts import render
from api.models import Empleados
from api.models import Departamentos
from api.models import Ciudades
from api.models import TipoDocumento
from django.views import View
from django.http.response import JsonResponse 
import requests #libreria requerida para api externa
import json
from ..serializers import EmpleadosSerializer

class EmpleadosView(View):

    @method_decorator(csrf_exempt) 
    def dispatch(self, request, *args, **kwargs): #metodo para ignorar el error del csrf tempoarlmente
        return super().dispatch(request, *args, **kwargs)

    def get (self, resquest, id=None):
        if id is not None and id>0:
            empleado = Empleados.objects.filter(id_empleado=id).first()
            if  (empleado):
                serializer = EmpleadosSerializer(empleado)
                datos = {'message':"Succes", 'empleados':serializer.data}
            else: 
                datos = {'message':"Empleado no encontrado..."}
            return JsonResponse(datos)
        else:
            empleados = Empleados.objects.all()
            serializer = EmpleadosSerializer(empleados, many = True)
            if len(empleados)>0:
                datos = {'message':"Succes", 'empleados':serializer.data}
            else: 
                datos = {'message':"Empleados no encontrados..."}
            return JsonResponse(datos)
    
    def post (self, request):

        json_data = json.loads(request.body)
        #para los campos que son llaves foraneas se buscan primero las instancias
        #obtener el valor  de id_tipo_documento del json_data 
        id_tipo_documento= json_data['id_tipo_documento_fk']
        # Obtener la instancia de TipoDocumento correspondiente al ID 
        tipo_documento = TipoDocumento.objects.get(id_tipo_documento = id_tipo_documento)

        id_departamento = json_data['id_departamento_fk']
        departamento = Departamentos.objects.get(id_departamento=id_departamento)
        id_ciudad = json_data['id_ciudad_fk']
        ciudad = Ciudades.objects.get(id_ciudad =id_ciudad)

        Empleados.objects.create(
                                id_tipo_documento_fk = tipo_documento,
                                numero_documento = json_data ['numero_documento'],
                                nombres_empleado= json_data['nombres_empleado'],
                                apellidos_empleado = json_data['apellidos_empleado'],
                                id_departamento_fk =departamento,
                                id_ciudad_fk = ciudad,
                                direccion = json_data['direccion'],
                                email = json_data['email'],
                                telefono = json_data['telefono']
                                )
        
        datos = {'message':"Succes"}
        return JsonResponse(datos)

    def put (self, request, id):
            try:
                    empleado = Empleados.objects.get(id_empleado=id)
                    json_data = json.loads(request.body)

                    # Actualizar campos relacionados si están presentes en JSON
                    if 'id_tipo_documento_fk' in json_data:
                        id_tipo_documento = json_data['id_tipo_documento_fk']
                        tipo_documento = TipoDocumento.objects.get(id_tipo_documento=id_tipo_documento)
                        empleado.tipo_documento_fk = tipo_documento

                    if 'id_departamento_fk' in json_data:
                        id_departamento = json_data['id_departamento_fk']
                        departamento = Departamentos.objects.get(id_departamento=id_departamento)
                        empleado.id_departamento_fk = departamento

                    if 'id_ciudad_fk' in json_data:
                        id_ciudad = json_data['id_ciudad_fk']
                        ciudad = Ciudades.objects.get(id_ciudad=id_ciudad)
                        empleado.id_ciudad_fk = ciudad

                    # Actualizar campos no relacionados si están presentes en JSON
                    if 'numero_documento' in json_data:
                        empleado.numero_documento = json_data['numero_documento']

                    if 'nombres_empleado' in json_data:
                        empleado.nombres_empleado = json_data['nombres_empleado']

                    if 'apellidos_empleado' in json_data:
                        empleado.apellidos_empleado = json_data['apellidos_empleado']

                    if 'direccion' in json_data:
                        empleado.direccion = json_data['direccion']

                    if 'email' in json_data:
                        empleado.email = json_data['email']

                    if 'telefono' in json_data:
                        empleado.telefono = json_data['telefono']

                    empleado.save()
                    datos = {'message': "Empleado actualizado con exito"}
            except Empleados.DoesNotExist:
                    datos = {'message': "Empleado no encontrado..."}
    
            return JsonResponse(datos)

    def delete (self, request, id):
        json_data = json.loads(request.body)
        empleados = list(Empleados.objects.filter(id=id).values())
        if len (empleados)>0:
            Empleados.objects.filter(id=id).delete()
            datos = {'message':"Succes"}
        else:
            datos = {'message':"Empleado no encontrado..."}
        return 
    

   