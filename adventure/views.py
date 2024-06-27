from django.shortcuts import render, redirect
from django.views import View
from booking.models import Reservation

class AdventurePageView(View):
    def get(self, request):
        return render(request, 'adventure/adventure.html')
    
class AdventureDetailPageView(View):
    def get(self, request):
        reservations = Reservation.objects.all()
        adventure_ids = [reservation.adventure_id for reservation in reservations]
        current_adventure_id = request.GET.get('adventure')
        is_adventure_in_list = current_adventure_id in adventure_ids
        context = {
            'is_adventure_in_list': is_adventure_in_list
        }
        return render(request, 'adventure/adventure_detail.html', context)
