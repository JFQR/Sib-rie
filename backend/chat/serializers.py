from rest_framework import serializers
from .models import *

class MsgsDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=Msgs
        fields=[
            'idmsgs',
            'content',
            'sender',
            'url',
        ]