from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from .models import Customers


class RegisterPageView(View):
    def get(self, request):
        return render(request, 'user/register.html')

class RegisterCustomerView(View):
    def get(self, request):
        messages.error(request, 'Error while SignUp')
        return HttpResponse('404 - Error')
        
    def post(self, request):
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        phoneNumber = request.POST['phoneNumber']
        password = request.POST['password']
        confirmPassword = request.POST['confirmPassword']

        # input validations
        if password != confirmPassword:
            messages.error(request, 'Password must be match')
            return redirect('home')

        # Creating user by built in User model
        mycustomer = User.objects.create_user(email, email, password) # username, email, password
        mycustomer.first_name = fname
        mycustomer.last_name = lname
        mycustomer.save()
        customer = Customers(first_name=fname, last_name=lname, email=email, phone_number=phoneNumber, password=password)
        customer.save()
        messages.success(request, 'Your account has been successfully created.')
        return redirect('/')
 
class LoginCustomerView(View):
    def get(self, request):
        messages.success(request, 'Error while Login')
        return HttpResponse('404 - Error')

    def post(self, request):
        loginemail = request.POST['loginemail']
        loginpass = request.POST['loginpass']

        user = authenticate(email=loginemail, password=loginpass)

        if user is not None:
            login(request, user)
            messages.success(request, 'Successfully Logged In')
            return redirect('')
        else:
            messages.error(request, 'Invalid credentials, Please try again...')
            return redirect('/')

class LogoutCustomerView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Successfully logged out')
        return redirect('/')
