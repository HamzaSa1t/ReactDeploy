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
  

  
 # refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MDgwMjk3MywiaWF0IjoxNzQwNTQzNzczLCJqdGkiOiI3Zjg3NWJhYmEzYjg0OTIyYTVjNGFlOTc1NDg5ZDNmZiIsInVzZXJfaWQiOjI1fQ.2E3whC0DL2iN4vAbEnoWaC8gx-eqe9x0yv90z88NdK0",
#  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwNzE2NTczLCJpYXQiOjE3NDA1NDM3NzMsImp0aSI6IjBiOWZkY2NlZThkYTRmMmRiMTI0ZmEwYzkyMDRmM2RkIiwidXNlcl9pZCI6MjV9.Qe0P8w5HwJ8VA_DSsfR1WWVRnXejFJWkVy3F111JMqw"

