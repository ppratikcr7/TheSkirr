from django.urls import path

from .views import (
    profile_detail_api_view,
    profile_details,
    profile_username
)
'''
CLIENT
Base ENDPOINT /api/profiles/
'''
urlpatterns = [
    # path('<str:username>/', profile_detail_api_view),
    path('user/<str:username>/', profile_details),
    path('get_username/', profile_username),
    path('<str:username>/follow', profile_detail_api_view),
]
