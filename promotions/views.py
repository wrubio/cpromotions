import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from . import models
from django.contrib.auth.models import User


# Create your views here.
@csrf_exempt
def list_promotion(request):
    promotions = serializers.serialize('json', models.Promotion.objects.all())
    return HttpResponse(promotions, content_type='application/json')


def home(request):
    return render(request, "home/index.html")


@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        first_name = jsonUser['first_name']
        last_name = jsonUser['last_name']
        country = jsonUser['country']
        city = jsonUser['city']
        address = jsonUser['address']
        username = jsonUser['username']
        password = jsonUser['password']
        email = jsonUser['email']

        user_model = User.objects.create_user(username=username, password=password)
        user_model.first_name = first_name
        user_model.last_name = last_name
        user_model.country = country
        user_model.city = city
        user_model.address = address
        user_model.email = email
        user_model.save()
    return HttpResponse(serializers.serialize("json", [user_model]))
