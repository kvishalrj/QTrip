from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "QTrip Admin"
admin.site.index_title = "Welcome to QTrip Admin Panel"

urlpatterns = [
    path('', include('home.urls')),
    path('adventures/', include('adventure.urls')),
    path('user/', include('user.urls')),
    path('booking/', include('booking.urls')),
    path('admin/', admin.site.urls)
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
