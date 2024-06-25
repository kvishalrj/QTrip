from django.db import models
from django.contrib.auth.models import User

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    date_of_adventure = models.DateField()
    person = models.IntegerField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    adventure_id = models.CharField(max_length=20) 
    
    def __str__(self):
        return f"{self.name} - {self.date_of_adventure} - {self.person} person(s) - Adventure {self.adventure_id}"
