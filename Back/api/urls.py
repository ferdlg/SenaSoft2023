from django.urls import path
from .views import EmpleadosView , obtener_departamentos

urlpatterns=[
    path('empleados/', EmpleadosView.as_view(), name='empleados_list'),
    path('empleados/<int:id>', EmpleadosView.as_view(), name='empleados_process'), #url para un unico empleado 
    path('departamentos/', obtener_departamentos, name='obtener_departamentos')
]