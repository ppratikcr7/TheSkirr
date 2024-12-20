import random
from django.conf import settings
# from django.contrib import messages
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.db.models import Q
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..forms import TweetForm
from ..models import Tweet, TweetLike, TweetUnLike, UserRegisterDetails
from ..serializers import (
    TweetSerializer, 
    TweetActionSerializer,
    TweetEditSerializer,
    TweetCreateSerializer
)
import datetime

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view(['POST']) # http method the client == POST
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated]) 
# REST API course
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)

    return Response({}, status=400)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated]) 
# REST API course
def tweet_edit_view(request, *args, **kwargs):
    print("edit request: ", request)
    print("edit data: ", request.data)
    serializer = TweetEditSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        print("tweet id in api: ", tweet_id)
        updated_content = data.get("content")
        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        qs = qs.filter(user=request.user)
        if not qs.exists():
            return Response({"message": "You cannot edit this tweet"}, status=401)
        obj = qs.first()
        # to update tweet text with updated text
        obj.content = updated_content
        obj.save()
    return Response(serializer.data, status=200)



@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required.
    Action options are: like, unlike, retweet, delete and reply
    '''
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        me = request.user
        user_id = UserRegisterDetails.objects.filter(username=me).values_list('id', flat=True).first()
        
        if action == "like":
            like_obj = TweetLike.objects.filter(tweet_id=tweet_id).filter(user_id=user_id).exists()
            if(like_obj):
                obj.likes.remove(request.user)
            else:
                obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)

        elif action == "unlike":
            unlike_obj = TweetUnLike.objects.filter(tweet_id=tweet_id).filter(user1_id=user_id).exists()
            if(unlike_obj):
                obj.unlikes.remove(request.user)
            else:
                obj.unlikes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)

        elif action == "retweet":
            obj.reclacks.add(request.user)
            new_tweet = Tweet.objects.create(
                    user=request.user, 
                    parent=obj,
                    content=content,)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)

        elif action == "delete":
            qs = Tweet.objects.filter(id=tweet_id)
            if not qs.exists():
                return Response({}, status=404)
            qs = qs.filter(user=request.user)
            if not qs.exists():
                return Response({"message": "You cannot delete this tweet"}, status=401)
            obj = qs.first()
            #  to delete complete tweet
            # obj.delete()
            # to update tweet text with deleted text
            obj.content = "This Clack was deleted on " + str(datetime.datetime.now().strftime("%d-%m-%Y %H:%M"))
            obj.save()
            return Response(serializer.data, status=200)
        
        elif action == "reply":
            # change below code to perform reply action
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
    return Response({}, status=200)


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    # view tweets per page
    paginator.page_size = 1000
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_qs, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs, request)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username') # ?username=Pratik
    if username != None:
        qs = qs.by_username(username)
    return get_paginated_queryset_response(qs, request)

@api_view(['GET'])
def tweet_reclack_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username') # ?username=Pratik
    if username != None:
        qs = qs.by_username(username).filter(parent_id__isnull=False)
    return get_paginated_queryset_response(qs, request)

@api_view(['GET'])
def tweet_liked_clacks_view(request, *args, **kwargs):
    qs = TweetLike.objects.all()
    username = request.GET.get('username') # ?username=Pratik
    user_id  = UserRegisterDetails.objects.filter(username=username).values_list('id', flat=True).first()
    if username != None:
        liked_clack_ids = qs.filter(user_id = user_id).values("tweet_id")
        liked_clacks = Tweet.objects.filter(id__in = liked_clack_ids)
    return get_paginated_queryset_response(liked_clacks, request)

@api_view(['GET'])
def tweet_searched_clacks_view(request, *args, **kwargs):
    value = request.GET.get('value')
    if value is not None:
        lookups= Q(content__icontains=value)
        searched_clacks = Tweet.objects.filter(lookups).distinct()
    return get_paginated_queryset_response(searched_clacks, request)

@api_view(['GET'])
def tweet_searched_trending_clacks_view(request, *args, **kwargs):
    value = request.GET.get('value')
    if value is not None:
        lookups= Q(content__icontains=value)
        searched_trend_clacks = Tweet.objects.filter(lookups).distinct()
    return get_paginated_queryset_response(searched_trend_clacks, request)

def tweet_create_view_pure_django(request, *args, **kwargs):
    '''
    REST API Create View -> DRF
    '''
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related logic
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 == created items
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form": form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Andriod
    return json data
    """
    qs = Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Andriod
    return json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data, status=status) # json.dumps content_type='application/json'