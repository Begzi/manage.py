from .models import Article
from django.forms import ModelForm, Textarea, TextInput

class ArticleForm(ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'text', 'pub_date']

        widgets = {

            "title" : TextInput(attrs={
                'class': 'form_control',
                'placeholder': 'Введите название'
            }),
            "text": Textarea(attrs={
                  'class' : 'form_control',
                  'placeholder' : 'Введите описание'
            }),

        }