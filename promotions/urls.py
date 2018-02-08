from django.conf.urls import url
from . import views
from .views import list_promotion, home

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^list_promotion', list_promotion, name="promotions"),
]