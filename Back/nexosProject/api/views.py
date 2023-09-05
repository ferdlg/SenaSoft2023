from django.shortcuts import render
from .models import Empleados
from django.views import View
from django.http.response import JsonResponse 
from django.http import requests #libreria requerida para api externa

def obtener_departamentos(request):

    url = 'https://api-colombia.com/api/v1/Department'
    response = requests.get(url)

    if response.status_code ==200:
        data = response.json()


class EmpleadosView(View):

    def get (self, resquest):
        empleados = list(Empleados.objects.values())
        if len(empleados)>0:
            datos = {'message':"Succes", 'empleados':empleados}
        else: 
            datos = {'message':"Empleados no encontrados..."}
        return JsonResponse(datos)
    
    def post (self, request):
        return 

    def put (self, request):
        return 

    def delete (self, request):
        return     
