from accounts.models import UserRegisterDetails
from django import forms
from django.contrib.auth import get_user_model

from .models import Profile 

User = get_user_model()


class UserProfileForm(forms.ModelForm):
    location = forms.CharField(required=False)
    bio = forms.CharField(required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=False)
    email = forms.CharField(required=True)
    class Meta:
        model = UserRegisterDetails
        fields = ['first_name', 'last_name', 'email']

class SignUpForm(forms.ModelForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=False)
    email = forms.CharField(required=True)
    phone_number = forms.CharField(required=True)
    email2 = forms.EmailField(required=False)
    city = forms.CharField(required=True)
    username = forms.CharField(required=True)
    dob = forms.DateField(required=True)
    gender = forms.TypedChoiceField(required=True)
    areaOfInterest = forms.CharField(required=False)
    password1 = forms.CharField(required=True)
    password2 = forms.CharField(required=True)
    class Meta:
        model = UserRegisterDetails
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'email2', 'city', 'username', 'dob',  'gender', 'areaOfInterest', 'password1', 'password2']
class ProfileBasicForm(forms.Form):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email_address = forms.CharField(required=False)
    location = forms.CharField(required=False)
    bio = forms.CharField(required=False)