from typing import Any
from django import http
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Empleados
from .models import Departamentos
from .models import Ciudades
from django.views import View
from django.http.response import JsonResponse 
import requests #libreria requerida para api externa
import json


#Obtener datos de una API externa mediante una funcion 
def obtener_departamentos(request):

    url = 'https://api-colombia.com/api/v1/Department'
    response = requests.get(url)
    if response.status_code ==200:
        data = response.json()
        #procesar los datos de departamentos
        departamentos =[]
        for departamento_data in data:
            nombre_departamento = departamento_data.get('name','') #obtener nombre del departamento
            id_departamento = departamento_data.get('id', None) #obtener id del departamento 
            if nombre_departamento and id_departamento:
                Departamentos.objects.get_or_create(id_departamento=id_departamento,nombre_departamento=nombre_departamento) #Si hay una instancia de departamento que no existe, la crea
                departamentos.append({'id': id_departamento, 'Departamento': nombre_departamento})
        return JsonResponse({'departamentos': departamentos})
    else:
        return JsonResponse({'error':'No se pudieron obtener datos de la API externa'}, status=500)
    
def obtener_ciudades_departamento(request):
    url='https://api-colombia.com/api/v1/City'
    response = requests.get(url)
    if response.status_code ==200:
        data = response.json()
        ciudades=[]
        for ciudad_data in data:
            id_ciudad = ciudad_data.get('id',None)
            id_departamento_fk = ciudad_data.get('departmentId',None)
            nombre_ciudad= ciudad_data.get('name','')
            if id_ciudad and id_departamento_fk and nombre_ciudad:
                departamento = Departamentos.objects.get(id_departamento=id_departamento_fk)
                ciudad, create = Ciudades.objects.get_or_create(id_ciudad = id_ciudad,id_departamento_fk=departamento, nombre_ciudad=nombre_ciudad)
                ciudades.append({'id': id_ciudad, 'idDepartamento':id_departamento_fk, 'Ciudad':nombre_ciudad})
        return JsonResponse({'id':id_ciudad,'Ciudades': ciudades})
    else:
        return JsonResponse({'error':'No se pudieron obtener datos de la API externa'}, status=500)
        

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
        Empleados.objects.create(tipo_documento_fk = json_data ['tipo_documento_fk'],
                                numero_documento = json_data ['numero_documento'],
                                nombres_empleado= json_data['nombres_empleado'],
                                apellidos_empleado = json_data['apellidos_empleado'],
                                id_departamento_fk =json_data['apellidos_empleado'],
                                id_ciudad_fk = json_data['id_ciudad_fk'],
                                direccion = json_data['direccion'],
                                email = json_data['email'],
                                telefono = json_data['telefono']
                                )
        return 

    def put (self, request, id):
        json_data = json.loads(request.body)
        empleados = list(Empleados.objects.filter(id=id).values())
        if len (empleados)>0:
            empleado = Empleados.objects.get(id = id)
            empleado.tipo_documento_fk = json_data['tipo_documento_fk']
            empleado.numero_documento = json_data['numero_documento']
            empleado.nombres_empleado = json_data['nombres_empleado']
            empleado.apellidos_empleado = json_data['apellidos_empleado']
            empleado.id_departamento_fk = json_data['id_departamento_fk']
            empleado.id_ciudad_fk = json_data['id_ciudad_fk']
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
def paginar_registros (request):
    cantidad_empleados = Empleados.objects.count()
    registros_pagina = 10 
    todos_empleados = Empleados.objects.all()

    paginator = Paginator(todos_empleados, registros_pagina)

    num_pagina = 1
    pagina = paginator.get_page(num_pagina)
    return
