from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializers, NoteSerializer
from .models import Note

class CreateUserViewer(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]

# CHANGED: ListAPIView -> ListCreateAPIView to allow POST as well as GET. [web:54][web:59][web:70]
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # unchanged logic, still filters by current user. [web:54]
        return Note.objects.filter(author=self.request.user)

    # CHANGED: keep perform_create; ListCreateAPIView will call this on POST. [web:54][web:59]
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# unchanged class name but ensure it's wired to a detail URL with <pk>. [web:60]
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
