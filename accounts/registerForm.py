from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.forms.widgets import ClearableFileInput
from .models import UserRegisterDetails
from django.core.exceptions import ValidationError
from functools import partial
import datetime
from django.core.validators import RegexValidator

GENDER_CHOICES = (
        ('Select', 'Select'),
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Decline to answer', 'Decline to answer'),
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
    if value == 'Select':
        raise ValidationError("Please select a Gender.")

def validate_age(value):
        dob = value
        age = (datetime.date.today() - dob).days/365
        if age < 15:
            raise ValidationError('You must be above 15 years of age to sign up / register with theskirr. Filling in wrong information could lead to suspension of your account and due compliances with rules and regulations as stipulated by Government of India would be followed.')
        return dob

class MyClearableFileInput(ClearableFileInput):
    initial_text = 'currently'
    input_text = 'change'
    clear_checkbox_label = 'clear'
    template_with_initial = (
        '%(initial_text)s: <a href="%(initial_url)s">%(initial)s</a> '
        '%(clear_template)s<br />%(input_text)s: %(input)s'
    )


# def last_name_pa(value):
#     if value and not last_name():
#         raise ValidationError("You have not entered the last name")

class DateInput(forms.DateInput):
    input_type = 'date'
class SignUpForm(UserCreationForm):

    city_fname_lname_regex = RegexValidator(regex = r'^[a-zA-Z][a-zA-Z ]{1,}$', message="No special characters or numerals allowed!")

    first_name = forms.CharField(error_messages={'required':''}, validators = [city_fname_lname_regex], max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'First Name', 'id': 'first_name'}))

    first_name_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    last_name = forms.CharField(error_messages={'required':''}, max_length=100, required=False, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Last Name', 'id': 'username'}))

    # last_name_public_access = forms.ChoiceField(initial='False', required=False, widget=forms.RadioSelect(
        # attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    username = forms.CharField(error_messages={'required': ''}, max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'User Name', 'id': 'username'}))

    phone_regex = RegexValidator(regex=r'^\d{6,10}$', message="Phone number must be entered in the format: '9999999999'. Up to 10 digits allowed. No alphabets or special characters allowed.")
    phone_number = forms.CharField(error_messages={'required': ''}, validators=[phone_regex, validate_phoneNumber ], max_length=10, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Phone', 'id': 'phone_num'})) # validators should be a list

    phone_number_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    # phone_number_public = forms.RadioSelect()
    email = forms.EmailField(error_messages={'required': ''}, validators = [validate_email], max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Email ID', 'id': 'email'}))

    email_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    email2 = forms.EmailField(validators = [validate_email], required=False, max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Secondary Email ID', 'id': 'email2'}))

    # email2_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
    #     attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))
    
    city = forms.CharField(error_messages={'required':''}, max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'City', 'id': 'city'}))
    
    # dob = forms.DateField(widget=forms.TextInput(
    #     attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id'Register: 'username'}))
    dob = forms.DateField(error_messages={'required':''}, validators = [validate_dob, validate_future_dob, validate_age], widget=DateInput(attrs={'class': 'datepicker', 'style': 'border-width: 1; border-color: #ced4da;', 'placeholder': 'YYYY-MM-DD', 'id': 'username'}))
    # dob = forms.DateField(widget=forms.widgets.DateInput(attrs={'type': 'date'}))

    dob_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    gender = forms.TypedChoiceField(error_messages={'required':''}, validators = [validate_gender],choices=GENDER_CHOICES, widget=forms.Select(
        attrs={'class': 'form-control', 'placeholder': 'Select Gender', 'id': 'username'}))
    
    gender_public_access = forms.ChoiceField(error_messages={'required':''},widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))
    
    areaOfInterest = forms.CharField(error_messages={'required':''},required=False, widget=forms.Textarea(attrs={'cols':50, 'rows': 3 , 'style': 'border-width: 1; border-color: #ced4da;', 'placeholder':' Write your area of interest here!'}))
    
    password1 = forms.CharField(error_messages={'required': ''}, widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password',
                'id': 'password1',
            }))
    password2 = forms.CharField(error_messages={'required': ''}, widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Confirm Password',
            'id': 'password2',
        }
        ))
    photo = forms.ImageField(required=False)
    class Meta:
        model = UserRegisterDetails
        fields = ('username','first_name','last_name','phone_number', 'email', 'email2', 'city', 'dob', 'areaOfInterest', 'password1', 'password2','gender', 'photo' )

        