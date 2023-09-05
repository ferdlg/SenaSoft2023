from django.urls import path
from .views import EmpleadosView

urlpatterns=[
    path('empleados/', EmpleadosView.as_view(), name='empleados_list')
]