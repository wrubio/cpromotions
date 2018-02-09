# coding=utf-8
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from django.db import models

# Create your models here.
admin.site.unregister(User)