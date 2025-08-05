from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(write_only=True, required=False)
    name = serializers.CharField(write_only=True, required=True) 

    class Meta:
        model = CustomUser
        fields = ['id', 'password', 'name', 'img', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 caracters long")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = CustomUser.objects.create(**validated_data)

        refresh = RefreshToken.for_user(user)

        return {
            'user': user,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['id'] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data['id'] = self.user.id
        data['email'] = self.user.email
        data['name'] = self.user.name
        
        request = self.context.get('request')
        if request and self.user.img:
            data['img'] = request.build_absolute_uri(self.user.img.url)
        else:
            data['img'] = None

        return data