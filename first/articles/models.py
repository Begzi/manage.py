from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField('Название статьи', max_length= 100)
    text = models.TextField('Текст статьи')
    pub_date = models.DateTimeField('Дата публикации')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'

class Comment(models.Model):

    article = models.ForeignKey(Article, on_delete= models.CASCADE)


    parents_id = models.CharField('Родители комментария',max_length= 200)
    # path = ArrayField(models.IntegerField)  #Для PostgeSQL
    active = models.BooleanField(default=True)
    author_name = models.CharField('Имя автора', max_length= 50, unique=True)
    text = models.CharField('Текст комментария', max_length= 200)


    def __str__(self):
        return self.author_name

    class Meta:
        verbose_name = 'Комментарии'
        verbose_name_plural = 'Комментарии'