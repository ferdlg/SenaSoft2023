from typing import Any
from django import http
from django.shortcuts import render
from models import Empleados
from models import Departamentos
from models import Ciudades
from models import TipoDocumento
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
    