from django.urls import path
from user import views

urlpatterns = [
    path('registerPage', views.RegisterPageView.as_view(), name='register_page'),
    path('registerCustomer', views.RegisterCustomerView.as_view(), name='register'),
    path('loginCustomer', views.LoginCustomerView.as_view(), name='login'),
    path('logoutCustomer', views.LogoutCustomerView.as_view(), name='logout'),
    path('my_reservations', views.MyReservationsView.as_view(), name='myReservations')
]
