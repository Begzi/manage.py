from django.http import  HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from .models import Article, Comment
import json
from django.urls import reverse
from django.utils import timezone
from django.core import serializers

def index(request):
    latest_articles_list = Article.objects.order_by('-pub_date')[:5]
    return render(request, 'list.html', {'latest_articles_list' : latest_articles_list})

def create_api(parent, childs, number):
    if number > 4:
        return 0
    # pass

def detail_1(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404("Статья не найдена!")


    latest_comments_list = a.comment_set.filter(active=True).order_by('-id')[:10]

    latest_comments_comments_list = a.comment_set.filter(active=False).order_by('-id')

    for i in latest_comments_list:
        i = comment_to_dictionary(i)
        create_api(i, latest_comments_comments_list, 1)



    pass

def detail(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404("Статья не найдена!")


    latest_comments_list = a.comment_set.filter(active=True).order_by('-id')[:10]

    latest_comments_comments_list = a.comment_set.filter(active=False).order_by('-id')

    all_comment = []

    tmp_third_level = []
    for i in latest_comments_list:  #Родительский комментарии
        i = comment_to_dictionary(i)
        id = str(i['id'])     #Id родительского комментария
        dictionory_first_level ={}           # 1 уровень словаря, где будут комменты 1 уровня
        dictionory_first_level['parent'] = i
        tmp_first_level = []           # Будут комментарии 2 уровня,
        k = 0 #Не нужен
        check = True         # Для проверок
        for j in latest_comments_comments_list:
            j =  comment_to_dictionary(j)

            tmp_second_level = []                 # Будут комментарии 3 уровня,
            dictionory_second_level = {}            # 2 уровень словаря, где будут комменты 2 уровня, 1 экземпляр

            num_first_plus = str(j['parents_id']).find('+')

            if num_first_plus == -1:     # если равен -1, то комментарий 2 уровня
                parent_frist_id = str(j['parents_id'])        # комментарий 2 уровня
                if id == parent_frist_id:            # проверка, комментарий 2 уровня дочерний 1 уровня
                    dictionory_second_level['parent'] = j   #yes
                    if len(tmp_third_level) != 0:      #если был комментарий 3 уровня, он будет записан сюда,

                        for l in tmp_third_level:       # коментарии 3 уровня, надо поверить дочерние ли они
                            num_first_tmp_plus = str(l['parents_id']).find('+')
                            parent_second_id = str(l['parents_id'])[num_first_tmp_plus + 1:]    # родитель комментария 3 уровня
                            if parent_second_id == str(j['id']):
                                tmp_second_level.append(l)         # комментарий 3 уровня помещаем в лист, комментария 2 уровня


                        if (len(tmp_second_level) != 0):  #если лист комментария 2 уровня пуст, значит детей нет
                            dictionory_second_level['child'] = tmp_second_level      #добавляем детей комментарию 2 уровня
                        else:
                            dictionory_second_level['child'] = None

                    else:                       # у комментария 1 уровня нет детей
                        dictionory_second_level['child'] = None

                    tmp_first_level.append(dictionory_second_level)   #комментарий 1 уровнял, 1 экземпляр, 1 словарь

            else:  #3 уровня и выше комментарии помещаются в tmp_third_level, для того чтобы потом для комментариев 2 уровня получить их



                if (len(tmp_third_level) != 0 ):   #не первый комментарии 3 уровня, если он уже записан в лист комментарии 3 уровня, его не берём
                    for l in tmp_third_level:
                        if l['id'] == j['id']:  # проверка
                            check = False
                            break

                if check:     # комментарий 3 уровня и выше не записан в лист tmp_third_level
                    parent_frist_id = str(j['parents_id'])[:num_first_plus]
                    num_second_plus = str(j['parents_id'])[num_first_plus + 1:].find('+')

                    if num_second_plus != -1: #Выше 3 уровня вложенные комментарии не берём
                        pass
                    else:
                        parent_second_id = str(j['parents_id'])[num_first_plus + 1:]
                        tmp_third_level.append(j)




        if len(tmp_first_level) != 0:
            dictionory_first_level['child'] = tmp_first_level
        else:
            dictionory_first_level['child'] = None

        all_comment.append(dictionory_first_level)


    return render(request, 'detail.html', {'article' : a, 'all_comment' : all_comment })

def comment_to_dictionary(model_comment_object):
    if model_comment_object == None:
        return None

    dictionary = {}
    dictionary["id"] = model_comment_object.id
    dictionary["author_name"] = model_comment_object.author_name
    dictionary["text"] = model_comment_object.text
    dictionary["parents_id"] = model_comment_object.parents_id
    dictionary["article_id"] = model_comment_object.article.id

    return dictionary


def ajax_check_comment(request):
    result = {}
    parent_id = str(request.POST['parent_id'])
    print(parent_id)

    try:
        childs_comment = Comment.objects.filter(parents_id__startswith = parent_id)
        print(childs_comment)
        all_comment_child = []
        for char in childs_comment:

            check_not_grand_child = str(char.parents_id)[len(parent_id):].find('+')
            if check_not_grand_child != 0:
                pass
            else:


                char = comment_to_dictionary(char)
                all_comment_child.append(char)

        print(all_comment_child)
        result['code'] = 10000
        result['content'] = all_comment_child

    except:
        result['code'] = 10002
        result['content'] = 'Параметр запроса пуст'

    return JsonResponse(result)


def ajax_add_comment(request):
    result = {}
    username = request.POST['username']
    text = request.POST['text']
    article_id = request.POST['article_id']
    parent_id = request.POST['parent_id']
    if len(username) ==0 or len(text) ==0:
        result['code'] = 10002
        result['content'] = 'Параметр запроса пуст'
    else:
        try:
            if(parent_id == ''):
                a = Article.objects.get(id = article_id)
                a.comment_set.create(author_name= username, text = text)
                latest_comment = a.comment_set.get(author_name= username, text = text)

                result['parents_id'] = latest_comment.id
                result['id'] = (latest_comment.id)
            else:

                a = Article.objects.get(id = article_id)
                a.comment_set.create(author_name= username, text = text, parents_id= parent_id, active= False)
                latest_comment = a.comment_set.get(author_name= username, text = text)

                result['parents_id'] = str(latest_comment.parents_id) + '+' + str(latest_comment.id)
                result['id'] = (latest_comment.id)

            result['code'] = 10000
            result['content'] = 'Успешно добавленные данные'

        except:
            result['code'] = 10002
            result['content'] = 'Ошибка добавления данных'

    return JsonResponse(result)



def test(request):
    try:
        a = Article.objects.get(id = 1)
    except:
        raise Http404("Статья не найдена!")

    latest_comments_list = a.comment_set.filter(active=True).order_by('-id')[:10]

    latest_comments_comments_list = a.comment_set.filter(active=False).order_by('-id')

    all_comment = []

    tmp_third_level = []
    for i in latest_comments_list:
        i = comment_to_dictionary(i)
        id = str(i['id'])
        dictionory_first_level ={}
        dictionory_first_level['parent'] = i
        tmp_first_level = []
        k = 0
        check = True
        for j in latest_comments_comments_list:
            j =  comment_to_dictionary(j)

            tmp_second_level = []
            dictionory_second_level = {}

            num_first_plus = str(j['parents_id']).find('+')

            if num_first_plus == -1:
                parent_frist_id = str(j['parents_id'])
                if id == parent_frist_id:
                    dictionory_second_level['parent'] = j
                    # chack1 = True
                    if len(tmp_third_level) != 0:
                        for l in tmp_third_level:
                            num_first_tmp_plus = str(l['parents_id']).find('+')
                            parent_second_id = str(l['parents_id'])[num_first_tmp_plus + 1:]
                            if parent_second_id == str(j['id']):
                                tmp_second_level.append(l)
                        if (len(tmp_second_level) != 0):
                            dictionory_second_level['child'] = tmp_second_level
                        else:
                            dictionory_second_level['child'] = None

                    else:
                        dictionory_second_level['child'] = None
                    tmp_first_level.append(dictionory_second_level)

            else:  #3 уровня комментарии помещаются в tmp_third_level, для того чтобы потом для комментариев 2 уровня получить их
                if (len(tmp_third_level) != 0 ):
                    for l in tmp_third_level:
                        if l['id'] == j['id']:
                            check = False
                            break

                if check:
                    parent_frist_id = str(j['parents_id'])[:num_first_plus]
                    num_second_plus = str(j['parents_id'])[num_first_plus + 1:].find('+')

                    if num_second_plus != -1: #Выше 3 уровня вложенные комментарии не берём
                        pass
                    else:
                        parent_second_id = str(j['parents_id'])[num_first_plus + 1:]
                        tmp_third_level.append(j)




        if len(tmp_first_level) != 0:
            dictionory_first_level['child'] = tmp_first_level
        else:
            dictionory_first_level['child'] = None

        all_comment.append(dictionory_first_level)


    return render(request, 'detail1.html', {'all_comment' : all_comment })