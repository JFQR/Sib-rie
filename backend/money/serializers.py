from rest_framework import serializers
from .models import *
from product.serializers import ProductListSerializer

class PurchaseListSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()
    class Meta:
        model=Purchase
        fields=[
            'user',
            'product',
            'total',
            'date',
        ]

class PurchaseDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=Purchase
        fields=[
        	'idpurchase',
            'user',
            'product',
            'total',
            'date',
        ]

class SellListSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()

    class Meta:
        model=Sells
        fields=[
            'idsell',
            'old_id_user',
            'old_customer',
            'product',
            'total',
            'date',
            'status',
        ]

class SellDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Sells
        fields=[
        	'idsell',
            'user',
            'product',
            'total',
            'date',
            'status'
        ]
