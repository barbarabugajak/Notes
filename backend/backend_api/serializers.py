from .models import Note
from rest_framework import serializers
from django.contrib.auth.models import User

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['name', 'owner', 'text']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


