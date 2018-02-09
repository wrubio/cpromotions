from django.contrib import admin
from .models import Promotion, Message, Category, Favorite


# Register your models here.
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('promotion_name', 'initial_date', 'end_date', 'city', 'cost', 'description', 'image')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('message', 'user')


admin.site.register(Promotion, PromotionAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Category)
admin.site.register(Favorite)
