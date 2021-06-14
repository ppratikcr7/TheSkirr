from django.urls import path
from .views import my_wall_view, profile_update_view , user_wall_view

urlpatterns = [
    # api call for edit profile view
    path('edit', profile_update_view),
    # api call for my wall view
    path('my_wall/<str:username>', my_wall_view),
    # api call for a particular users wall view
    path('user_wall/<str:username>', user_wall_view),
]
