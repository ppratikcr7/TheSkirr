from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('D', 'Decline to answer'),
    )
class SignUpForm(UserCreationForm):
    user_FirstName = forms.CharField(max_length=100)
    user_LasttName = forms.CharField(max_length=100)
    phone_number = forms.IntegerField()
    email_id = forms.EmailField(max_length=100)
    username = forms.CharField(max_length=100)
    dob = forms.DateField()
    gender = forms.TypedChoiceField(choices=GENDER_CHOICES)

    


    class Meta:
        model = User
        fields = ('username','user_FirstName','user_LasttName','phone_number', 'email_id','dob', 'password1', 'password2','gender' )