from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Field(models.Model):
    index = models.IntegerField()
    value = models.CharField(max_length=127)

class ListingInfo(models.Model):
    listing = models.ManyToManyField(Field)

class Session(models.Model):
    static = models.ManyToManyField(Field)
    listings = models.ManyToManyField(ListingInfo)
    csv_dir = models.CharField(max_length=127)

class SavedTemplate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=63)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)