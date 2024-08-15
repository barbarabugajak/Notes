from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Rest csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# login required 
@method_decorator(csrf_exempt, name='dispatch')
class UserNotes(generics.ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        # Access the request object using self.request
        user_id = self.kwargs.get('id')
        try:
            user = User.objects.get(id=user_id)
            return Note.objects.filter(collaborators=self.request.user)
        except Exception as e:
            print({'error': str(e)})
            return None

# Get current user
@api_view(['GET'])
def current_user(request):
    return JsonResponse(UserSerializer(request.user).data)

# Instance view
@method_decorator(csrf_exempt, name='dispatch')
class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Login view
@api_view(['POST'])
def login_view(request):
    try:
        if request.user.is_authenticated:
            return JsonResponse({'detail': 'You are already authenticated'}, status=status.HTTP_400_BAD_REQUEST)
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'detail': 'Login successful'}, status=status.HTTP_200_OK)
        return JsonResponse({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(str(e))
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def logout_view(request):
    try:
        logout(request)
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
