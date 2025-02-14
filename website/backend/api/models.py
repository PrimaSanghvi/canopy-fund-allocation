from django.db import models

# Create your models here.
class Investor(models.Model):
    name = models.CharField(max_length=100, unique=True)
    requested_amount = models.FloatField()
    average_amount = models.FloatField()

    def __str__(self):
        return self.name
    
