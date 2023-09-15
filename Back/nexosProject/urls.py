from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenVerifyView, TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls')),

    #urls para generar, refrescar y verificar tokens 
    path('api/token/', TokenObtainPairView.as_view(), name='token_generate'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
