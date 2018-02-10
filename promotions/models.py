# coding=utf-8
from __future__ import unicode_literals

from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
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


class Message(models.Model):
    message = models.CharField(max_length=300)
    mail = models.CharField(max_length=100, null=True, blank=True)
    promotion = models.ForeignKey(Promotion, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)


class Favorite(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)


class UserRegister(ModelForm):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    username = forms.CharField(max_length=30)
    password = forms.CharField(max_length=30)
    confirm_password = forms.CharField(max_length=30)
    email = forms.CharField(max_length=50)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "password", "confirm_password", "email"]

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username):
            raise forms.ValidationError("Nombre de usario ya registrado")
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email):
            raise forms.ValidationError("Correo ya registrado")
        return email

    def clean_password(self):
        password = self.cleaned_data['password']
        confirm_password = self.cleaned_data['confirm_password']
        if password != confirm_password:
            raise forms.ValidationError("Las contraseñas no coinciden")
        return password


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    image = forms.CharField(widget=forms.Textarea)
    country = forms.CharField(max_length=50)
    city = forms.CharField(max_length=50)
    address = forms.CharField(max_length=50)
    category = forms.CharField(max_length=100)
