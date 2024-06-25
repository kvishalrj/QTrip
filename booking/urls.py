from django.urls import path
from booking import views

urlpatterns = [
    path('newBooking', views.NewBookingView.as_view(), name='new_booking'),
]