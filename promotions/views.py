import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from promotions.models import UserProfile, ProfileForm
from . import models


# Create your views here.
@csrf_exempt
def list_promotion(request):
    promotions = serializers.serialize('json', models.Promotion.objects.all())
    return HttpResponse(promotions, content_type='application/json')


@csrf_exempt
def home(request):
    return render(request, "home/index.html")


@csrf_exempt
def profile(request):
    return render(request, "profile/index.html")


@csrf_exempt
def edit_profile(request):
    if request.method == 'POST':
        jsonProfile = json.loads(request.body)
        get_user = jsonProfile['username']
        get_profile = UserProfile.objects.filter(user=get_user)
    return JsonResponse(get_profile)

    """
    user_id = UserProfile.objects.get(pk=pk)
    if request.method == 'POST':
        form_edit = ProfileForm(request.POST, instance=user_id)
        form_edit.save()
    return HttpResponse(serializers.serialize('json', [form_edit]))
    """

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
                                   address=jsonUser['address'])

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
        user = request.user.username
    else:
        message = "logout"
        user = ""

    return JsonResponse({"message": message, "username": user})
