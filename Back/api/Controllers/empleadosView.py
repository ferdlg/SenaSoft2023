from typing import Any
from django import http
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.shortcuts import render
from models import Empleados
from models import Departamentos
from models import Ciudades
from models import TipoDocumento
from django.views import View
from django.http.response import JsonResponse 
import requests #libreria requerida para api externa
import json

class EmpleadosView(View):

    @method_decorator(csrf_exempt) 
    def dispatch(self, request, *args, **kwargs): #metodo para ignorar el error del csrf tempoarlmente
        return super().dispatch(request, *args, **kwargs)

    def get (self, resquest, id=0):
        if (id>0):
            empleados = list(Empleados.objects.filter(id=id).values())
            if len (empleados)>0:
                empleado = empleados[0]
                datos = {'message':"Succes", 'empleados':empleados}
            else: 
                datos = {'message':"Empleado no encontrado..."}
                return JsonResponse(datos)
        else:    
            empleados = list(Empleados.objects.values())
            if len(empleados)>0:
                datos = {'message':"Succes", 'empleados':empleados}
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
        json_data = json.loads(request.body)
        empleados = list(Empleados.objects.filter(id=id).values())
        
        if len (empleados)>0:
            empleado = Empleados.objects.get(id = id)
            # Actualiza las relaciones con tablas relacionadas, datos foraneos
            id_tipo_documento = json_data['id_tipo_documento_fk']
            tipo_documento = TipoDocumento.objects.get(id_tipo_documento=id_tipo_documento)
            id_departamento = json_data['id_departamento_fk']
            departamento = Departamentos.objects.get(id_departamento=id_departamento)
            id_ciudad = json_data['id_ciudad_fk']
            ciudad = Ciudades.objects.get(id_ciudad=id_ciudad)

            empleado.tipo_documento_fk = tipo_documento
            empleado.id_departamento_fk = departamento
            empleado.id_ciudad_fk = ciudad  
          
            # Actualizar datos no foraneos 
            empleado.numero_documento = json_data['numero_documento']
            empleado.nombres_empleado = json_data['nombres_empleado']
            empleado.apellidos_empleado = json_data['apellidos_empleado']
            empleado.direccion = json_data['direccion']
            empleado.email = json_data['email']
            empleado.telefono = json_data['telefono']
            empleado.save()
            datos = {'message':"Succes"}
        else: 
            datos = {'message':"Empleado no encontrado..."}
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