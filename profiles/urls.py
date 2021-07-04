from django.urls import path
from .views import my_wall_view, profile_update_view, trends_view , user_wall_view, show_more_view, search_users

urlpatterns = [
    # api call for edit profile view
    path('edit', profile_update_view),
    # api call for my wall view
    path('my_wall/<str:username>', my_wall_view),
    # api call for a particular users wall view
    path('user_wall/<str:username>', user_wall_view),
    # api call for trending exclamation page
    path('trending_exclamation', trends_view),
    # view function call for show more users
    path('more_accounts', show_more_view),
    path('search_users/<str:value>', search_users),    
]
