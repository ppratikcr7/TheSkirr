from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.
class UserRegisterDetails(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('D', 'Decline to answer'),
    )
    user_FirstName = models.CharField(max_length=220, null=True, blank=True)
    user_LasttName = models.CharField(max_length=220, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    dob = models.DateField(null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    email_id = models.EmailField(max_length=220, null=True, blank=True)
    username = models.CharField(max_length=220, null=True, blank=True)
    password1 = models.CharField(max_length=220, null=True, blank=True)
    password2 = models.CharField(max_length=220, null=True, blank=True)

# class InstitutionalUserRegisterDetails(models.Model):
#     GENDER_CHOICES = (
#         ('M', 'Male'),
#         ('F', 'Female'),
#         ('D', 'Decline to answer'),
#     )
#     user_FirstName = models.CharField(max_length=220, null=True, blank=True)
#     user_LasttName = models.CharField(max_length=220, null=True, blank=True)
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
#     dob = models.DateField(null=True, blank=True)
#     phone_number = models.IntegerField(null=True, blank=True)
#     email_id = models.EmailField(max_length=220, null=True, blank=True)
#     username = models.CharField(max_length=220, null=True, blank=True)
#     password1 = models.CharField(max_length=220, null=True, blank=True)
#     password2 = models.CharField(max_length=220, null=True, blank=True)

