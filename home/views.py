from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View


class HomeView(View):
    def get(self, request):
        return render(request, 'home/home.html')