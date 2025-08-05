from django.contrib import admin
from django.urls import path
from product import views
from django.conf import settings
from django.conf.urls.static import static
from .views import descargar_imagen

app_name="product"

urlpatterns = [

    path('products/', views.ProductDetailAPIView.as_view()),
    path('product/<int:idproduct>/', views.ProductDetailAPIView.as_view()), 
    path('update/product/<int:idproduct>/', views.ProductRetrieveUpdateAPIView.as_view()),
    path('destroy/product/<int:idproduct>/', views.ProductDestroyAPIView.as_view()),
    path("create/product/", views.ProductCreateAPIView.as_view(),name="create_produit"),
#ProductListAPIView is for the main page, to see which products I'm selling or I've 
#bought
    path('products-list/', views.ProductListAPIView.as_view()),
    path('myproducts/<int:iduser>/', views.ProductUtilizListAPIView.as_view()),

    path('images/<int:id_product>/', views.ImagesByProductAPIView.as_view(), name='update-images'),
    path('update/imgs/<int:id_imgProduct>/', views.UpdateImagesByProductAPIView.as_view(), name='product-images'),
    path('delete/img/<int:id>/', views.ImgsDeleteAPIView.as_view()),
    path("create/imgs/", views.ImgsCreateAPIView.as_view(),name="create_images"),

    path('colours/', views.ColoursListAPIView.as_view()),
    path('cms/', views.CmsListAPIView.as_view()),
    path('colour/<int:idcolour>/', views.ColoursDetailAPIView.as_view()),
    path('cm/<int:idcms>/', views.CmsDetailAPIView.as_view()),
    path('descargar_imagen/<int:imagen_id>/', descargar_imagen, name='descargar_imagen'),
	path('subcategories/', views.SubcategoriesListAPIView.as_view()),
    path('subcategory/<int:idsubcategory>/',views.SubcategoriesDetailAPIView.as_view()),

#--------------------SEARCHBAR----------------
    path('search/title/',views.search_title),
    path('search/colour/',views.search_colour),
    path('search/width/',views.search_width),
    path('search/length/',views.search_length),
    path('search/cms/',views.search_cms),
    path('search/price/',views.search_price),
    path('search/size/',views.search_size),
    path('search/subcategory/',views.search_subcategory),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
