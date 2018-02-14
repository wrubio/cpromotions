import json

from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import ProfileForm, UserProfile
from . import models


# Create your views here.
@csrf_exempt
def list_promotion(request):
    promotions = serializers.serialize('json', models.Promotion.objects.all())
    return HttpResponse(promotions, content_type='application/json')

@csrf_exempt
def list_category(request):
    category = serializers.serialize('json', models.Category.objects.all())
    return HttpResponse(category, content_type='application/json')


@csrf_exempt
def home(request):
    return render(request, "home/index.html")


@csrf_exempt
def profile(request):
    return render(request, "profile/index.html")


@login_required
@transaction.atomic
def update_user_profile(request):
    if request.method == 'POST':
        current_user = request.user.userprofile.user

        upload_image = UserProfile.objects.get(user=current_user)
        upload_image.image=request.FILES['image']
        upload_image.save()

        user_profile = User.objects.filter(username=current_user)
        user_profile.update(
            username=request.POST['username'],
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
            password=request.POST['password'],
        )

        profile_edit = UserProfile.objects.filter(user=current_user)
        profile_edit.update(
            country=request.POST['country'],
            city=request.POST['city'],
            address=request.POST['address']
        )
        return JsonResponse({"message": "Usuario registrado"})
    else:
        current_user = request.user
        message = "Usuario no registrado"
        return JsonResponse({"message": current_user.userprofile.country})



@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        first_name = jsonUser['first_name']
        last_name = jsonUser['last_name']
        username = jsonUser['username']
        password = jsonUser['password']
        email = jsonUser['email']

        user_model = User.objects.create_user(username=username, password=password)
        user_model.first_name = first_name
        user_model.last_name = last_name
        user_model.email = email
        user_model.save()
        UserProfile.objects.create(user=user_model, country=jsonUser['country'], city=jsonUser['city'],
                                   address=jsonUser['address'], category=jsonUser['category'])

    return HttpResponse(serializers.serialize("json", [user_model]))


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        username = jsonUser['username']
        password = jsonUser['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            message = "ok"
        else:
            message = "Nombre de usuario o clave no valido"

    return JsonResponse({"message": message})


@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({"message": "ok"})


@csrf_exempt
def user_logged(request):
    if request.user.is_authenticated():
        message = "logged"
        username = request.user.username
        country = request.user.userprofile.country
        city = request.user.userprofile.city
        address = request.user.userprofile.address
        category = request.user.userprofile.category
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email

    else:
        message = "logout"
        username = ""
        username = ""
        country = ""
        city = ""
        address = ""
        category = ""
        first_name = ""
        last_name = ""
        email = ""

    return JsonResponse({
        "message": message,
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "country": country,
        "city": city,
        "address": address,
        "category": category
    })
