from accounts.models import TrendsExclamation, UserRegisterDetails
from django.http import Http404
from django.shortcuts import render, redirect

from .forms import ProfileForm
from .models import Profile

# from django.contrib.auth.models import User
from tweets.models import Tweet, TweetLike
from collections import defaultdict
import random
from django.contrib import messages


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated: # is_authenticated()
        return redirect("/login?next=/profile/update")
    user = request.user
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "username": user.username,
        "phone_number":user.phone_number,
        "email": user.email,
        "email2":user.email2,
        "city":user.city,
        "dob":user.dob,
        "gender":user.gender,
        "aoi":user.areaOfInterest
    }
    my_profile = user.profile
    form = ProfileForm(request.POST or None, instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        username = form.cleaned_data.get('username')
        phone_number = form.cleaned_data.get('phone_number')
        email = form.cleaned_data.get('email')
        email2 = form.cleaned_data.get('email2')
        city = form.cleaned_data.get('city')
        dob = form.cleaned_data.get('dob')
        gender = form.cleaned_data.get('gender')
        areaOfInterest = form.cleaned_data.get('areaOfInterest')

        user.first_name = first_name
        user.last_name = last_name
        user.username = username
        user.phonephone_number =phone_number   
        user.email = email
        user.email2 = email2
        user.city = city
        user.dob = dob
        user.gender = gender
        user.areaOfInterest = areaOfInterest
        
        user.save()
        profile_obj.save()
        # print(user.save())
        if user.save()==None:
            messages.success(request, 'You Profile has been successfully updated :)')
        else:
            messages.warning(request, 'Update Failed:(')
           

        
    context = {
        "form": form,
        "btn_label": "Update",
        "title": "Update Profile"
    }
    return render(request, "profiles/form.html", context)

def my_wall_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = UserRegisterDetails.objects.filter(username=username)
    print(qs)
    qs2 = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    profile_obj2 = qs2.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj2.followers.all()
        is_following = profile_obj2 in user.following.all()

        fn_pa = UserRegisterDetails.objects.filter(first_name_public_access = "Yes", username=username)
        ln_pa = UserRegisterDetails.objects.filter(last_name_public_access = "Yes", username=username)
        gen_pa = UserRegisterDetails.objects.filter(gender_public_access = "Yes", username=username)
        gen_pa = UserRegisterDetails.objects.filter(gender_public_access = "Yes", username=username)
        dob_pa = UserRegisterDetails.objects.filter(dob_public_access = "Yes", username=username)
        pn_pa =  UserRegisterDetails.objects.filter(phone_number_public_access = "Yes", username=username)
        em_pa = UserRegisterDetails.objects.filter(email_public_access = "Yes", username=username)
        em2_pa = UserRegisterDetails.objects.filter(email2_public_access = "Yes", username=username)
        fn = profile_obj.first_name
        ln = profile_obj.last_name
        gen = profile_obj.gender
        dob = profile_obj.dob
        pn = profile_obj.phone_number
        em = profile_obj.email
        em2 = profile_obj.email2

    context = {
        "username": username,        
        "profile": profile_obj,
        "fans": profile_obj2.followers.count(),
        "companions": user.following.count(),
        "is_following": is_following,
        "gender":profile_obj.gender,
        "fn_pa": fn_pa, 
        "ln_pa": ln_pa, "gen_pa": gen_pa, "dob_pa" : dob_pa, 
        "pn_pa" : pn_pa, "em_pa" : em_pa,"em2_pa" : em2_pa,
        "fn_show" : fn, "ln_show" : ln, "gen_show" : gen, "dob_show" : dob,
        "pn_show" : pn, "em_show" : em, "em2_show" : em2

    }
    print("gender",profile_obj.gender);
    return render(request, "profiles/detail.html", context)

def user_wall_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = UserRegisterDetails.objects.filter(username=username)
    qs2 = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    profile_obj2 = qs2.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj2.followers.all()
        is_following = profile_obj2 in user.following.all()

        fn_pa = UserRegisterDetails.objects.filter(first_name_public_access = "Yes", username=username)
        ln_pa = UserRegisterDetails.objects.filter(last_name_public_access = "Yes", username=username)
        gen_pa = UserRegisterDetails.objects.filter(gender_public_access = "Yes", username=username)
        gen_pa = UserRegisterDetails.objects.filter(gender_public_access = "Yes", username=username)
        dob_pa = UserRegisterDetails.objects.filter(dob_public_access = "Yes", username=username)
        pn_pa =  UserRegisterDetails.objects.filter(phone_number_public_access = "Yes", username=username)
        em_pa = UserRegisterDetails.objects.filter(email_public_access = "Yes", username=username)
        em2_pa = UserRegisterDetails.objects.filter(email2_public_access = "Yes", username=username)
        fn = profile_obj.first_name
        ln = profile_obj.last_name
        gen = profile_obj.gender
        dob = profile_obj.dob
        pn = profile_obj.phone_number
        em = profile_obj.email
        em2 = profile_obj.email2

    context = {
        "username": username,        
        "profile": profile_obj,
        "fans": profile_obj2.followers.count(),
        "companions": user.following.count(),
        "is_following": is_following,
        "gender":profile_obj.gender,
        "fn_pa": fn_pa, 
        "ln_pa": ln_pa, "gen_pa": gen_pa, "dob_pa" : dob_pa, 
        "pn_pa" : pn_pa, "em_pa" : em_pa,"em2_pa" : em2_pa,
        "fn_show" : fn, "ln_show" : ln, "gen_show" : gen, "dob_show" : dob,
        "pn_show" : pn, "em_show" : em, "em2_show" : em2

    }
    return render(request, "profiles/detail.html", context)

def trends_view(request, *args, **kwargs):
    trends_list = TrendsExclamation.objects.all()
    username = request.user.username;
    
    context = {
        "username": username,
        "trends_list": trends_list
    }
    return render(request, "profiles/trends.html", context)

def show_more_view(request, *args, **kwargs):
    
    rand = UserRegisterDetails.objects.order_by('?')[:3]
    rec = UserRegisterDetails.objects.order_by('-date_joined')[:3]
    all = UserRegisterDetails.objects.all()
    
    un = request.user.username

    uname = UserRegisterDetails.objects.values_list('city', flat=True).filter(username = un)
    city = uname[0]
    
    loc_uname_obj = UserRegisterDetails.objects.values_list('username', flat=True).filter(city = city)
    more_user = []
    for unamee in loc_uname_obj:
        more_user.append(unamee)
    print("more users: ", more_user)
    num_of_users = len(more_user)
    if  num_of_users >= 3:
        more_users = random.sample(more_user, 3)
    elif num_of_users < 3 & num_of_users >=1:
        more_users = random.sample(more_user, 1)
    else:
        more_users = []

    
    new_dict = defaultdict(list)
    for user in all:
        me = user
        total_tweets_by_current_user = Tweet.objects.filter(user__username=me)
        qs_lis = total_tweets_by_current_user.values('pk')
        total_likes = TweetLike.objects.filter(tweet_id__in=qs_lis).count()
        new_dict[me].append(total_likes)
    sort_dict = sorted(new_dict.items(), key=lambda x: x[1], reverse=True)
    # for i in sort_orders:
	#     print(i[0], i[1])
    for rand_user in rand:
        more_users.append(rand_user.username)
    for recent in rec:
        more_users.append(recent.username)
    count = 0
    for i in sort_dict:
        if count==3:
            break
        else:
            count+=1
            more_users.append(i[0].username)
    # print(arr)
    temp_list = []

    for i in more_users:
        if i not in temp_list:
            temp_list.append(i)

    final = random.sample(temp_list, len(temp_list))
    context = {
        "username": un,
        "usernames":final,
     }
    return render(request, "profiles/show_more.html", context)