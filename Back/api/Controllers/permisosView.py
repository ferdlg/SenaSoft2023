from rest_framework import permissions

class AdminVerEmpleados(permissions.BasePermission):
    def has_permission(self, request, view):
        #verificar el tipo de metodo que se requiere en la solicitud
        if request.method in permissions.SAFE_METHODS:
            return True
        #Verificar el rol y autenticacion
        return request.user.is_authenticaded and request.user.role =='admin'
    
class AdminCrudEmpleados(permissions.BasePermission):
    def has_permission(self, request, view):
        return super().has_permission(request, view)