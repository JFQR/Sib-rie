from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('custom_auth.urls')), 
    path('money/', include('money.urls')), 
    path('people/', include('people.urls')), 
    path('product/', include('product.urls')), 
    path('chat/', include('chat.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
