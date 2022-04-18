from django.urls import path

from . import  views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name = 'index'),
    path('test/', views.test, name = 'test'),
    path('ajax_post_data/', views.ajax_post_data, name = 'ajax_post_data'),
    path('<int:article_id>/', views.detail, name= 'detail'),
]