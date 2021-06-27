from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserRegisterDetails
from django.core.exceptions import ValidationError
from functools import partial
import datetime
from django.core.validators import RegexValidator

GENDER_CHOICES = (
        ('S', 'Select'),
        ('M', 'Male'),
        ('F', 'Female'),
        ('D', 'Decline to answer'),
    )
DateInput = partial(forms.DateInput, {'class': 'datepicker'})

def validate_email(value):
    if UserRegisterDetails.objects.filter(email = value).exists():
        raise ValidationError((f"The email id: {value} is already taken. Please use another email id."),params = {'value':value})

def validate_phoneNumber(value):
    if UserRegisterDetails.objects.filter(phone_number = value).exists():
        raise ValidationError((f"The contact: {value} is already taken. Please use another contact."),params = {'value':value})

def validate_dob(value):
    try:
        datetime.datetime.strptime(str(value), '%Y-%m-%d')
    except ValueError:
        raise ValidationError("Incorrect data format, should be YYYY-MM-DD")

def validate_future_dob(value):
    if value > datetime.date.today():
        raise ValidationError("Incorrect date. DOB can't be a future date.")

def validate_gender(value):
    if value == 'S':
        raise ValidationError("Please select a Gender.")
class DateInput(forms.DateInput):
    input_type = 'date'
class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'First Name', 'id': 'username'}))
    last_name = forms.CharField(max_length=100, required=False, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Last Name', 'id': 'username'}))
    phone_regex = RegexValidator(regex=r'^\d{6,10}$', message="Phone number must be entered in the format: '9999999999'. Up to 10 digits allowed.")
    phone_number = forms.CharField(validators=[phone_regex], max_length=10, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Phone', 'id': 'username'})) # validators should be a list

    # phone_number_public = forms.RadioSelect()
    email = forms.EmailField(validators = [validate_email], max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email ID', 'id': 'username'}))
    email2 = forms.EmailField(validators = [validate_email], required=False, max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Secondary Email ID', 'id': 'username'}))
    
    city = forms.CharField(max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'City', 'id': 'city'}))
    username = forms.CharField(max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'User Name', 'id': 'username'}))
    # dob = forms.DateField(widget=forms.TextInput(
    #     attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id'Register: 'username'}))
    dob = forms.DateField(validators = [validate_dob, validate_future_dob], widget=DateInput(attrs={'class': 'datepicker', 'style': 'border-width: 1; border-color: #ced4da;', 'placeholder': 'YYYY-MM-DD', 'id': 'username'}))
    # dob = forms.DateField(widget=forms.widgets.DateInput(attrs={'type': 'date'}))

    gender = forms.TypedChoiceField(validators = [validate_gender],choices=GENDER_CHOICES, widget=forms.Select(
        attrs={'class': 'form-control', 'placeholder': 'Select Gender', 'id': 'username'}))
    areaOfInterest = forms.CharField(required=False, widget=forms.Textarea(attrs={'cols':50, 'rows': 3 , 'style': 'border-width: 1; border-color: #ced4da;', 'placeholder':' Write your area of interest here!'}))
    password1 = forms.CharField(widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password',
                'id': 'password1',
            }))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Confirm Password',
            'id': 'password2',
        }
        ))

    class Meta:
        model = UserRegisterDetails
        fields = ('username','first_name','last_name','phone_number', 'email', 'email2', 'city', 'dob', 'areaOfInterest', 'password1', 'password2','gender' )

        