from django.urls import path

from . import views

app_name="chat"

urlpatterns = [
	#this strg should be something like: customer_1_seller_2	
	path("add/msg/", views.MsgsCreateAPIView.as_view(), name="add_msg"),
	path("get/msgs/<str:url>/", views.MsgsDetailAPIView.as_view(), name="get_msgs"),
]