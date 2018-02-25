import json

from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import UserForm, ProfileForm, UserProfile, Message, Promotion, Token
from . import models

from django.core.mail import send_mail
from uniqtoken import uniqtoken
from django.template import loader

# Create your views here.
@csrf_exempt
def list_message(request):
    message = serializers.serialize('json', models.Message.objects.all())
    return HttpResponse(message, content_type='application/json')


@csrf_exempt
def list_cities(request):
    cities = serializers.serialize('json', models.Cities.objects.all())
    return HttpResponse(cities, content_type='application/json')


@csrf_exempt
def user_information(request):
    current_user = request.user.userprofile.user
    if request.user.is_authenticated():
        profile_information = serializers.serialize('json', models.UserProfile.objects.filter(user=current_user))
        return HttpResponse(profile_information, content_type='application/json')
    else:
        return render(request, "home/index.html")


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
        return JsonResponse({"message": "Datos actualizados con"})
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

        if not User.objects.filter(username=username).exists():
            if not User.objects.filter(email=email).exists():
                user_model = User.objects.create_user(username=username, password=password)
                user_model.first_name = first_name
                user_model.last_name = last_name
                user_model.email = email
                user_model.save()
                UserProfile.objects.create(user=user_model, country=jsonUser['country'], city=jsonUser['city'],
                                           address=jsonUser['address'], category=jsonUser['category'])

                return HttpResponse(serializers.serialize("json", [user_model]))
            else:
                email_Message = "El correo " + email + " ya existe!"
                return JsonResponse({"message": email_Message, "register": "false"})

        else:
            username_Message = "El usuario " + username + " ya existe!"
            return JsonResponse({"message": username_Message, "register": "false"})



@csrf_exempt
def crear_token(request):
    if request.method == 'POST':
        param = json.loads(request.body)
        token = uniqtoken()
        user = User.objects.get(id=param['user_id'])
        Token.objects.create(user=user, token=token)
        url = 'localhost:8000/token/'+token+'/?user_id='+str(param["user_id"])
        html_message = loader.render_to_string(
            'email/welcome.html',
            {
                'link_url': url,
            }
        )
        send_mail(
            'Confirmacion de cuenta',
            'copia y pega en un navegador: '  + url,
            'root@localhost',
            [param['email']],
            fail_silently=False,
            html_message=html_message
        )
    return JsonResponse({"message": {}})


@csrf_exempt
def validar_token(request, token=None):
    user_id = request.GET.get('user_id')
    userobj = User.objects.get(id=user_id)
    tokenObj = Token.objects.filter(token=token)
    if Token.objects.filter(token=token).exists():
        tokenObj.update(state=True)
        UserProfile.objects.filter(user=userobj).update(validated_token=True)
        return render(request, "profile/index.html")
    else:
        return JsonResponse({"message": "no coincide"})



@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        username = jsonUser['username']
        password = jsonUser['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            current_user = User.objects.get(username=username)
            token_value = current_user.userprofile.validated_token
            if token_value == 'True':
                login(request, user)
                message = "ok"
            else:
                return JsonResponse({"message": "false"})
        else:
            message = "Nombre de usuario o clave no v&aacute;lido"

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
