from rest_framework.permissions import BasePermission

class IsManagerOrEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.profile_user.user_type in ['Manager', 'Employee'])
