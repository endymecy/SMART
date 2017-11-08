# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-08 16:31
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0026_auto_20171107_1927'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='model',
            name='cv_std',
        ),
        migrations.AddField(
            model_name='model',
            name='cv_metrics',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={'test': 'pass'}),
            preserve_default=False,
        ),
    ]
