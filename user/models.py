from django.db import models
from django.utils.timezone import now

# Create your models here.
class Customers(models.Model):
    sno = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=100) 

    def __str__(self) -> str:
        return f"{self.email}"
