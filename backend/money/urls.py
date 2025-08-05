from django.urls import path

from .import views

app_name="money"

urlpatterns = [
#--------------------Basket:---------------------------------
	path("add/basket/<int:id>/", views.add_basket, name="add_basket"),
	path("delete/article/<int:id>/", views.delete_article, name="delete_article"),
	path("delete/basket/", views.delete_basket, name="delete_basket"),
	path("basket/", views.get_basket, name="get_basket"),

#-----------------------------achats:---------------------------------
	path("purchases/", views.PurchaseListAPIView.as_view(), name="see_purchases"),
	path("purchase/<int:idpurchase>", views.PurchaseDetailAPIView.as_view(), name="see_purchase"),
	path("purchase-user/<int:user_id>/",views.UserPurchaseView.as_view(), name = "purchases_of_user"),

	path("add/purchase/", views.PurchaseCreateAPIView.as_view(), name="create_purchase"),
	path("uptdate/purchase/<int:idpurchase>/", views.PurchaseRetrieveUpdateAPIView.as_view(), name="update_purchase"),
	path("destroy/purchase/<int:idpurchase>/", views.PurchaseDestroyAPIView.as_view(), name="destroy_purchase"),
#-----------------------------Ventes:---------------------------------
	path("sells/", views.SellListAPIView.as_view(), name="see_sells"),
	path("sell/<int:idsell>", views.SellDetailAPIView.as_view(), name="see_sell"),
	path("sells-user/<int:user_id>/",views.UserSellsView.as_view(), name = "sells_of_user"),
	path("sells-customer/<int:customer>/",views.CustomerSellsView.as_view(), name = "sells_customer"),
	path('sells-of-the-day/', views.TodaySellsView.as_view()),

	path("add/sell/", views.SellCreateAPIView.as_view(), name="create_sell"),
	path("update/sell/<int:idsell>/", views.SellRetrieveUpdateAPIView.as_view(), name="update_sell"),
	path("destroy/sell/<int:idsell>/", views.SellDestroyAPIView.as_view(), name="destroy_sell"),
]
