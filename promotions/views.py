from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Promotion, Message


# Create your views here.
def list_promotion(request):
    promotions = serializers.serialize('json', Promotion.objects.all())
    return HttpResponse(promotions, content_type='application/json')


def home(request):
    return render(request, "home/index.html")
