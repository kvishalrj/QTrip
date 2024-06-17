from django.contrib import admin
from django.urls import path, include
from home import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home')
]

