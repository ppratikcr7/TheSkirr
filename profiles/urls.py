from django.urls import path


from .views import profile_view, profile_update_view

urlpatterns = [
    path('edit', profile_update_view),
    # path('<str:username>', profile_view),
]
