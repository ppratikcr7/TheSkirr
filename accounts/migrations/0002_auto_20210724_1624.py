# Generated by Django 2.2 on 2021-07-24 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userregisterdetails',
            name='phone_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
