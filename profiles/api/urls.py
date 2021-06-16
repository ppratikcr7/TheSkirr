from django.urls import path

from .views import (
    get_total_clacks,
    get_total_likes,
    profile_detail_api_view,
    profile_details,
    get_username
)
'''
CLIENT
Base ENDPOINT /api/profiles/
'''
urlpatterns = [
    # to fetch profile details to show my wall details.html page
    path('<str:username>/', profile_details),
    # to fetch profile details on my dashboard bio section
    path('user/<str:username>/', profile_details),
    # to fetch current user data
    path('get_user/username/', get_username),
    # to trigger follow view
    path('<str:username>/follow', profile_detail_api_view),
    # to get total likes of current user:
    path('current_user/likes/', get_total_likes),
    # to get total clacks of current user:
    path('current_user/clacks/', get_total_clacks),
]
