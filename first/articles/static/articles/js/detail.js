
    function check_have_child(el)
    {
        console.log(el.target.value);
        console.log(el.target.name);
        console.log(el.target);
        console.log(el.target.parentNode.parentNode);
        if ((el.target.value > 3 ) && (el.target.name != 'created'))
        {





<!--<div class="comment_3" name="comment_3" value="292" style="position: relative; left: 20px;">-->
            var parent = el.target.parentNode;
            var lvl_comment = el.target.value;
            var parent_id = (el.target.parentNode.getAttribute('value'));
    <!--            console.log(parent_id - 1)-->


            el.target.name = 'created';

            var csrf = (document.getElementsByName('csrfmiddlewaretoken')[0].value);
            console.log(csrf);
            console.log(parent_id);
            sent_data =
            {
                'parent_id': parent_id,
                "csrfmiddlewaretoken": csrf,
            }
            url = "/ajax_check_comment/";
            $.ajax
            (
                {

                    url: url,
                    type:"post",
                    data: sent_data,
                    success: function (data)
                    {
                        console.log(data['code']);
                        console.log(data['content']);
                        for (var child_number in data['content'])
                        {
                            username_comment = data['content'][child_number].parent.author_name;
                            text_comment = data['content'][child_number].parent.text;
                            if (data['content'][child_number].child != null)
                            {
                                var child_have = 'Yes';
                            }
                            else
                            {
                                var child_have = 'No';
                            }
                            data_id = {
                                'id': data['content'][child_number].parent.id,
                                'child' : child_have
                                 };
                            console.log(data_id)
                            console.log(lvl_comment)
                            console.log(parent)
                            console.log(username_comment)
                            console.log(text_comment)
                            console.log(child_have)
                            create_in_clent_frontend(data_id, lvl_comment, parent, username_comment,text_comment, csrf)
                        }
                    }
                }
            )

        }
    }

$(document).on('click', 'input[class^="sent_button_comment"]', function(e)
        {
        e.preventDefault();
        var lvl_comment = e.target.id
        if (lvl_comment == 1)
        {

            var username_comment = $("#add_name_comment_1").val();
            var text_comment = $("#add_text_comment_1").val();
            var parent_id = '';


        }
        else
        {
            var parent = e.target.parentNode.parentNode.parentNode;
            var parent_id = (String(parent.getAttribute('value')));


            var name_input ='add_name_comment_'.concat(String(lvl_comment)).concat('_').concat(String(parent.getAttribute('value')));
            var text_area ='add_text_comment_'.concat(String(lvl_comment)).concat('_').concat(String(parent.getAttribute('value')));

            document.getElementById(String(lvl_comment)).hidden = false;
            var username_comment =  document.getElementById(name_input).value;
            var text_comment =  document.getElementById(text_area).value;
        }

<!--        <input type="hidden" name="csrfmiddlewaretoken" value="mq6LfVsyedinhFRe0yoQ3Mf56gxEWW8etfIjV3MXXNNe9otTJ2QycVD5Tt4HyHdd">-->

        var csrf = (document.getElementsByName('csrfmiddlewaretoken')[0].value);
        var article_id = document.getElementsByClassName('article_id')[0].getAttribute('value');

        sent_data =
        {
            "username": username_comment,
            "text": text_comment,
            "article_id": article_id,
            "parent_id": parent_id,
            "csrfmiddlewaretoken": csrf,
        };
        url = "/ajax_add_comment/";
        $.ajax
        (
            {

                url:url,
                type:"post",
                data:sent_data,
                success:function (data)
                {
                    create_in_clent_frontend(data, lvl_comment, parent, username_comment,text_comment, csrf);
                }

            }
        );
    }
)


