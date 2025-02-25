from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView
from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path("user/register/", views.CreateUserView.as_view(), name="register"),
    path("user/signin/", views.SignInView.as_view(), name="signin"),

    # Product Endpoints
    path("products/list/", views.ListProducts.as_view(), name="list_products"),
    path("products/create/", views.CreateProduct.as_view(), name="create_product"),
    path("products/update/<int:pk>/", views.UpdateProduct.as_view(), name="update_product"),
    path("products/delete/<int:pk>/", views.DeleteProduct.as_view(), name="delete_product"),
    path("products/<int:pk>/", views.ShowProductDetails.as_view(), name="product_details"),
    path("products/<int:pk>/rate/", views.RateProduct.as_view(), name="rate_product"),
    path("products/my/", views.MyProductList.as_view(), name="my_products"),

    # Comments Endpoints
    path("products/<int:product_id>/comments/", views.GetComments.as_view(), name="get_comments"),
    path("products/<int:product_id>/comments/create/", views.CreateComment.as_view(), name="create_comment"),

    # Customer Endpoints
    path("customers/list/", views.ListCustomers.as_view(), name="list_customers"),
    path("customers/<int:pk>/charge/", views.UpdateCustomerAmountView.as_view(), name="charge"),
    path("customers/history/", views.ShowHistoryCustomer.as_view(), name="customer_history"),
    path("customers/calculate-charge/", views.CalculateCharge.as_view(), name="calculate_charge"),
    path("customers/buy/<int:pk>/", views.Buy.as_view(), name="buy"),
    path("balance/", views.ShowBalance.as_view(), name="show_balance"),

    # Cart (Chart) Endpoints
    path("chart/add/", views.AddToChart.as_view(), name="add_to_chart"),
    path("chart/show/", views.ShowChart.as_view(), name="show_chart"),
    path("chart/update/<int:pk>/", views.UpdateChart.as_view(), name="update_chart"),
    path("chart/delete/<int:pk>/", views.DeleteFromChart.as_view(), name="delete_from_chart"),
    path("chart/clear/", views.ClearChart.as_view(), name="clear_chart"),

    # Manager Endpoints
    path("managers/list/", views.ListManagers.as_view(), name="list_managers"),
    path("managers/history/", views.ShowHistoryManager.as_view(), name="manager_history"),

    # Employee Endpoints
    path("employees/list/", views.ListEmployees.as_view(), name="list_employees"),
    path("employees/history/", views.ShowHistoryEmployee.as_view(), name="employee_history"),
    path("employees/<int:pk>/delete-fire/", views.DeleteFireEmployee.as_view(), name="delete_fire_employee"),

    # User Listing
    path("users/list/", views.ListUsers.as_view(), name="list_users"),

    # Dashboard
    path("dashboard/", views.Dashboard.as_view(), name="dashboard"),

    # Optional: Include DRF’s browsable API login URLs
    path("api-auth/", include("rest_framework.urls")),

    #User Details
        path("UserDetails/", views.UserDetailView.as_view(), name="UserDetails"),

]



 