from django.urls import path
from .views import my_wall_view, dashboard_view, profile_update_view, trends_view , show_more_view, search_users, search_clacks, search_trends, report_adverse_effect_form_view

urlpatterns = [
    # api call for edit profile view
    path('edit', profile_update_view),
    # api call for my wall view
    path('my_wall/<str:username>', my_wall_view),
    # api call for my dashboard view
    path('dashboard/<str:username>', dashboard_view),
    # api call for a particular users wall view
    # path('user_wall/<str:username>', user_dashboard_view),
    # api call for trending exclamation page
    path('trending_exclamation', trends_view),
    # view function call for show more users
    path('more_accounts', show_more_view),
    path('search_users/<str:value>', search_users),
    path('search_clacks/<str:value>', search_clacks),
    path('search_trends/<str:value>', search_trends),  
    path('report_adverse_effect_form', report_adverse_effect_form_view), 
]
