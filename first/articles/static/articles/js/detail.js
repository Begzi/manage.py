
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

