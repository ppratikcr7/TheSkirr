from rest_framework import serializers

from .models import Profile

class PublicProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    gender = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)
    email2 = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)
    date_joined = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "gender",
            "email",
            "email2",
            "phone_number",
            "date_joined",
            "id",
            "bio",
            "location",
            "follower_count",
            "following_count",
            "is_following",
            "username",
        ]
    
    def get_is_following(self, obj):
        # request???
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following
    
    def get_first_name(self, obj):
        return obj.user.first_name
    
    def get_gender(self, obj):
        return obj.user.gender

    def get_last_name(self, obj):
        return obj.user.last_name
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_email(self, obj):
        return obj.user.email
    
    def get_email2(self, obj):
        return obj.user.email2
    
    def get_phone_number(self, obj):
        return obj.user.phone_number

    def get_date_joined(self, obj):
        return obj.user.date_joined

class PublicNonPublicProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    dob = serializers.SerializerMethodField(read_only=True)
    gender = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)
    email2 = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)
    areaOfInterest = serializers.SerializerMethodField(read_only=True)
    date_joined = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True) 
    first_name_public_access = serializers.SerializerMethodField(read_only=True)
    gender_public_access = serializers.SerializerMethodField(read_only=True)
    dob_public_access = serializers.SerializerMethodField(read_only=True)
    phone_number_public_access = serializers.SerializerMethodField(read_only=True)
    email_public_access = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "dob",
            "gender",
            "email",
            "email2",
            "phone_number",
            "areaOfInterest",
            "date_joined",
            "id",
            "bio",
            "location",
            "follower_count",
            "following_count",
            "is_following",
            "username",
            "photo_url",
            "first_name_public_access", 
            "gender_public_access",
            "dob_public_access", 
            "phone_number_public_access",
            "email_public_access"
        ]
    
    def get_is_following(self, obj):
        # request???
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following
    
    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_dob(self, obj):
        return obj.user.dob

    def get_gender(self, obj):
        return obj.user.gender
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_email(self, obj):
        return obj.user.email
    
    def get_email2(self, obj):
        return obj.user.email2
    
    def get_phone_number(self, obj):
        return obj.user.phone_number

    def get_areaOfInterest(self, obj):
        return obj.user.areaOfInterest

    def get_date_joined(self, obj):
        return obj.user.date_joined

    def get_photo_url(self, obj):
        return obj.user.photo.url

    def get_first_name_public_access(self, obj):
        return obj.user.first_name_public_access
    
    def get_gender_public_access(self, obj):
        return obj.user.gender_public_access
    
    def get_dob_public_access(self, obj):
        return obj.user.dob_public_access
    
    def get_phone_number_public_access(self, obj):
        return obj.user.phone_number_public_access
    
    def get_email_public_access(self, obj):
        return obj.user.email_public_access