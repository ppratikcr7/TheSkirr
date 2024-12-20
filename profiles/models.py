from accounts.models import UserRegisterDetails
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save

# User = settings.AUTH_USER_MODEL

class FollowerRelation(models.Model):
    user = models.ForeignKey(UserRegisterDetails, on_delete=models.CASCADE,null=True, blank=True)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(UserRegisterDetails, on_delete=models.CASCADE,null=True, blank=True)
    first_name = models.CharField(UserRegisterDetails, max_length=220, null=True, blank=True)
    location = models.CharField(UserRegisterDetails, max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(UserRegisterDetails, related_name='following', blank=True)
    """
    project_obj = Profile.objects.first()
    project_obj.followers.all() -> All users following this profile
    user.following.all() -> All user profiles I follow
    """
def user_did_save(sender, instance, created, *args, **kwargs):
    # print("instance:",instance)
    if created:
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, sender=UserRegisterDetails)

# after the user logs in -> verify profile