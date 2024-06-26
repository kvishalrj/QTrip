from django.shortcuts import render, HttpResponse, redirect
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from .models import Customers
from booking.models import Reservation


class RegisterPageView(View):
    def get(self, request):
        referer = request.META.get('HTTP_REFERER')
        if referer:
            return HttpResponseRedirect(referer)
        return redirect('/')

class RegisterCustomerView(View):
    def get(self, request):
        messages.error(request, 'Error while SignUp')
        return HttpResponse('404 - Error')
        
    def post(self, request):
        referer = request.META.get('HTTP_REFERER')
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        phone_number = request.POST.get('phoneNumber')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        if not all([fname, lname, email, phone_number, password, confirm_password]):
            messages.error(request, 'All fields are required.')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')
        
        if password != confirm_password:
            messages.error(request, 'Passwords must match.')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already taken.')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')

        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = fname
            user.last_name = lname
            user.save()

            customer = Customers(user=user, first_name=fname, last_name=lname, email=email, phone_number=phone_number)
            customer.save()

            messages.success(request, 'Your account has been successfully created.')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')
        except Exception as e:
            messages.error(request, f'An error occurred: {e}')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')
 
class LoginCustomerView(View):
    def get(self, request):
        return redirect('/')

    def post(self, request):
        referer = request.META.get('HTTP_REFERER')
        loginemail = request.POST.get('loginemail')
        loginpass = request.POST.get('loginpass')

        user = authenticate(request, username=loginemail, password=loginpass)

        if user is not None:
            login(request, user)
            messages.success(request, 'Successfully Logged In')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')  
        else:
            messages.error(request, 'Invalid credentials, please try again...')
            if referer:
                return HttpResponseRedirect(referer)
            return redirect('/')

class LogoutCustomerView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'Successfully logged out')
        return redirect('/')
    
class MyReservationsView(View):
    def get(self, request):
        user = request.user
        reservations = Reservation.objects.filter(user=user)
        context = {'reservations': reservations}
        return render(request, 'user/reservations_history.html', context)
        
