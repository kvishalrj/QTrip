from django.shortcuts import render, HttpResponse, redirect
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.views import View
from .models import Reservation

class NewBookingView(View):
    def get(self, request):
        messages.error(request, 'Error while Booking')
        return HttpResponse('404 - Error')

    def post(self, request):
        referer = request.META.get('HTTP_REFERER')
        if request.method == 'POST':
            name = request.POST.get('name')
            date = request.POST.get('date')
            person = int(request.POST.get('person'))
            total_cost = request.POST.get('total_cost')
            adventure_id = request.POST.get('adventure_id')

            reservation = Reservation(
                user=request.user,
                name=name,
                date_of_adventure=date,
                person=person,
                total_cost=total_cost,
                adventure_id=adventure_id
            )
            reservation.save()
            messages.success(request, 'Reservation successfull')
            return redirect("/")
        
        messages.success(request, 'Reservation failed')
        return HttpResponseRedirect(request.PATH)
