from django.core.paginator import Paginator
from api.models import Empleados

def paginar_registros (request):
    cantidad_empleados = Empleados.objects.count()
    registros_pagina = 10 
    todos_empleados = Empleados.objects.all()

    paginator = Paginator(todos_empleados, registros_pagina)

    num_pagina = 1
    pagina = paginator.get_page(num_pagina)
    return