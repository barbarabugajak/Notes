from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, UserCreateSerializer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Rest csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here
@method_decorator(csrf_exempt, name='dispatch')
class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @csrf_exempt    
    def perform_create(self, serializer):
        print('Creating note...')
        serializer.save(owner=self.request.user)
        # Add owner as collaborator
        serializer.instance.collaborators.add(self.request.user)
        # Get all collaborators
        collaborators = self.request.data.get('collaborators')
        for collaborator in collaborators:
            try:
                user = User.objects.get(pk=collaborator)
                serializer.instance.collaborators.add(user)
            except Exception as e:
                print({'error': str(e)})

@api_view(['POST'])
@csrf_exempt
def note_list_create(request):
    if request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            # Add owner as collaborator
            serializer.instance.collaborators.add(request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# login required 
@method_decorator(csrf_exempt, name='dispatch')
class UserNotes(generics.ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        # Access the request object using self.request
        user_id = self.kwargs.get('id')
        try:
            # Get the user object
            user = User.objects.get(id=user_id)
            # For security reasons, only return notes if the user is authenticated
            if user.is_authenticated:
                queryset = Note.objects.filter(collaborators=user)
                if self.request.user.id == user.id:
                    return queryset
            return queryset.filter(public=True)
            
        except Exception as e:
            print({'error': str(e)})
            return None



# Instance view
@method_decorator(csrf_exempt, name='dispatch')
class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @csrf_exempt
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.text = request.data.get('text')
            instance.save()
            return JsonResponse({'status': 'success', 'message': 'Note updated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            user = request.user
            if user in instance.collaborators.all() or instance.public == True:
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'error': 'You do not have permission to access this note.'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

# Get current user
@api_view(['GET'])
def current_user(request):
    return JsonResponse(UserSerializer(request.user).data)

# User list NOT create
@method_decorator(csrf_exempt, name='dispatch')
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UserInstance(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# User create NOT list
@method_decorator(csrf_exempt, name='dispatch')
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    @csrf_exempt
    def perform_create(self, serializer):
        user = serializer.save()
        password = self.request.data.get('password')
        print(password)
        user.set_password(password)
        user.first_name = self.request.data.get('firstName')
        user.last_name = self.request.data.get('lastName')
        user.save()

# Login view
@api_view(['POST'])
@csrf_exempt
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
