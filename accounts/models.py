from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from PIL import Image

# User = settings.AUTH_USER_MODEL

# Create your models here.


class UserRegisterDetails(AbstractUser):
    unique_id = models.CharField(max_length=12, null=True, blank=True)
    GENDER_CHOICES = (
        ('Select', 'Select'),
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Decline to answer', 'Decline to answer'),
    )
    first_name = models.CharField(max_length=220, null=True, blank=True)
    last_name = models.CharField(max_length=220, blank=True, default='')
    gender = models.CharField(max_length=100, choices=GENDER_CHOICES)
    dob = models.DateField(null=True, blank=True)
    phone_number = models.BigIntegerField(null=True, blank=True)
    # phone_number_public = models.CharField(max_length=10,choices=TYPE_SELECT)
    email = models.EmailField(max_length=220, null=True, blank=True)
    email2 = models.EmailField(max_length=220, null=True, blank=True)
    areaOfInterest = models.CharField(max_length=2000, null=True, blank=True)
    city = models.CharField(max_length=220, null=True, blank=True)
    # username = models.CharField(max_length=220, null=True, blank=True)
    password1 = models.CharField(max_length=220, null=True, blank=True)
    password2 = models.CharField(max_length=220, null=True, blank=True)

    first_name_public_access = models.BooleanField(null=True)
    # last_name_public_access = models.BooleanField(default = 'False', null=True, blank=True)
    gender_public_access = models.BooleanField(null=True, blank=True)
    dob_public_access = models.BooleanField(null=True, blank=True)
    phone_number_public_access = models.BooleanField(null=True, blank=True)
    email_public_access = models.BooleanField(null=True, blank=True)
    # email2_public_access = models.BooleanField(default = 'False',null=True, blank=True)

    photo = models.ImageField(null=True, blank=True, upload_to = "images/", default='images/default.jpg')
    clear_photo = models.BooleanField(null = True, blank = True, default=False)
    is_verified = models.BooleanField(null = True, blank = True, default=False)

    def save(self, *args, **kwargs):
        super(UserRegisterDetails, self).save(*args, **kwargs)  # saving image first
        if(self.photo.path):
            img = Image.open(self.photo.path).convert('RGB') # Open image using self
            # File(open(result[0], 'rb')
            if img.height > 120 or img.width > 120:
                new_img = (120, 120)
                img.thumbnail(new_img)
                img.save(self.photo.path)  # saving image at the same path

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

class TrendsExclamation(models.Model):
    topic = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)