#Backend_api

from django.contrib import admin
from django.urls import path, include
from .views import NoteListCreate, NoteDetail, UserNotes, login_view, current_user, logout_view, UserList, UserCreate, UserInstance

urlpatterns = [
   path('api/notes', NoteListCreate.as_view(), name='note-list-create'),
   path('api/notes/<int:pk>', NoteDetail.as_view(), name='note-detail'),
   path('api/login', login_view, name='login'),
   path('api/logout', logout_view, name='logout'),
   path('api/notes/user/<str:id>', UserNotes.as_view(), name='your-notes'),
   path('api/user', current_user, name='current-user'),
   path('api/user-list', UserList.as_view(), name='all-users'),
   path('api/user/<int:pk>', UserInstance.as_view(), name='user-detail'),
   path('api/register', UserCreate.as_view(), name='register'),
]
