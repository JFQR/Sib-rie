from django.contrib import admin
from django.urls import path
from people import views

app_name="people"

urlpatterns = [
	path('comments/<int:product>/', views.CommentListAPIView.as_view()),				
	path('comment/<int:product>/<int:iduser>/', views.CommentFilteredListAPIView.as_view()),
	path('add/comment/', views.CommentCreateAPIView.as_view()),		
	path('delete/comment/<int:idcomment>/', views.CommentDestroyAPIView.as_view()),	
	path('update/comment/<int:idcomment>/', views.CommentRetrieveUpdateAPIView.as_view()),	
]
