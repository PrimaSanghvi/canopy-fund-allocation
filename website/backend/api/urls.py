from django.urls import path
from .views import allocate_funds

urlpatterns = [
    path("allocate/", allocate_funds, name="allocate"),
]
