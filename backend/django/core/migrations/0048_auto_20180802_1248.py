# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-08-02 12:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0047_merge_20180801_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='classifier',
            field=models.CharField(choices=[('logistic_regression', 'Logistic Regression (default)'), ('svm', 'Support Vector Machine (warning: slower for large datasets)'), ('random_forest', 'Random Forest'), ('gnb', 'Gaussian Naive Bayes')], default='logistic_regression', max_length=19, null=True),
        ),
    ]
