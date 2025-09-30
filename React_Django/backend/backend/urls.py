from api.views import CreateUserViewer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# TokenObtainPairView is used to create and return a new pair of tokens: an access token and a refresh token when a user authenticates (logs in). This view is the standard way to obtain these tokens by providing valid user credentials.
#TokenRefreshView  Uses a separate refresh token to obtain a new access token. The refresh token itself has its own expiration time. Once the refresh token expires, the user must re-authenticate (log in again) to get new tokens. The access token cannot be refreshed indefinitely without re-login.
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
import api.urls




urlpatterns = [
    # If someone goes to /admin/, show Django's built-in admin site
    path('admin/', admin.site.urls),
    
    # When someone goes to /api/token/, give them a token for logging in (like a password, but fancier)
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    
    # If they go to /api/user/register, run the CreateUserViewer to make a new user (like signing up)
    path('api/user/register/', CreateUserViewer.as_view(), name='register'),
    
    # If someone goes to /api/token/refresh/, let them refresh their token to stay logged in
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),        
    
    # This lets people log in/out using DRF’s default UI at /api-auth/
    path('api-auth/', include('rest_framework.urls')),

    path('api/',include("api.urls")),
]
