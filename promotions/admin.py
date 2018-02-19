from django.contrib import admin
from .models import Promotion, Message, Category, Favorite, UserProfile, Cities


# Register your models here.
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('promotion_name', 'initial_date', 'category', 'ciudad', 'cost', 'description', 'image')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('message', 'user')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'country', 'city', 'address', 'category', 'image')

admin.site.register(Promotion, PromotionAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Category)
admin.site.register(Favorite)
admin.site.register(UserProfile, ProfileAdmin)
admin.site.register(Cities)