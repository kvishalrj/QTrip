from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from .models import Customers


class RegisterPageView(View):
    def get(self, request):
        return redirect('/')

class RegisterCustomerView(View):
    def get(self, request):
        messages.error(request, 'Error while SignUp')
        return HttpResponse('404 - Error')
        
    def post(self, request):
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        phone_number = request.POST.get('phoneNumber')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        if not all([fname, lname, email, phone_number, password, confirm_password]):
            messages.error(request, 'All fields are required.')
            return redirect('/')
        
        if password != confirm_password:
            messages.error(request, 'Passwords must match.')
            return redirect('/')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already taken.')
            return redirect('/')

        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = fname
            user.last_name = lname
            user.save()

            customer = Customers(user=user, first_name=fname, last_name=lname, email=email, phone_number=phone_number)
            customer.save()

            messages.success(request, 'Your account has been successfully created.')
            return redirect('/')
        except Exception as e:
            messages.error(request, f'An error occurred: {e}')
            return redirect('/')
 
class LoginCustomerView(View):
    def get(self, request):
        return redirect('/')

    def post(self, request):
        loginemail = request.POST.get('loginemail')
        loginpass = request.POST.get('loginpass')

        user = authenticate(request, username=loginemail, password=loginpass)

        if user is not None:
            login(request, user)
            messages.success(request, 'Successfully Logged In')
            return redirect('/')  
        else:
            messages.error(request, 'Invalid credentials, please try again...')
            return redirect('/')

class LogoutCustomerView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Successfully logged out')
        return redirect('/')
