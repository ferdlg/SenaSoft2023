from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request,'index.html',{
        
    }) #la funcion recibe 3 parametros la peticion, el documento y un diccionario 
# Create your views here.

