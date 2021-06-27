from django.contrib.auth.forms import UsernameField
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
    username = forms.CharField(required=True, disabled=True)
    phone_number = forms.CharField(required=True)
    email = forms.CharField(required=True)
    email2 = forms.CharField(required=False)
    city = forms.CharField(required=True)
    dob = forms.CharField(required=True, disabled=True)
    gender = forms.CharField(required=True, disabled=True)
    areaOfInterest = forms.CharField(required=False)
    
    class Meta:
        model = UserRegisterDetails
        fields = ['first_name', 'last_name', 'username', 'phone_number', 'email',
        'email2', 'city', 'dob', 'gender', 'areaOfInterest']

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
    # first_name_public_access = forms.ChoiceField(required=True)
    # last_name_public_access = forms.CharField(required=True)
    # gender_public_access = forms.CharField(required=True)
    # dob_public_access = forms.CharField(required=True)
    # phone_number_public_access = forms.CharField(required=True)
    # email_public_access = forms.CharField(required=True)
    # email2_public_access = forms.CharField(required=True)
    class Meta:
        model = UserRegisterDetails
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'email2', 'city', 'username', 
        'dob',  'gender', 'areaOfInterest', 'password1', 'password2', 'first_name_public_access', 'last_name_public_access',
        'gender_public_access','dob_public_access', 'phone_number_public_access', 'email_public_access', 'email2_public_access']
class ProfileBasicForm(forms.Form):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email_address = forms.CharField(required=False)
    location = forms.CharField(required=False)
    bio = forms.CharField(required=False)