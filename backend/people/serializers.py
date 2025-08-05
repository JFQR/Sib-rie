from rest_framework import serializers
from .models import *

class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=[
        	'idcomment',
            'content',
            'user',
            'product',
        ]
