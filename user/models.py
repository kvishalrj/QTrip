from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

# Create your models here.
class Customers(models.Model):
    sno = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
