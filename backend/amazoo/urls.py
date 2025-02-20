from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("api.urls")),  # This includes the URLs from your app's urls.py
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshSlidingView.as_view(), name="refresh"),
]
  