function create_in_clent_frontend(data, lvl_comment, parent, username_comment,text_comment, csrf)
{

                    div_name = 'div.comment_'.concat(String(lvl_comment));
                    var string_lvl_comment = String(lvl_comment);
                    var next_lvl_comment = String(parseInt(lvl_comment) + 1);


                    if (data['id'] != null)
                    {


<!--                                    <div class = "comment_#" name= "comment_#" value = 'c.parent.id'> То что создаю&ndash;&gt;-->
                        var comment = document.createElement("div");
                        comment.setAttribute('class', 'comment_'.concat(string_lvl_comment));
                        comment.setAttribute('name', 'comment_'.concat(string_lvl_comment));
                        comment.setAttribute('value', data["id"]);
                        if (lvl_comment > 1)
                        {
                            comment.style.position = 'relative';
                            comment.style.left = '20px';
                        }
                        comment.hidden = false;


                        var username = document.createElement("strong");
                        var add_text_comment = document.createElement("p");

                        var em = document.createElement("em");
                        em.textContent = 'Комментатор: ';

<!--                                    author_name = username_comment;-->
                        username.textContent = username_comment;

                        comment.appendChild(em);
                        comment.appendChild(username);


<!--                                    comment_text = text_comment;-->
                        add_text_comment.textContent = text_comment;


                        comment.appendChild(add_text_comment);





<!--                            <div id="answer{{ c.parent.id  }}"  hidden>-->
                        var answer_div = document.createElement('div');
                        div_answer_name = 'answer'.concat(String(data['id']));
                        answer_div.setAttribute('id', div_answer_name);
                        answer_div.hidden = true;

<!--                                    <form method="POST" action="">-->
<!--                                        <input value="HVGwNSk5NQ7Y0EjWXatFlKVV3CVTCewPOKi4t0EuwqCPSnVBGEVnuTjVQPsWeZBO" name="csrfmiddlewaretoken" type="hidden">-->
<!--                                        <br>-->
<!--                                        <input type="text" placeholder="Ваше имя" id="add_name_comment_3_285+289" name="name" required="">-->
<!--                                        <br>-->
<!--                                        <textarea cols="20" rows="8" placeholder="Текст комментрия" id="add_text_comment_3_285+289" name="text" required=""></textarea>-->
<!--                                        <br>-->
<!--                                        <input class="sent_button_comment" type="button" id="3" value="Ответить">-->
<!--                                    </form>-->
<!--csrfmiddlewaretoken HVGwNSk5NQ7Y0EjWXatFlKVV3CVTCewPOKi4t0EuwqCPSnVBGEVnuTjVQPsWeZBO-->
<!--csrfmiddlewaretoken HVGwNSk5NQ7Y0EjWXatFlKVV3CVTCewPOKi4t0EuwqCPSnVBGEVnuTjVQPsWeZBO-->
<!--                                        <form action="" method="POST">-->
<!--                                            <input type="hidden" name="csrfmiddlewaretoken" value="HVGwNSk5NQ7Y0EjWXatFlKVV3CVTCewPOKi4t0EuwqCPSnVBGEVnuTjVQPsWeZBO">-->

<!--                                            <input type="text" id="add_name_comment_3_285+288" required="" placeholder="Ваше имя" name="name"><br>-->
<!--                                            <textarea name="text" id="add_text_comment_3_285+288" required="" placeholder="Текст комментрия" cols="30" rows="10"></textarea><br>-->
<!--                                            <input type="button" id="3" class="sent_button_comment" value="Оставить комментраий">  -->

<!--                                        </form>-->

                        var form = document.createElement('form');
                        form.setAttribute('method', "POST");
                        form.setAttribute('action', "");

                        var csrfmiddlewaretoken = document.createElement('input');
                        csrfmiddlewaretoken.setAttribute('value', csrf);
                        csrfmiddlewaretoken.setAttribute('name', "csrfmiddlewaretoken");
                        csrfmiddlewaretoken.setAttribute('type', "hidden");
                        form.appendChild(csrfmiddlewaretoken)

                        var br = document.createElement('br');
                        form.appendChild(br)

                        var add_name_comment = document.createElement('input');
                        add_name_comment.setAttribute('type', "text");
                        add_name_comment.setAttribute('placeholder', "Ваше имя");
                        add_name_comment.setAttribute('id', 'add_name_comment_'.concat(next_lvl_comment).concat('_').concat(String(data['id'])));
                        add_name_comment.setAttribute('name', "name");
                        add_name_comment.required = true;
                        form.appendChild(add_name_comment)

                        var br = document.createElement('br');
                        form.appendChild(br)

                        var add_text_comment = document.createElement('textarea');
                        add_text_comment.setAttribute('cols', 20);
                        add_text_comment.setAttribute('rows', 8);
                        add_text_comment.setAttribute('placeholder', "Текст комментрия");
                        add_text_comment.setAttribute('id', 'add_text_comment_'.concat(next_lvl_comment).concat('_').concat(String(data['id'])));
                        add_text_comment.setAttribute('name', "text");
                        add_text_comment.required = true;
                        form.appendChild(add_text_comment)

                        var br = document.createElement('br');
                        form.appendChild(br)

<!--<input type="button" id="3" class="sent_button_comment" value="Ответить">-->
<!--<input type="button" id="3" class="sent_button_comment" value="Оставить комментраий">-->
                        var sent_button_comment = document.createElement('input');
                        sent_button_comment.setAttribute('class', "sent_button_comment");
                        sent_button_comment.setAttribute('type', "button");
                        sent_button_comment.setAttribute('id', next_lvl_comment);
                        sent_button_comment.setAttribute('value', 'Оставить комментраий');

                        form.appendChild(sent_button_comment)

                        answer_div.appendChild(form)

<!--                <button type="button" class = "cansel_button" value="{{ c.parent.id }}" hidden >Отмена</button>-->
                        var cansel_button = document.createElement('button');
                        cansel_button.setAttribute('class', 'cansel_button');
                        cansel_button.setAttribute('type', 'button');
                        cansel_button.setAttribute('value', data['id']);
                        cansel_button.textContent = 'Отмена';
                        cansel_button.hidden = true;


<!--<                   button type="button" class = "answer_button" value="{{ c.parent.id }}" >Ответить</button>-->
                        var answer_button = document.createElement('button');
                        answer_button.setAttribute('class', 'answer_button');
                        answer_button.setAttribute('type', 'button');
                        answer_button.setAttribute('value', data['id']);
                        answer_button.textContent = 'Ответить';

                        comment.appendChild(answer_div);
                        comment.appendChild(answer_button);
                        comment.appendChild(cansel_button);

<!--                        Для проверки, просмотра комментариев, которые выше 3 уровня, появления кнопки показать комментарии-->
                        if (data['child'] == 'Yes')
                        {

<!--                        <button type="button" class="answer_close_button" value="2" hidden="">Закрыть</button>-->
                                var cansel_button = document.createElement('button');
                                cansel_button.setAttribute('class', 'answer_close_button');
                                cansel_button.setAttribute('type', 'button');
                                cansel_button.setAttribute('value', lvl_comment);
                                cansel_button.textContent = 'Закрыть';
                                cansel_button.hidden = true;


<!--                         <button type="button" class="answer_show_button" value="2">Посмотреть ответы</button>-->

                                var answer_button = document.createElement('button');
                                answer_button.setAttribute('class', 'answer_show_button');
                                answer_button.setAttribute('type', 'button');
                                answer_button.setAttribute('value', lvl_comment);
                                answer_button.setAttribute('name', '');
                                answer_button.textContent = 'Посмотреть ответы';
                                answer_button.hidden = false;

                                comment.append(answer_button);
                                comment.append(cansel_button);

                        }
<!--                         Для првоерки ввода уровня комментария, если вводятся 1 уровень, то проверки есть ли внутри комментарии не нужны-->
                        if (lvl_comment> 1)
                        {
<!--                         Для проверки ответов комментарии, если есть, поверх-->

                            var childs = parent.querySelectorAll(div_name)
                            if (childs.length == 0)
                            {
                                childs = parent.querySelectorAll('div')

                                var br = document.createElement('br');
                                comment.appendChild(br)
                                var br = document.createElement('br');
                                comment.appendChild(br)
                                parent.insertBefore( comment , childs[0])


<!--                          Создаётся ещё кнопка просмотра комментариев для родительского DIV, так как добавили комментарий-->
                                var check_answer_button = parent.querySelectorAll('button.answer_show_button');
                                if (check_answer_button.length == 0)
                                {
<!--                        <button type="button" class="answer_close_button" value="2" hidden="">Закрыть</button>-->
                                var cansel_button = document.createElement('button');
                                cansel_button.setAttribute('class', 'answer_close_button');
                                cansel_button.setAttribute('type', 'button');
                                cansel_button.setAttribute('value', lvl_comment);
                                cansel_button.textContent = 'Закрыть';
                                cansel_button.hidden = false;


<!--                         <button type="button" class="answer_show_button" value="2">Посмотреть ответы</button>-->

                                    var answer_button = document.createElement('button');
                                    answer_button.setAttribute('class', 'answer_show_button');
                                    answer_button.setAttribute('type', 'button');
                                    answer_button.setAttribute('value', lvl_comment);
                                    answer_button.setAttribute('name', 'created');
                                    answer_button.textContent = 'Посмотреть ответы';
                                    answer_button.hidden = true;
                                    childs = parent.querySelectorAll('br')
                                    parent.insertBefore( cansel_button ,childs[childs.length - 2])
                                    parent.insertBefore( answer_button ,childs[childs.length - 2])
                                }
                            }
                            else
                            {
                                parent.insertBefore( comment , childs[0])
                                var br = document.createElement('br');
                                comment.appendChild(br)
                                var br = document.createElement('br');
                                comment.appendChild(br)



                            }
                            var answer_name = 'div#answer'.concat(String(parent.getAttribute('value')));
                            var forms  = parent.querySelectorAll('form');
                            var form = forms[forms.length - 1];
                            var ageElems = form.elements.name;
                            var tageElems = form.elements.text;
                            (ageElems.value = '');
                            (tageElems.value = '');

                            var cancel_button = document.getElementsByClassName('cansel_button');

                            for (var i = 0; i < cancel_button.length; i++)
                            {
                                if (cancel_button[i].hidden == false)
                                {
                                    (cancel_button[i].click());
                                }
                            }
                        }
                        else
                        {
                            var article_div = document.querySelector("div.comments");
                            if (article_div.children.length > 10)
                            {
                                article_div.removeChild( article_div.lastElementChild)
                            }

                            var br = document.createElement('br');
                            comment.appendChild(br)
                            var br = document.createElement('br');
                            comment.appendChild(br)
                            article_div.insertBefore( comment , article_div.firstElementChild)
                            document.getElementById("add_text_comment_1").value = "";
                            document.getElementById("add_name_comment_1").value = "";

                        }

                    }
                    else
                    {
                        console.log('Что пошло не так!');
                    }
                }



    document.addEventListener
    ( "click", function ( el )
        {

            if ( el.target && el.target.classList.contains( 'answer_show_button' ) )
            {
                el.target.hidden = true;


                var parent = el.target.parentNode;

                name_div ='div.comment_'.concat(el.target.value.toString())
                var child = parent.querySelectorAll(name_div);
                for (var ch = 0; ch < child.length; ch++ )
                {
                    child[ch].style.position = 'relative';
                    child[ch].style.left = '20px';
                    child[ch].hidden = false;

                }


<!--               Кнопка отмены просмотра комментария, класс назвывается answer_close_button последний -->

                var child = parent.querySelectorAll('button.answer_close_button');
                child[child.length - 1].hidden = false;

                check_have_child(el);

            }
            if ( el.target && el.target.classList.contains( 'answer_close_button' ) )
            {
<!--                el.target.hidden = true;-->

                var parent = el.target.parentNode;

                var child = parent.querySelectorAll('button.answer_show_button');
                var child_1 = parent.querySelectorAll('button.answer_close_button');

                for (var ch = 0; ch < child.length; ch++ )
                {
                    child[ch].hidden = false;
                    child_1[ch].hidden =true;
                }


                child = parent.getElementsByTagName('div');
                for (var ch in child)
                {
                    child[ch].hidden = true;
                }


                var cansel_button = parent.getElementsByClassName('cansel_button');

                for (var i = 0; i < cansel_button.length; i++)
                {
                    if (cansel_button[i].hidden == false)
                    {
                        (cansel_button[i].click());
                    }
                }

<!--                cansel_button-->
            }
            else if ( el.target && el.target.classList.contains( 'answer_button' ) )
            {

                tmp_text = 'answer'.concat(el.target.value.toString());

<!--                Форма ввода комментария, назвывается ансвер + id-->
                document.getElementById(tmp_text).hidden = false;

                var answer_button = document.getElementsByClassName('answer_button');
                var cansel_button = document.getElementsByClassName('cansel_button');



                for (var i = 0; i < answer_button.length; i++)
                {
                   answer_button[i].hidden = true;
                   if (el.target == answer_button[i])
                   {
                        cansel_button[i].hidden = false;
                   }
                }

                document.getElementById("add_comment").hidden = true;

            }
            else if (el.target && el.target.classList.contains( 'cansel_button' ))
            {

                tmp_text = 'answer'.concat(el.target.value.toString());
                document.getElementById(tmp_text).hidden = true;

                var answer_button = document.getElementsByClassName('answer_button');
                var cansel_button = document.getElementsByClassName('cansel_button');

                for (var i = 0; i < answer_button.length; i++)
                {
                   answer_button[i].hidden = false;
                   cansel_button[i].hidden = true;
                }
                document.getElementById("add_comment").hidden = false;
            }
        }
    )


