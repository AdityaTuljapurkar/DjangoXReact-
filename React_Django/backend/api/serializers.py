from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

# This class helps convert User objects to and from JSON, so they can be sent over the internet easily.
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        # Tells the serializer to use Django's built-in User model.
        model = User
        # These are the fields we care about: id, username, and password.
        fields = ('id','username','password')
        # This makes sure the password is only used for writing (like when creating a user), not for reading.
        extra_kwargs = {'password': {'write_only': True}}

    # This function is called when we want to create a new user from the data we get (like from a signup form).
    def create(self, validated_data):
        # This creates a new user using the data provided, and handles password hashing automatically.
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
# This class helps convert Note objects to and from JSON, so they can be sent over the internet easily.
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        # Tells the serializer to use the Note model.
        model = Note
        # These are the fields we care about: title, content, created_at, and author.
        fields = ['id', 'title', 'content', 'created_at']
        # This makes sure the author field is read-only, so it can't be modified through the API.
        extra_kwargs = {'author': {'read_only': True}}
  