# Generated by Django 2.2 on 2021-05-25 15:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20210525_2034'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userregisterdetails',
            name='user_id',
        ),
    ]