from rest_framework import serializers
from .models import *


class ProductImageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesProduct
        fields = [
                    'id_product', 
                    'src',
                    'id_imgProduct',
                ]

class ImagesProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesProduct
        fields = ['id_imgProduct', 'src']

class ProductImageListSerializer(serializers.ListSerializer):
    child = ProductImageDetailSerializer()

class ProductDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Product
        fields=[
            'idproduct',
            'iduser',
            'title',
            'colour',
            'width',
            'length',
            'cms',
            'mainphoto',
            'price',
            'desc',
            'availability',
            'subcategory',
            'size',
            'score',
        ]

class ProductListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Product
        fields=[
            'idproduct',
            'title',
            'colour',
            'cms',
            'mainphoto',
            'price',
            'availability',
        ]

class CmsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cms
        fields = [
            'idcms',
            'length',
        ]

class ColourListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Colour
        fields=[
            'idcolour',
            'name', 
        ]

class SubcategoryListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Subcategory
        fields = [
            'idsubcategory',
            'name',
            'fk_category',
        ]
