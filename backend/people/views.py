from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentDetailSerializer

    def get_queryset(self):
        product = self.kwargs['product']
        return Comment.objects.filter(product=product)

class CommentDetailAPIView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer

class CommentCreateAPIView(generics.CreateAPIView):
    queryset=Comment.objects.all()
    serializer_class=CommentDetailSerializer

class CommentDestroyAPIView(generics.DestroyAPIView):
    lookup_field="idcomment"
    queryset=Comment.objects.all()	

class CommentRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field="idcomment"
    queryset=Comment.objects.all()
    serializer_class=CommentDetailSerializer

class CommentFilteredListAPIView(generics.ListAPIView):
    serializer_class = CommentDetailSerializer

    def get_queryset(self):
        product = self.kwargs['product']
        user_id = self.kwargs['iduser']
        return Comment.objects.filter(product=product, user_id=user_id)
