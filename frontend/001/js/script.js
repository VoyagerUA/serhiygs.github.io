/*
The MIT License (MIT)

Copyright © 2023 Serhiy Shevchuk poetsofweb@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/* VER 23.01.2023 23.38 */
"use strict";
function AnimeProc(param1, param2, param3){
    
    if (param1<param2){
        let STO = setTimeout(()=>{
          param1++;
          //param1=param1+1;

          grafik_text.innerHTML=param1+'%';
          document.documentElement.style.setProperty('--zsuv',param1+'%');
          let povorot=param1<10?'0.0'+param1+'turn':'0.'+param1+'turn';
          document.documentElement.style.setProperty('--povorot',povorot);
          AnimeProc(param1,param2, param3);
          clearTimeout(STO);
       },param3);
    }
 }
// ---------------------------------------------------------------------------------------------------
function HovkaPokaz(elem,stan){

console.log(`1.elem.style.opacity=${elem.style.opacity}`);

    if(stan == 1){

        if(elem.dataset.pokaz < 1){
//        if(elem.style.opacity < 1){
          
            let STO = setTimeout(()=>{
                elem.dataset.pokaz += 0.1;
                elem.style.opacity = elem.dataset.pokaz;

                console.log(`2.elem.style.opacity=${elem.style.opacity}`);

                //HovkaPokaz(elem,stan);
                clearTimeout(STO);
            }, 1000);
        }

    } else {

    }
}
// -----------------------------------------------------------------------------------------------
function VisibleTag(target) {
  // Все позиции элемента
  var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    // Если элемент полностью видно, то запускаем следующий код
    //console.clear();

    //console.log(`Show: ${target.id}`);
    target.style.opacity = 1;
    //alert(target.style.opacity);
    //    HovkaPokaz(target,1);


  } else {
    // Если элемент не видно, то запускаем этот код
    //console.clear();
    //console.log(`Hide: ${target.id}`);
    target.style.opacity = 0;

    //target.style.opacity = 0.5;

  };
};
// ---------------------------------------------------------------------------------------------------


window.onload=function(){
    
    //    id_main.style.top = id_header.offsetTop + id_header.offsetHeight + 'px';
    document.querySelectorAll('.class_menu').forEach(element => {
        let klac = false;

        element.addEventListener( 'mouseover', function(){
            element.style.fontWeight='bolder';
            element.style.color='maroon';
        }, false);


        element.addEventListener( 'mouseout', function(){
            if(klac === false){
                element.style.color = 'black';
                element.style.fontWeight = 'normal';
            } else {
                element.style.color = 'blue';
                element.style.fontWeight = 'bolder';
            }

        }, false);


        element.addEventListener( 'click', function(){
            document.querySelectorAll('.class_menu').forEach(element => {
                element.style.color = 'black';
                element.style.fontWeight = 'normal';
            });   
            klac = true;                 
            element.style.color = 'blue';
            element.style.fontWeight = 'bolder';
        }, false);

    });
    
    //AnimeProc(0,parseInt(grafik_text.dataset.procent), 75);

    lupa1.onclick = function(){
        lupa1.style.visibility = "hidden";
        d2_2.style.visibility = "visible";
        poshuk.focus();
    }

    lupa2.onclick = function(){
        poshuk.value = '';
        d2_2.style.visibility = "hidden";
        lupa1.style.visibility = "visible";
    }

    //console.log(window.scrollY);    console.log(window.scrollHeight);

    document.querySelectorAll('div').forEach( function(element){
        //console.log(element.offsetTop);
        //element.dataset.pokaz = 0;
element.style.opacity = 0;
VisibleTag(element);
    });

    //sb1c2_3_p1.style.fontSize = sb1c2_3_p1.offsetWidth/10 + "px";

    //console.log(sb1c2_3_p1.offsetWidth);    console.log(sb1c2_3_p1.style.fontSize);

    
    /*
alert(`window.screen.width = ${window.screen.width}
window.screen.availWidth = ${window.screen.availWidth}
window.outerWidth = ${window.outerWidth}
window.innerWidth = ${window.innerWidth}
document.documentElement.scrollWidth = ${document.documentElement.scrollWidth}
`);
    */


}

window.addEventListener('scroll', function(e) {
    document.querySelectorAll('div').forEach((element)=>VisibleTag(element));

    if (window.scrollY) {
        vgoru.style.visibility = 'visible';
    } else {
        vgoru.style.visibility = 'hidden';
    }
        /*
        //    console.log(document.querySelectorAll('div'));
        //    console.log(document.getElementsByTagName('*'));
        //    console.log(window.scrollY);

        //    document.querySelectorAll('div').forEach( function(element){
        //        console.log(element.offsetTop);
        //    });
                //console.log(element.offsetTop);
                //let el = document.querySelector('#id_footer');
            
                //VisibleTag(document.querySelector('#block_content3'));
        ------------------------------------------------
            distance += Math.abs($(window).scrollTop() - prevPos);
            if(distance >= 1000){
            console.log('bingo');
            }
            prevPos = $(window).scrollTop();
        */    
});





id_footer.onclick=function(){
    if (window.scrollY) {
        window.scroll(0, 0);  // reset the scroll position to the top left of the document.
    }
}


sb1c2_3_span1.onclick = function(params) {
    sb1c2_3_p1.style.opacity = 0;
    sb1c2_3_p1.style.transition = "opacity 0.33s ease-out";

    sb1c2_3_span1.style.backgroundColor = 'blue';
    sb1c2_3_span2.style.backgroundColor = 'grey';


    setTimeout(() => {
        sb1c2_3_p1.innerHTML = "Lorem ipsum dol<br>sit amet, consec adipiscing.";
        sb1c2_3_p1.style.opacity = 1;
    }, 660);


}
sb1c2_3_span2.onclick = function(params) {

    sb1c2_3_p1.style.opacity = 0;
    sb1c2_3_p1.style.transition = "opacity 0.33s ease-out";

    sb1c2_3_span2.style.backgroundColor = 'blue';
    sb1c2_3_span1.style.backgroundColor = 'grey';


    setTimeout(() => {
        sb1c2_3_p1.innerHTML = "This is another content here";
        sb1c2_3_p1.style.opacity = 1;
    }, 660);
}


bc1_1_p1.onclick=function(){
    alert(`bc1_1_p1.style.fontSize=${bc1_1_p1.style.fontSize}`);
}



                    //    AnimeProc(0,parseInt(grafik_text.dataset.procent));


                        //fon.style.visibility = "hidden";

                        //block_content2.style.visibility = 'hidden';
                        //block_content3.style.visibility = 'hidden';
                        //block_content4.style.visibility = 'hidden';
                        //block_content5.style.visibility = 'hidden';
                        //block_content6.style.visibility = 'hidden';
                        //id_footer.style.visibility = 'hidden';

                        /*

                        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        //const scrollDemo = document.querySelector("#container");
                        const scrollDemo = document.querySelector("#id_body");
                        
                        scrollDemo.addEventListener("scroll", event => {
                            console.log(`scrollTop: ${scrollDemo.scrollTop} <br>
                                                scrollLeft: ${scrollDemo.scrollLeft} `);
                        }, { passive: true });
                        
                    */
