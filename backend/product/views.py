from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.http import FileResponse
import json
from django.db.models import Q

class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        return Product.objects.filter(availability__gt=0)

class ProductUtilizListAPIView(APIView):
    def get(self, request, iduser):
        get_products = Product.objects.filter(iduser = iduser)
        serializer = ProductListSerializer(get_products, many = True)
        return Response(serializer.data)

class ProductDetailAPIView(generics.RetrieveAPIView):
    lookup_field="idproduct"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

class ProductCreateAPIView(generics.CreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductDetailSerializer

class ProductRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field="idproduct"
    queryset=Product.objects.all()
    serializer_class=ProductDetailSerializer

class ProductDestroyAPIView(generics.DestroyAPIView):
    lookup_field="idproduct"
    queryset = Product.objects.all()

class ImgsDeleteAPIView(generics.DestroyAPIView):
    lookup_field="id_imgProduct"
    queryset = ImagesProduct.objects.all()

class ColoursListAPIView(generics.ListAPIView):
    queryset = Colour.objects.all()
    serializer_class = ColourListSerializer

class ColoursDetailAPIView(APIView):

    def get(self, request, idcolour):

        get_couleur = Colour.objects.filter(idcolour = idcolour)
        serializer = ColourListSerializer(get_couleur, many=True)
        return Response(serializer.data)

class SubcategoriesListAPIView(generics.ListAPIView):
    queryset=Subcategory.objects.all()
    serializer_class=SubcategoryListSerializer

class SubcategoriesDetailAPIView(APIView):

    def get(self, request, idsubcategory):

        get_subcategorie = Subcategory.objects.filter(idsubcategory = idsubcategory)
        serializer = SubcategoryListSerializer(get_subcategorie, many=True)
        return Response(serializer.data)

class ImgsCreateAPIView(generics.CreateAPIView):
    queryset = ImagesProduct.objects.all()
    serializer_class = ProductImageDetailSerializer

class UpdateImagesByProductAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImagesProduct.objects.all()
    serializer_class = ImagesProductSerializer
    lookup_field = 'id_imgProduct'
    
class ImagesByProductAPIView(generics.ListAPIView):
    serializer_class = ImagesProductSerializer

    def get_queryset(self):
        id_product = self.kwargs.get("id_product")
        return ImagesProduct.objects.filter(id_product=id_product)

def descargar_imagen(request, imagen_id):
    imagen = get_object_or_404(ImagesProduct, id_product=imagen_id)
    response = FileResponse(imagen.archivo.open('rb'))
    response['Content-Type'] = 'image/jpeg'
    response['Content-Disposition'] = f'inline; filename={imagen.archivo.name}'
    return response

class ImgsSpecificAPIView(APIView):
    def get(self, request, id_product):
        get_imgs = [ImagesProduct.objects.filter(id_produit = id_product)]
        serializer = ProductImageDetailSerializer(get_imgs, many=True)
        return Response(get_imgs)

class ProductCreateAPIView(generics.CreateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductDetailSerializer

class CmsListAPIView(generics.ListAPIView):
    queryset=Cms.objects.all()
    serializer_class=CmsListSerializer

class CmsDetailAPIView(APIView):

    def get(self, request, idcms):

        get_cms = Cms.objects.filter(idcms = idcms)
        serializer = CmsListSerializer(get_cms, many=True)
        return Response(serializer.data)
#--------------------------SEARCHBAR-------------------------------------------
def search_title(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(title__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })

    return JsonResponse({'posts': data})

def search_colour(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(colour__name__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_width(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(width__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_length(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(length__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_cms(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(cms__length__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_price(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(price__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_size(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(size__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})

def search_img(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(mainphoto__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})
def search_subcategory(request):
    query = request.GET.get('q', '')
    results = Product.objects.filter(subcategory__icontains=query)

    data = []
    for product in results:
        mainphoto_url = request.build_absolute_uri(product.mainphoto.url) if product.mainphoto else ''
        data.append({
            'idproduct': product.idproduct,
            'price': product.price,
            'title': product.title,
            'mainphoto': mainphoto_url,
        })
    return JsonResponse({'posts': data})