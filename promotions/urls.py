import django.conf.urls

from . import views
from .views import list_promotion, add_user, login_user, logout_user, user_logged, profile

urlpatterns = [
    django.conf.urls.url(r'^$', views.home, name='home'),
    django.conf.urls.url(r'^list_promotion/$', list_promotion, name="promotions"),
    django.conf.urls.url(r'^register_users/$', views.add_user, name='register_users'),
    django.conf.urls.url(r'^login_users/$', views.login_user, name='login_users'),
    django.conf.urls.url(r'^logout_users/$', views.logout_user, name='logout_users'),
    django.conf.urls.url(r'^logged_users/$', views.user_logged, name='logged_users'),
    django.conf.urls.url(r'^profile/$', views.profile, name='profile'),
]
