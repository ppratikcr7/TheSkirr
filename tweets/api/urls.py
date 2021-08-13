from django.urls import path

from .views import (
    tweet_action_view,
    tweet_detail_view,
    tweet_feed_view,
    tweet_list_view,
    tweet_create_view,
    tweet_edit_view,
    tweet_reclack_view,
    tweet_liked_clacks_view,
    tweet_searched_clacks_view,
    tweet_searched_trending_clacks_view,
)
'''
CLIENT
Base ENDPOINT /api/tweets/
'''
urlpatterns = [
    path('', tweet_list_view),
    path('reclacks/', tweet_reclack_view),
    path('liked_clacks/', tweet_liked_clacks_view),
    path('searched_clacks/', tweet_searched_clacks_view),
    path('searched_trending_clacks/', tweet_searched_trending_clacks_view),
    path('feed/', tweet_feed_view),
    path('action/', tweet_action_view),
    path('create/', tweet_create_view),
    path('edit/', tweet_edit_view),
    path('<int:tweet_id>/', tweet_detail_view),
]
