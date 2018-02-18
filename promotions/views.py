import json

from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import ProfileForm, UserProfile, Message, Promotion
from . import models


# Create your views here.
@csrf_exempt
def list_message(request):
    message = serializers.serialize('json', models.Message.objects.all())
    return HttpResponse(message, content_type='application/json')


@csrf_exempt
def user_information(request):
    current_user = request.user.userprofile.user
    if request.user.is_authenticated():
        profile_information = serializers.serialize('json', models.UserProfile.objects.filter(user=current_user))
        return HttpResponse(profile_information, content_type='application/json')
    else:
        return render(request, "home/index.html")

#-rafa
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
def add_message(request):
    if request.method == 'POST':
        jsonMessage = json.loads(request.body)
        promotion = Promotion.objects.get(promotion_name=jsonMessage['promotion'])
        add_message = Message.objects.create(user=request.user, promotion=promotion, message=jsonMessage['message'], mail=jsonMessage['email'])
        add_message.save()
        return JsonResponse({"message": "Mensaje registrado y publicado"})
    else:
        return JsonResponse({"message": "Ups! Estamos revisado el problema"})

@login_required
@transaction.atomic
def update_user_profile(request):
    if request.method == 'POST':
        current_user = request.user.userprofile.user

        upload_image = UserProfile.objects.get(user=current_user)
        if len(request.FILES) != 0:
            upload_image.image=request.FILES['image']
            upload_image.save()

        user_profile = User.objects.filter(username=current_user)
        user_profile.update(
            username=request.POST['username'],
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
        )

        profile_edit = UserProfile.objects.filter(user=current_user)
        profile_edit.update(
            country=request.POST['country'],
            city=request.POST['city'],
            address=request.POST['address'],
            category=request.POST['category']
        )
        return JsonResponse({"message": "Usuario registrado"})
    else:
        return JsonResponse({"message": "Ups, algo nos impide realizar su actualizaci&oacuten"})



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
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email

    else:
        message = "logout"
        username = ""
        first_name = ""
        last_name = ""
        email = ""

    return JsonResponse({
        "message": message,
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
    })
