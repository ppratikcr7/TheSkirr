from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserRegisterDetails
from django.core.exceptions import ValidationError
from functools import partial
import datetime
from django.core.validators import RegexValidator

from django.forms.widgets import ClearableFileInput


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
    if '@' not in value:
        raise ValidationError("Please Enter the proper Email")

def validate_phoneNumber(value):
    if UserRegisterDetails.objects.filter(phone_number = value).exists():
        raise ValidationError((f"The contact: {value} is already taken. Please use another contact."),params = {'value':value})
    if ('@' or '+' or '-' or '.' or ',' or '!' or '#' or '$' or '%' or '^' \
    or '&' or '*' or '(' or ')' or '/' or ' ' or '=' or '{' or '}' or '' or '|' \
    or '[' or ']' or ':' or ';' or '"' or '<' or '>') in value:
        raise ValidationError(" Symbols are not allowed in Phone Number.")



def validate_dob(value):
    try:
        datetime.datetime.strptime(str(value), '%Y-%m-%d')
    except ValueError:
        raise ValidationError("Incorrect data format, should be YYYY-MM-DD")

def validate_future_dob(value):
    if value > datetime.date.today():
        raise ValidationError("Incorrect date. DOB can't be a future date.")

# def age_check(value):
#         # dob = self.cleaned_data['birthday']
#     age = (datetime.date.today() - value).days / 365
#     if age < 15:
#         raise forms.ValidationError('You must be at least 15 years old')
    
def validate_gender(value):
    if value == 'Select':
        raise ValidationError("Please select a Gender.")

# def validate_fname(value):
#     if '@' or '+' or '-' or '.' or ',' or '!' or '#' or '$' or '%' or '^' \
#     or '&' or '*' or '(' or ')' or '/' or ' ' or '=' or '{' or '}' or '' or '|' \
#     or '[' or ']' or ':' or ';' or '"' or '<' or '>' or "\\"  in value:
#         raise ValidationError(" Symbols are not allowed in firstname.")

def validate_city_fname_lname(value):
    if ('@' or '+' or '-' or '.' or ',' or '!' or '#' or '$' or '%' or '^' \
    or '&' or '*' or '(' or ')' or '/' or ' ' or '=' or '{' or '}' or '' or '|' \
    or '[' or ']' or ':' or ';' or '"' or '<' or '>' or '1' or '2' \
    or '3 'or '4' or '5' or '6' or '7' or '8' or '9' or '0') in value:
        raise ValidationError("Symbols and Numerals are not allowed.")


# def last_name(value):
#     if value:
#         return True
#     else:
#         return False


# def last_name_pa(value):
#     if value and not last_name():
#         raise ValidationError("You have not entered the last name")

class MyClearableFileInput(ClearableFileInput):
    initial_text = 'currently'
    input_text = 'change'
    clear_checkbox_label = 'clear'
    template_with_initial = (
        '%(initial_text)s: <a href="%(initial_url)s">%(initial)s</a> '
        '%(clear_template)s<br />%(input_text)s: %(input)s'
    )

    template_with_clear = '%(clear)s <label for="%(clear_checkbox_id)s">%(clear_checkbox_label)s</label>'

class DateInput(forms.DateInput):
    input_type = 'date'
class SignUpForm(UserCreationForm):

    first_name = forms.CharField(error_messages={'required':''}, validators = [validate_city_fname_lname], max_length=100,widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'First Name', 'id': 'username'}))

    first_name_public_access = forms.ChoiceField(error_messages={'required':''}, widget=forms.RadioSelect(
        attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))

    last_name = forms.CharField(error_messages={'required':''}, validators = [validate_city_fname_lname], max_length=100, required=False, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Last Name', 'id': 'username'}))

    # last_name_public_access = forms.ChoiceField(initial='False', required=False, widget=forms.RadioSelect(
        # attrs={'class': 'Radio', }), choices=(('True','Public'),('False','NonPublic'),))
    uname_regex = RegexValidator(regex = r'^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$',
              message="Please enter the correct username")
    # uname_regex1 = RegexValidator(regex = r'^\d{5,8}$', message="Username should not contain more than 5 consecutive numerals" )
    username = forms.CharField(error_messages={'required': ''}, validators = [uname_regex], max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'User Name', 'id': 'username'}))

    phone_regex = RegexValidator(regex=r'^\d{8,10}$', message="Phone number must be entered in the format: '9999999999'. Up to 10 digits allowed.")
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
    
    city = forms.CharField(error_messages={'required':''}, validators = [validate_city_fname_lname], max_length=100, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'City', 'id': 'city'}))
    
    # dob = forms.DateField(widget=forms.TextInput(
    #     attrs={'class': 'datepicker', 'placeholder': 'DOB', 'id'Register: 'username'}))
    dob = forms.DateField(error_messages={'required':''}, validators = [validate_dob, validate_future_dob], widget=DateInput(attrs={'class': 'datepicker', 'style': 'border-width: 1; border-color: #ced4da;', 'placeholder': 'YYYY-MM-DD', 'id': 'username'}))
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
    photo = forms.ImageField(label='Select Profile Image', widget=MyClearableFileInput, required=False)
    class Meta:
        model = UserRegisterDetails
        fields = ('username','first_name','last_name','phone_number', 'email', 'email2', 'city', 'dob', 'areaOfInterest', 'password1', 'password2','gender', 'photo' )

        