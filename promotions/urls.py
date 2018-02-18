import django.conf.urls

from . import views
from django.conf import settings
from .views import list_promotion, list_category, user_information
from django.conf.urls.static import static

urlpatterns = [
    django.conf.urls.url(r'^$', views.home, name='home'),
    django.conf.urls.url(r'^list_promotion/$', list_promotion, name="promotions"),
    django.conf.urls.url(r'^list_category/$', list_category, name="list_category"),
    django.conf.urls.url(r'^register_users/$', views.add_user, name='register_users'),
    django.conf.urls.url(r'^login_users/$', views.login_user, name='login_users'),
    django.conf.urls.url(r'^logout_users/$', views.logout_user, name='logout_users'),
    django.conf.urls.url(r'^logged_users/$', views.user_logged, name='logged_users'),
    django.conf.urls.url(r'^profile/$', views.profile, name='profile'),
    django.conf.urls.url(r'^edit_profile/$', views.update_user_profile, name='edit_profile'),
    django.conf.urls.url(r'^user_information/$', user_information, name='user_information'),
    django.conf.urls.url(r'^add_message/$', views.add_message, name='add_message'),
    django.conf.urls.url(r'^list_message/$', views.list_message, name='list_message'),
]
