from typing import Any
from django import http
from django.shortcuts import render
from models import Departamentos
from models import Ciudades
from django.views import View
from django.http.response import JsonResponse 
import requests #libreria requerida para api externa
import json

#Obtener datos de una API externa mediante una funcion 
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
        
