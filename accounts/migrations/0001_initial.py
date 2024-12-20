# Generated by Django 2.2 on 2021-07-11 13:20

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrendsExclamation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.TextField(blank=True, null=True)),
                ('url', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserRegisterDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('unique_id', models.CharField(blank=True, max_length=12, null=True)),
                ('first_name', models.CharField(blank=True, max_length=220, null=True)),
                ('last_name', models.CharField(blank=True, default='', max_length=220)),
                ('gender', models.CharField(choices=[('Select', 'Select'), ('Male', 'Male'), ('Female', 'Female'), ('Decline to answer', 'Decline to answer')], max_length=100)),
                ('dob', models.DateField(blank=True, null=True)),
                ('phone_number', models.BigIntegerField(blank=True, null=True)),
                ('email', models.EmailField(blank=True, max_length=220, null=True)),
                ('email2', models.EmailField(blank=True, max_length=220, null=True)),
                ('areaOfInterest', models.CharField(blank=True, max_length=2000, null=True)),
                ('city', models.CharField(blank=True, max_length=220, null=True)),
                ('password1', models.CharField(blank=True, max_length=220, null=True)),
                ('password2', models.CharField(blank=True, max_length=220, null=True)),
                ('first_name_public_access', models.BooleanField(null=True)),
                ('gender_public_access', models.BooleanField(blank=True, null=True)),
                ('dob_public_access', models.BooleanField(blank=True, null=True)),
                ('phone_number_public_access', models.BooleanField(blank=True, null=True)),
                ('email_public_access', models.BooleanField(blank=True, null=True)),
                ('photo', models.ImageField(blank=True, default='images/default.jpg', null=True, upload_to='images/')),
                ('clear_photo', models.BooleanField(blank=True, default=False, null=True)),
                ('is_verified', models.BooleanField(blank=True, default=False, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
