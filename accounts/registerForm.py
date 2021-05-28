from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('D', 'Decline to answer'),
    )
class SignUpForm(UserCreationForm):
    user_FirstName = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'First Name', 'id': 'username'}))
    user_LasttName = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Last Name', 'id': 'username'}))
    phone_number = forms.IntegerField(widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Phone', 'id': 'username'}))
    email_id = forms.EmailField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email', 'id': 'username'}))
    username = forms.CharField(max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'User Name', 'id': 'username'}))
    dob = forms.DateField(widget=forms.TextInput(
        attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id': 'username'}))
    gender = forms.TypedChoiceField(choices=GENDER_CHOICES,widget=forms.Select(
        attrs={'class': 'form-control', 'placeholder': 'Select Gender', 'id': 'username'}))

    


    class Meta:
        model = User
        fields = ('username','user_FirstName','user_LasttName','phone_number', 'email_id','dob', 'password1', 'password2','gender' )