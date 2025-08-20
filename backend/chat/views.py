from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from .models import *

class MsgsDetailAPIView(generics.ListAPIView):
    serializer_class = MsgsDetailSerializer

    def get_queryset(self):
        url = self.kwargs['url']
        return Msgs.objects.filter(url=url)

class MsgsCreateAPIView(generics.CreateAPIView):
    queryset=Msgs.objects.all()
    serializer_class = MsgsDetailSerializer
