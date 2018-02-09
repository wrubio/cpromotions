import django.conf.urls

from . import views
from .views import list_promotion, add_user

urlpatterns = [
    django.conf.urls.url(r'^$', views.home, name='home'),
    django.conf.urls.url(r'^list_promotion/$', list_promotion, name="promotions"),
    django.conf.urls.url(r'^register_users/$', views.add_user, name='register_users'),
]
