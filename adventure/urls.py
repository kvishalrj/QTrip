from django.urls import path
from adventure import views

urlpatterns = [
    path('', views.AdventurePageView.as_view(), name='adventure_page')
]
