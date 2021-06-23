from tweets.models import Tweet, TweetLike
from accounts.models import UserRegisterDetails
import random
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Profile
from ..serializers import PublicProfileSerializer

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile_detail_view(request, username, *args, **kwargs):
#     current_user = request.user
#     to_follow_user = ??
#     return Response({}, status=200)

@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        me = request.user
        action = data.get("action")
        if profile_obj.user != me:
            if action == "follow":
                profile_obj.followers.add(me)
            elif action == "unfollow":
                profile_obj.followers.remove(me)
            else:
                pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_username(request, *args, **kwargs):
    # get the profile for the passed username
    me = request.user
    qs = Profile.objects.filter(user__username=me)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    serializer = PublicProfileSerializer(profile_obj)
    return Response( serializer.data, status=200)

@api_view(['GET'])
def who_to_follow_user1(request, *args, **kwargs):
    # grab the max id in the database
    max_id = Profile.objects.order_by('-id')[0].id
    # print("max:", max_id)
    # grab a random possible id. we don't know if this id does exist in the database, though
    random_id = random.randint(1, max_id + 1)
    # print("user:", random_id)
    random_user = Profile.objects.filter(id__gte=random_id)
    profile_obj = random_user.first()
    serializer = PublicProfileSerializer(profile_obj)
    return Response( serializer.data, status=200)

@api_view(['GET'])
def who_to_follow_user2(request, *args, **kwargs):
    # grab the max id in the database
    max_id = Profile.objects.order_by('-id')[0].id
    # print("max:", max_id)
    # grab a random possible id. we don't know if this id does exist in the database, though
    random_id = random.randint(1, max_id + 1)
    # print("user:", random_id)
    random_user = Profile.objects.filter(id__gte=random_id)
    profile_obj = random_user.first()
    serializer = PublicProfileSerializer(profile_obj)
    return Response( serializer.data, status=200)

@api_view(['GET'])
def who_to_follow_user3(request, *args, **kwargs):
    # grab the max id in the database
    max_id = Profile.objects.order_by('-id')[0].id
    # print("max:", max_id)
    # grab a random possible id. we don't know if this id does exist in the database, though
    random_id = random.randint(1, max_id + 1)
    # print("user:", random_id)
    random_user = Profile.objects.filter(id__gte=random_id)
    profile_obj = random_user.first()
    serializer = PublicProfileSerializer(profile_obj)
    return Response( serializer.data, status=200)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_total_likes(request, *args, **kwargs):
    # get the profile for the passed username
    me = request.user
    qs = Profile.objects.filter(user__username=me)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    total_tweets_by_current_user = Tweet.objects.filter(user__username=me)
    qs_list = total_tweets_by_current_user.values_list('pk', flat=True)
    total_likes = TweetLike.objects.filter(tweet_id__in=qs_list).count()
    return Response( total_likes, status=200)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_total_clacks(request, *args, **kwargs):
    # get the profile for the passed username
    me = request.user
    qs = Profile.objects.filter(user__username=me)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    total_clacks = Tweet.objects.filter(user__username=me).count()
    return Response( total_clacks, status=200)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def profile_details(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    # data = request.data or {}
    serializer = PublicProfileSerializer(profile_obj)
    return Response( serializer.data, status=200)

@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)
    if not other_user_qs.exists():
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile
    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    else:
        pass
    data = PublicProfileSerializer(instance=profile, context={"request": request})
    return Response(data.data, status=200)
