from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            user_data = UserSerializer(data['user']).data
            return Response({
                'user': user_data,
                'access': data['access'],
                'refresh': data['refresh'],
            }, status=201)
        return Response(serializer.errors, status=400)

#this is responsible for making the login:
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#this is responsible for making the update:
class UpdateUserAndRefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        user = request.user
        data = request.data

        user.name = data.get('name', user.name)

        password = data.get('password', None)
        if password:
            user.set_password(password)

        if 'img' in data:
            user.img = data['img']

        user.save()

        token = MyTokenObtainPairSerializer.get_token(user)
        access_token = str(token.access_token)
        refresh_token = str(token)

        return Response({
            'refresh': refresh_token,
            'access': access_token,
            'id': user.id,
            'name': user.name,
            'img': request.build_absolute_uri(user.img.url) if user.img else None,
        })


class DeleteAccountView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'message': 'Account deleted successfully'})

class SeeUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'email': user.email,
        })

class LogoutView(APIView):
    def post(self, request):
        print("Request data:", request.data)
        try:
            refresh_token = request.data["refresh"]
            print("Refresh:", refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("Error loggin out:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()
class UserDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            return Response({
                'email': user.email,
            })
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)