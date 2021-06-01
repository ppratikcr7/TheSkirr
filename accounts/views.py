from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .registerForm import SignUpForm
from .loginForm import UserLoginForm
from .models import UserRegisterDetails

# Create your views here.

# Function based views to Class Based Views

def login_view(request, *args, **kwargs):
    print("request:",request.POST)
    form = UserLoginForm(request, data=request.POST or None)
    print("user1:",form)
    if form.is_valid():
        user_ = form.get_user()
        print("user2:",user_)
        login(request, user_)
        return redirect("/")
    context = {
        "form": form,
        "btn_label": "Login",
        "title": "Login"
    }
    return render(request, "accounts/auth.html", context)

def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form": None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click to Confirm",
        "title": "Logout"
    }
    return render(request, "accounts/logout.html", context)


def register_view(request, *args, **kwargs):
    print("reqest:",request.GET.get('user_type'))
    form = SignUpForm(request.POST or None)
    if form.is_valid():
        username = request.POST['username']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        phone_number = request.POST['phone_number']
        email_id = request.POST['email_id']
        dob = request.POST['dob']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        gender = request.POST['gender']
        ins = UserRegisterDetails(username=username,first_name=first_name,last_name=last_name,phone_number=phone_number, email_id=email_id,dob=dob,password1=password1, password2=password2,gender=gender)
        ins.save()
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        # send a confirmation email to verify their account
        login(request, user)
        return redirect("/")
    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register",
        "type":request.GET.get('user_type')
    }
    return render(request, "accounts/register.html", context)