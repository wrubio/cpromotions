from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return u'{}'.format(self.name)


class Promotion(models.Model):
    promotion_name = models.CharField(max_length=50)
    initial_date = models.DateTimeField(auto_now_add=False)
    end_date = models.DateTimeField(auto_now_add=False)
    city = models.CharField(max_length=20)
    cost = models.DecimalField(max_digits=2, decimal_places=2)
    description = models.CharField(max_length=300)
    image = models.CharField(max_length=600)
    state = models.BooleanField(default=True)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'{}'.format(self.promotion_name)


class User(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=15)
    image = models.TextField()
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)


class Message(models.Model):
    message = models.CharField(max_length=300)
    mail = models.CharField(max_length=100, null=True, blank=True)
    promotion = models.ForeignKey(Promotion, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)


class Favorite(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
