from django.contrib import admin
from django.urls import path
from . import views
#from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('register/', views.RegisterView.as_view(), name = "register_user"),
#this url is the responsible to make the login:
	path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
#this is responsible for updating the user:
    path('update/', views.UpdateUserAndRefreshTokenView.as_view(), name='update_user'),
    path('logout/', views.LogoutView.as_view(), name='auth_logout'),
    path('users/delete/', views.DeleteAccountView.as_view(), name = "delete_user"),
    path('seeuser/', views.SeeUserView.as_view(), name = "see_user"),
    path('user/<int:id>/', views.UserDetailView.as_view(), name="user_detail"),
]

