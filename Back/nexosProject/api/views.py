from django.shortcuts import render
from .models import Empleados
from django.views import View
from django.http.response import JsonResponse

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
