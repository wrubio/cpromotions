# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2018-02-18 01:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0016_auto_20180217_2052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(null=True, upload_to='/profile/'),
        ),
    ]
