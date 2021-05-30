from django.core.mail.message import EmailMessage
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .registerForm import SignUpForm
from .loginForm import UserLoginForm
from .models import UserRegisterDetails
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.

# Function based views to Class Based Views

def login_view(request, *args, **kwargs):
    form = UserLoginForm(request, data=request.POST or None)
    
    if form.is_valid():
        user_ = form.get_user()
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
    return render(request, "accounts/auth.html", context)


def register_view(request, *args, **kwargs):
    print("reqest:",request.GET.get('user_type'))
    form = SignUpForm(request.POST or None)
    if form.is_valid():
        username = request.POST['username']
        user_FirstName = request.POST['user_FirstName']
        user_LasttName = request.POST['user_LasttName']
        phone_number = request.POST['phone_number']
        email_id = request.POST['email_id']
        dob = request.POST['dob']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        gender = request.POST['gender']
        ins = UserRegisterDetails(username=username,user_FirstName=user_FirstName,user_LasttName=user_LasttName,phone_number=phone_number, email_id=email_id,dob=dob,password1=password1, password2=password2,gender=gender)
        ins.save()
        user = form.save(commit=False)
        user.is_active = False
        user.save()
        user.set_password(form.cleaned_data.get("password1"))
        current_site = get_current_site(request)
        mail_subject = 'Activate your skirr account.'
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
        })
        to_email = form.cleaned_data.get('email_id')

        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
        email.send()
        
        # send a confirmation email to verify their account
        messages.success(request, 'Please confirm your email address to complete the registration and login successfully.')
        login(request, user)
        return redirect("/register")
    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register",
        "type":request.GET.get('user_type')
    }
    return render(request, "accounts/register.html", context)

def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Thank you for your email confirmation. Now you can login your account.')
        login(request, user)
        return redirect('/login')
    else:
        messages.warning(request, 'Email Verification link is not validated yet, please check your mail!')
        login(request, user)
        return redirect('/login')