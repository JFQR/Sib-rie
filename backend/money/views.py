from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.permissions import IsAuthenticated
from datetime import date


basket = Basket
@csrf_exempt
def add_basket(request, id):
    if request.method == "POST":
        basket = Basket(request)
        basket.add_article(id)
        print("SESSION CONTENT AFTER ADD:", request.session["basket"])
        return JsonResponse({"message": "Article added"}, status=201)
    return JsonResponse({"error": "Not allowed method"}, status=405)


@csrf_exempt
def delete_article(request, id):
    if request.method == "DELETE":
        basket = Basket(request)
        basket.delete_article(id)
        return JsonResponse({"message": "Article deleted"})
    return JsonResponse({"error": "Not allowed method"}, status=405)


@csrf_exempt
def delete_basket(request):
    if request.method == "DELETE":
        basket = Basket(request)
        basket.delete_basket()
        return JsonResponse({"message": "Basket deleted"})
    return JsonResponse({"error": "Not allowed method"}, status=405)

def get_basket(request):
    basket = Basket(request)
    print("GET SESSION CONTENT:", request.session.get("basket", []))
    return JsonResponse({"basket": request.session.get("basket", [])})

#----------------ACHATS------------------
class PurchaseListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = PurchaseListSerializer

class PurchaseDetailAPIView(generics.ListAPIView):
    lookup_field="user"
    queryset = Purchase.objects.all()
    serializer_class = PurchaseListSerializer

class PurchaseCreateAPIView(generics.CreateAPIView):
    queryset=Product.objects.all()
    serializer_class = PurchaseDetailSerializer

class PurchaseRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field="idpurchase"
    queryset=Product.objects.all()
    serializer_class=PurchaseDetailSerializer

class PurchaseDestroyAPIView(generics.DestroyAPIView):
    lookup_field="idpurchase"
    queryset=Purchase.objects.all()
    serializer_class = PurchaseListSerializer

#--------------SELLS---------------------

class SellListAPIView(generics.ListAPIView):
    queryset = Sells.objects.all()
    serializer_class = SellListSerializer

class TodaySellsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()
        user = request.user
        sells = Sells.objects.filter(old_id_user=user, date=today)
        serializer = SellListSerializer(sells, many=True)
        return Response(serializer.data)

class CustomerSellsView(APIView):

    def get(self, request, customer):
        sells = Sells.objects.filter(customer_id = customer).select_related('product')
        serializer = SellListSerializer(sells, many=True)

        return Response(serializer.data)

class UserSellsView(APIView):
    def get(self, request, user_id):
        sells = Sells.objects.filter(old_id_user_id = user_id).select_related('product')
        serializer = SellListSerializer(sells, many=True)

        return Response(serializer.data)

class UserPurchaseView(APIView):
    def get(self, request, user_id):
        sells = Sells.objects.filter(old_customer_id = user_id).select_related('product')
        serializer = SellListSerializer(sells, many=True)

        return Response(serializer.data)

class SellDetailAPIView(generics.ListAPIView):
    lookup_field="idsell"
    queryset = Sells.objects.all()
    serializer_class = SellListSerializer

class SellCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        product_id = request.data.get('product')
        total = request.data.get('total')
        date = request.data.get('date')
        id_user = request.data.get('id_user')
        customer = request.data.get('customer')

        try:
            product = Product.objects.get(idproduct=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found '}, status=404)

        sell = Sells.objects.create(
            old_id_user_id = id_user,
            old_customer_id = customer,
            product = product,
            total = total,
            date = date,
            status = False
        )

        return Response({'message': 'Purchase registred', 'idsell': sell.idsell}, status=201)

class SellRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field="idsell"
    queryset=Sells.objects.all()
    serializer_class=SellListSerializer

class SellDestroyAPIView(generics.DestroyAPIView):
    lookup_field="idsell"
    queryset=Sells.objects.all()
    serializer_class=SellListSerializer

