from django.urls import path
from . import views

urlpatterns = [
    path('roles/', views.RolesList.as_view(), name='rol-list'),
    path('roles/<int:pk>/', views.RolesDetail.as_view(), name='rol-detail'),
    path('departamentos/', views.DepartamentosList.as_view(), name='departamento-list'),
    path('departamentos/<int:pk>/', views.DepartamentosDetail.as_view(), name='departamento-detail'),
    path('departamentos/<int:pk>/ciudades/', views.CiudadListByDepartamento.as_view(), name='ciudad-list-by-departamento'),
    path('ciudades/', views.CiudadesList.as_view(), name='ciudad-list'),
    path('ciudades/<int:pk>/', views.CiudadesDetail.as_view(), name='ciudad-detail'),
    # Define rutas para otros modelos
]
