# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2018-02-14 21:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0013_userregister'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='imageUrl',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
