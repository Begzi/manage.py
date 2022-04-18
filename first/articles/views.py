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

def detail(request, article_id):
    try:
        a = Article.objects.get(id = article_id)
    except:
        raise Http404("Статья не найдена!")

    latest_comments_list = a.comment_set.filter(active=True).order_by('-id')[:10]

    return render(request, 'detail.html', {'article' : a, 'latest_comments_list': latest_comments_list})

def personToDictionary(model_comment_object):
    if model_comment_object == None:
        return None

    dictionary = {}
    dictionary["id"] = model_comment_object.id
    dictionary["author_name"] = model_comment_object.author_name
    dictionary["text"] = model_comment_object.text
    dictionary["parent"] = model_comment_object.parent
    # dictionary["article_id"] = model_comment_object.article.id

    return dictionary


def ajax_post_data(request):
    result = {}
    username = request.POST['username']
    text = request.POST['text']
    article_id = request.POST['article_id']
    if len(username) ==0 or len(text) ==0:
        result['code'] = 10001
        result['content'] = 'Параметр запроса пуст'
    else:
        try:
            a = Article.objects.get(id = article_id)
            a.comment_set.create(author_name= username, text = text)
            latest_comments_list = a.comment_set.order_by('-id')[:10]
            print(latest_comments_list)
            # result = serializers.serialize("json", Comment.objects.all(), fields = ("author_name", "text", "parent"))
            i = 0
            for el in latest_comments_list:
                comment = personToDictionary(el)
                result[i] = comment
                i = i + 1

            # output = json.dumps(latest_comments_list)

            result['code'] = 10000
            result['content'] = 'Успешно добавленные данные'
            # result['username'] = username
            # result['text'] = text
        except:
            result['code'] = 10002
            result['content'] = 'Ошибка добавления данных'

    return JsonResponse(result)



def test(request):
    print('asd')
    try:
        a = Article.objects.get(id = 1)
    except:
        raise Http404("Статья не найдена!")

    latest_comments_list = a.comment_set.filter(active=True).order_by('-id')[:10]

    latest_comments_comments_list = a.comment_set.filter(active=False).order_by('-id')

    all_comment = []
    for i in latest_comments_list:
        i = personToDictionary(i)
        id = str(i['id'])
        dictionory ={}
        dictionory['parent'] = i
        tmp = []
        print(tmp)
        for j in latest_comments_comments_list:
            j =  personToDictionary(j)
            num = str(j['parent']).find('+')
            if num == -1:
                parent_frist_id = str(j['parent'])
            else:
                parent_frist_id = str(j['parent'])[:num]
            if id ==  parent_frist_id:
                tmp.append(j)
        if len(tmp) != 0:
            dictionory['child'] = tmp
        else:
            dictionory['child'] = None

        all_comment.append(dictionory)

    print(all_comment)
    for c in all_comment:
        print(c['parent']['author_name'] )


    return render(request, 'detail1.html', {'all_comment' : all_comment })