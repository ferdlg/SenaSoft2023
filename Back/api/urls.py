from django.urls import path
from api.Controllers.empleadosView import EmpleadosView
from api.Controllers.departamentoView import obtener_departamentos
from api.Controllers.ciudadesView import obtener_ciudades_departamento
from api.Controllers.filtroCiudadesView import filtro_ciudades

urlpatterns=[
    path('empleados/', EmpleadosView.as_view(), name='empleados_list'),
    path('empleados/<int:id>', EmpleadosView.as_view(), name='empleados_process'), #url para un unico empleado 
    path('departamentos/', obtener_departamentos, name='obtener_departamentos'),
    path('ciudades/', obtener_ciudades_departamento, name='obtener_ciudades_departamento'),
    path('filtro/', filtro_ciudades, name='filtro_ciudades')
]