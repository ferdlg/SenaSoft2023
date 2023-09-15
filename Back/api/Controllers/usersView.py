from django.contrib.auth.models import User
from django.http import JsonResponse


def crear_usuario(request):
    if request.method =='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({'message':'Usuario creado'})
        except Exception:
            return JsonResponse({'error': str(Exception)}, status=400)

    else:
        return JsonResponse({'error':'configure el metodo de la solicitud'})
