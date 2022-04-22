from django.urls import path

from . import  views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name = 'home'),
    path('add_article/', views.add_article, name = 'add_article'),
    path('ajax_add_comment/', views.ajax_add_comment, name = 'ajax_add_comment'),
    path('ajax_check_comment/', views.ajax_check_comment, name = 'ajax_check_comment'),
    path('<int:article_id>/', views.detail, name= 'detail'),
]