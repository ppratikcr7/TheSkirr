from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserRegisterDetails


GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('D', 'Decline to answer'),
    )

class DateInput(forms.DateInput):
    input_type = 'date'
class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'First Name', 'id': 'username'}))
    last_name = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Last Name', 'id': 'username'}))
    phone_number = forms.IntegerField(widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Phone', 'id': 'username'}))
    email_id = forms.EmailField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email', 'id': 'username'}))
    username = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'User Name', 'id': 'username'}))
    # dob = forms.DateField(widget=forms.TextInput(
    #     attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id': 'username'}))
    dob = forms.DateField(widget=DateInput(attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id': 'username'}))
    gender = forms.TypedChoiceField(choices=GENDER_CHOICES,widget=forms.Select(
        attrs={'class': 'form-control', 'placeholder': 'Select Gender', 'id': 'username'}))
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
        model = User
        fields = ('username','first_name','last_name','phone_number', 'email_id','dob', 'password1', 'password2','gender' )

        