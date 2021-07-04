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
# from django.contrib.auth.models import User
from django.contrib import messages
from django.conf import settings 
from django.core.mail import send_mail 

from django.contrib.auth.models import auth
# Create your views here.

# Function based views to Class Based Views

def login_view(request, *args, **kwargs):
    form = UserLoginForm(request, data=request.POST or None)
    # print(form.name)
    if form.is_valid():
        username = request.POST['username']
        # print(username)
        password = request.POST['password']
        # print(password)
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect("/")
        else:
            messages.warning(request, 'Invalid Username or Password')
            messages.info(request, 'OR')
            messages.warning(request, 'Email Verification link is not validated yet, please check your mail!')
    
    # # for case insensitive check:
    # request.user.username = request.user.username.lower()
    # if form.is_valid():
    #     if request.user.is_active==True:
    #         user_ = form.get_user()
    #         user_.username = user_.username.lower()
    #         # print("final username: ", user_.username)
    #         login(request, user_)
    #         return redirect("/")
    #     else:
    #         messages.warning(request, 'Email Verification link is not validated yet, please check your mail!')

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
    form = SignUpForm(request.POST or None or request.FILES)
    if form.is_valid():
        username = request.POST['username']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        phone_number = request.POST['phone_number']
        email = request.POST['email']
        email2 = request.POST['email2']
        city = request.POST['city']
        dob = request.POST['dob']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        gender = request.POST['gender']
        areaOfInterest = request.POST['areaOfInterest']
        first_name_public_access = request.POST['first_name_public_access']
        # last_name_public_access = request.POST['last_name_public_access']
        gender_public_access = request.POST['gender_public_access']
        dob_public_access = request.POST['dob_public_access']
        phone_number_public_access = request.POST['phone_number_public_access']
        email_public_access = request.POST['email_public_access']
        # email2_public_access = request.POST.get('email2_public_access', False)
        if 'photo' in request.FILES:
            photo = request.FILES['photo']
            user = UserRegisterDetails.objects.create_user(username=username.lower(),first_name=first_name,last_name=last_name, phone_number=phone_number, email=email, email2=email2, 
        city=city, dob=dob, areaOfInterest=areaOfInterest, password=password1, password2=password2,gender=gender, first_name_public_access=first_name_public_access,
        gender_public_access=gender_public_access, dob_public_access=dob_public_access,
        phone_number_public_access=phone_number_public_access, email_public_access=email_public_access, photo=photo)
        else:
            # print("photo not exists")
            photo = request.FILES.get('media/images/default.jpg')
            user = UserRegisterDetails.objects.create_user(username=username.lower(),first_name=first_name,last_name=last_name, phone_number=phone_number, email=email, email2=email2, 
        city=city, dob=dob, areaOfInterest=areaOfInterest, password=password1, password2=password2,gender=gender, first_name_public_access=first_name_public_access,
        gender_public_access=gender_public_access, dob_public_access=dob_public_access,
        phone_number_public_access=phone_number_public_access, email_public_access=email_public_access)
        # if not last_name and (last_name_public_access == "Yes" or last_name_public_access == "No"):
        #     print("yeah")
        # else:
        #     print("abcd")
        
        user.save()
        # user = form.save(commit=False)
        user.is_active = False
        # user.save()
        # user.set_password(form.cleaned_data.get(password1))
        user.set_password(request.POST.get('password1'))
        current_site = get_current_site(request)
        mail_subject = 'Activate your skirr account.'
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':account_activation_token.make_token(user),
        })
        to_email = request.POST.get('email')

        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
        # send a confirmation email to verify their account
        # messages.success(request, 'Please confirm your email address to complete the registration and login successfully.')
        messages.success(request, 'Congratulations! You have successfully created an account. Just one more thing...Confirmation email has been sent to your registered email-id. Please check your mail inbox/spam and click on the link within the body of the email to confirm your account.')
        email.send()
        # login(request, user)
        return render(request, "accounts/registration_complete_message.html")
    
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
        user = UserRegisterDetails.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, UserRegisterDetails.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Thank you for your email confirmation. Now you can login your account.')
        user.username = user.username.lower()
        request.user.username = request.user.username.lower()
        login(request, user)
        return redirect('/login')
    else:
        login(request, user)
        user.username = user.username.lower()
        request.user.username = request.user.username.lower()
        messages.warning(request, 'Email Verification link is not validated yet, please check your mail!')
        return redirect('/login')

def forgot_uname(request):
    if request.method == 'POST':
        email = request.POST['email']
        if UserRegisterDetails.objects.filter(email=email).exists():
            p = UserRegisterDetails.objects.filter(email =email)
            subject = 'Request for username'
            message = f'Hi Your Username is: {p[0].username}'
            email_from = settings.EMAIL_HOST_USER 
            recipient_list = [email, ] 
            send_mail( subject, message, email_from, recipient_list ) 
            return redirect('/login')
        else:
            messages.warning(request, 'Email not registered')
            return redirect('forgot_uname')
    else:
        return render(request, 'accounts/forgot_uname.html')