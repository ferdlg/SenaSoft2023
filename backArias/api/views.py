from rest_framework import generics
from .models import Ciudades, Departamentos, Empleados, Roles, TipoDocumento
from .serializers import CiudadesSerializer, DepartamentosSerializer, EmpleadosSerializer, RolesSerializer, TipoSerializer

# Vistas para los modelos
class CiudadListByDepartamento(generics.ListAPIView):
    serializer_class = CiudadesSerializer

    def get_queryset(self):
        departamento_id = self.kwargs['pk']
        return Ciudades.objects.filter(id_departamento_fk=departamento_id)

class CiudadesList(generics.ListCreateAPIView):
    queryset = Ciudades.objects.all()
    serializer_class = CiudadesSerializer

class CiudadesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ciudades.objects.all()
    serializer_class = CiudadesSerializer

class DepartamentosList(generics.ListCreateAPIView):
    queryset = Departamentos.objects.all()
    serializer_class = DepartamentosSerializer

class DepartamentosDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Departamentos.objects.all()
    serializer_class = DepartamentosSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['ciudades_url'] = reverse('ciudad-list-by-departamento', args=[instance.pk], request=request)
        return Response(response_data)

class EmpleadosList(generics.ListCreateAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer

class EmpleadosDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer

class RolesList(generics.ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class RolesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class TipoDocumentoList(generics.ListCreateAPIView):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoSerializer

class TipoDocumentoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoSerializer



# Define vistas y controladores para otros modelos
