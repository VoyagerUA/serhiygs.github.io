"use strict"
// Глобальні змінні 
var FlagStart = false;
var parentElement;
var pw;
var ph;
var pmax;
var pmin;
var scene;
var rail;
var person;
var thing;
var wagons;
var arrWagons = [];
var animationIdWagonAnimate;


// Додаткові функції ---------------------------------- 
// ==================================================================
function getRandomNumber(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
// ---------------------------------------------------------------
function arrOval(startX, startY, radiusX, radiusY, vector, speed){
  let arrPoints = [];
  if(vector == 1){
    //let center = {x: startX + radiusX, y: startY - radiusY};
    let center = {x: startX + radiusX, y: startY};
    for (let a = 0; a <= Math.PI; a += speed * 0.01) {
      let x = center.x - Math.cos(a) * radiusX;
      let y = center.y - Math.sin(a) * radiusY;
      arrPoints.push({X: x, Y: y});
    }
  } else if(vector == 0){
    //let center = {x: startX - radiusX, y: startY - radiusY};
    let center = {x: startX - radiusX, y: startY};
    for (let a = 0; a <= Math.PI; a += speed * 0.01) {
      let x = center.x + Math.cos(a) * radiusX;
      let y = center.y - Math.sin(a) * radiusY;
      arrPoints.push({X: x, Y: y});
    }
  }
  return arrPoints;
}
// ===================================================================================
// -----------------------------------

let idSI = setInterval(() => {
  if(arrWagons.length > 0 ){
    console.log(arrWagons);
    clearInterval(idSI);
  }
}, 1000);


// ---------------------------------------------------------------------------

// ---------------------------------------------------------
// Перший кидок  
function StartAnimationTravel(){
  //  setTimeout(() => {
  FlagStart = true;
  parentElement = document.querySelector('.parentblock');
  parentElement.style.padding = 0;
  parentElement.style.boxSizing = `border-box`;
  parentElement.style.overflow = 'hidden';
  parentElement.style.backgroundColor = 'black';

  pw = parentElement.offsetWidth;
  ph = parentElement.offsetHeight;
  pmax = (pw>=ph)?pw:ph;
  pmin = (pw<=ph)?pw:ph;
  
//  person = document.getElementById('person_animationtravel');
//  thing = document.getElementById('thing_animationtravel');
  
  SceneMake();
  RailMake();
  WagonsPaint();

//  PersonPaint('Walking.gif','visible');

  setTimeout(() => {
    PersonPaint('kydok1_old.gif','visible');
    //PersonPaint('kydok1.gif','visible');
    InitThing();

  }, 1000);


      //thing.style.visibility = 'visible';  ThingAnimate();
      //person.style.visibility = 'visible';
      //DownloadWagons();
  
      //ScenePaint();
      //WagonsPaint();
  
  
    //  PersonPaint('kydok1.gif','visible');
  
    //  InitThing();
    //  WagonAnimate();
  //  }, 1000);
}

// ------------------------------------------------

// Створення і відображення сцени
function SceneMake(){

  cancelAnimationFrame(animationIdWagonAnimate);
  
  parentElement.innerHTML = '';
  scene = document.createElement('div');
  scene.id = 'scene_animationtravel';
  scene.style.position= 'relative';
  scene.style.width = '100%';
  scene.style.height = '100%';
  //scene.style.backgroundColor = `rgb(47, 107, 92)`;
  scene.style.overflow = 'hidden';
  //scene.style.border = '1px solid red';
  scene.style.background = `
  linear-gradient(to bottom, rgba(30, 150, 255, 1) 0%, 
  rgba(175, 238, 238, 1) 20%, 
  rgba(155, 200, 200, 1) 25%, 
  rgba(220, 220, 220, 0.4) 60%, 
  rgba(128, 128, 128, 0.4) 100%)`;
  parentElement.appendChild(scene);

  person = document.createElement('div');
  person.id = `person_animationtravel`;
  scene.appendChild(person);
  person = document.getElementById('person_animationtravel');


  thing = document.createElement('div');
  thing.id = `thing_animationtravel`;
  scene.appendChild(thing);

  thing = document.getElementById('thing_animationtravel');

  


}
// ------------------------------------------------

function RailMake(){
  rail = document.createElement('div');
  rail.style.position = `absolute`;
  rail.style.top = `40%`;
  rail.style.width = `${1*pw}px`;
  rail.style.height = `${0.013*pmax}px`;
  //rail.style.border = `1px solid red`;

  rail.style.backgroundImage = `url('./img/items/rail.png')`;

  rail.style.backgroundSize = `contain`;
  rail.style.backgroundRepeat = `no-repeat`;
  rail.style.backgroundPosition = `top`;

  scene.appendChild(rail);

}


// Промальовка вагонів
function WagonsPaint(){

  fetch('https://serhiygs.github.io/frontend/002/wagons.txt')
  .then(response => response.json())
  .then(data => {
    /*
        console.log(data);
        var dataArr = [];
        for (var i = 0; i < 10; i++){
          dataArr.push({
            num: i,
            content: `Wagon # ${i}`
          });
        }  
        console.log(dataArr);
        let jsDataArr = JSON.stringify(dataArr);
        console.log(jsDataArr);
    */
    // Розшифровуємо дані з файлу та зберігаємо в змінну
    arrWagons  = JSON.parse(JSON.stringify(data));


    // Далі можна використовувати масив records з отриманими записами даних
    //console.log(records);
    //return records;

    // ------------------------------------------------------------------------------------
    // Знищення існуючого потяга і створення нового з вагонами отриманими із файла з сервера.
    let wag = document.querySelectorAll('.wagons_animationtravel');  
    if (wag.length > 0) {
      wag.forEach((w)=>{
        w.remove();
      });
    }

    // Cтворення паротяга
    let kabina = document.createElement('div');
    kabina.id = `kabina_animationtravel`;
    kabina.style.position = `absolute`;
    kabina.classList.add('wagons_animationtravel');
    kabina.style.backgroundColor = `transparent`;
    kabina.style.backgroundImage = `url('./img/items/parotag.png')`;
    kabina.style.backgroundSize = `contain`;
    kabina.style.backgroundRepeat = `no-repeat`;
    kabina.style.backgroundPosition = `bottom`;
    kabina.dataset.touched = `parotiag`;
    //kabina.style.border = `1px solid red`;

    kabina.style.left = `${100}%`;
    kabina.style.top = `${rail.offsetTop - 0.075*pmax}px`;
    kabina.style.width = `${0.13*pmax}px`;
    kabina.style.height = `${0.075*pmax}px`;
    scene.appendChild(kabina);


    arrWagons.forEach((zapys)=>{
      let vagon = document.createElement('div');
      vagon.classList.add('wagons_animationtravel');
      vagon.innerHTML+=`<p class='zapys_content'>${zapys.content}</p>`;
      scene.appendChild(vagon);
    });


    wagons = document.querySelectorAll('.wagons_animationtravel');  
    for (let i = 0; i < wagons.length; i++) {
      if(i>0){
        wagons[i].dataset.touched = `0`;
        wagons[i].style.position = `absolute`;

        wagons[i].style.padding = `${0.012*pmax}px`;

        wagons[i].style.display = 'flex';

        //wagons[i].style.justifyItems = 'center';
        //wagons[i].style.justifyContent = 'center';
        //wagons[i].style.alignContent = 'stretch';
        //wagons[i].style.alignItems = 'center';


        /*wagons[i].style.border = `1px solid orange`;*/

        wagons[i].style.fontSize = `${0.015*pmax}px`;
        wagons[i].style.color = `white`;

        
        wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.0*pw}px`;

        wagons[i].style.backgroundImage = `url('./img/items/wagon_mid.png')`;

        //if(i==1) wagons[i].style.backgroundImage = `url('./img/items/wagon_first.png')`;
        if(i==wagons.length-1) wagons[i].style.backgroundImage = `url('./img/items/wagon_last.png')`;


        wagons[i].style.backgroundSize = `contain`;
        wagons[i].style.backgroundRepeat = `no-repeat`;
        wagons[i].style.backgroundPosition = `bottom`;
        //wagons[i].style.backgroundColor = `blue`;
        wagons[i].style.top = `${rail.offsetTop - 0.075*pmax}px`;
        wagons[i].style.width = `${0.13*pmax}px`;
        wagons[i].style.height = `${0.075*pmax}px`;
      }      
    }

    cancelAnimationFrame(animationIdWagonAnimate);

    WagonAnimate();

    // -------------------------------------------------------------------------------------

  })
  .catch(error => console.error(error));




/*
    vagon.style.position = `absolute`;
    vagon.style.color = `white`;
    vagon.style.fontSize = `${0.013*pmax}px`;
    vagon.dataset.touched = `0`;
    vagon.style.display = 'flex';
    vagon.style.justifyContent = 'center';
    vagon.style.alignItems = 'center';

*/

/*

  //wagons = document.querySelectorAll('.wagons_animationtravel');  
  
  for (let i = 0; i < wagons.length; i++) {
    wagons[i].style.position = `absolute`;
    wagons[i].style.color = `white`;
    wagons[i].dataset.touched = `0`;
    wagons[i].style.display = 'flex';
    wagons[i].style.justifyContent = 'center';
    wagons[i].style.alignItems = 'center';
    if(i==0){
      wagons[i].style.backgroundColor = `transparent`;
      wagons[i].style.backgroundImage = `url('./img/items/parotag.png')`;
      wagons[i].style.backgroundSize = `contain`;
      wagons[i].style.backgroundRepeat = `no-repeat`;
      wagons[i].style.backgroundPosition = `bottom`;
      wagons[i].style.left = `${100}%`;
      wagons[i].dataset.touched = `parotiag`;
    } else {
      wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.0*pw}px`;
      wagons[i].style.backgroundImage = `url('./img/items/wagon.png')`;
      wagons[i].style.backgroundSize = `contain`;
      wagons[i].style.backgroundRepeat = `no-repeat`;
      wagons[i].style.backgroundPosition = `bottom`;
      wagons[i].style.backgroundColor = `blue`;
    }
    wagons[i].style.top = `20%`;
    wagons[i].style.width = `${0.13*pmax}px`;
    wagons[i].style.height = `${0.075*pmax}px`;
  }
*/
}

// ------------------------------------------------

// Промальовка персони
function PersonPaint(fotka, pokaz){
  let personLeft = 45;
  let personBottom = '0';
  let personWidth = 15;
  let personHeight = 20;
  //let personBgColor = 'orange';

  person.style.position = 'absolute';
  person.style.left = personLeft*(pw * 0.01)+'px';
  //person.style.bottom = personBottom*(ph * 0.015)+'px';
  person.style.bottom = `${personBottom}px`;

  person.style.width = personWidth*(pmin * 0.015)+'px';
  person.style.height = personHeight*(pmin * 0.015)+'px';

  //person.style.backgroundColor = personBgColor;
//  person.style.backgroundImage = `url('./img/kydok1.gif')`;
  person.style.backgroundImage = `url('./img/anime/${fotka}')`;

  person.style.backgroundSize = `cover`;
  person.style.backgroundRepeat = `no-repeat`;
  person.style.backgroundPosition = `bottom`;

  //person.style.border = `1px solid red`

  person.style.visibility = pokaz;
}

// --------------------------------------------------
let nowagon = 0;
// Промальовка предмета
function InitThing(){

  let thingWidth = 50;
  let thingHeight = 50;
  let thingBgColor = 'red';

  thing.style.position = 'absolute';
  thing.style.display = `flex`;

  //let thingLeft = person.offsetLeft + person.offsetWidth;
  let thingLeft = person.offsetLeft;

  thing.style.left = thingLeft + 'px';

  thing.style.width = thingWidth*(pmin * 0.00215)+'px';
  thing.style.height = thingHeight*(pmin * 0.00215)+'px';

  //thing.style.transform = `scale(${0.1})`;


  
  thing.style.backgroundSize = `cover`;
  thing.style.backgroundRepeat = `no-repeat`;
  thing.style.backgroundPosition = `center`;

  //thing.style.border = '1px solid red';



  let thingTop = person.offsetTop - thing.offsetHeight;
  thing.style.top = thingTop + 'px';


  //thing.style.backgroundColor = thingBgColor;
  thing.style.zIndex = `10`;

  // --------------------------------------------------
  let startX = thing.offsetLeft;
  let startY = thing.offsetTop;

  let radiusX = getRandomNumber(scene.offsetWidth * 0.05, scene.offsetWidth * 0.3);

  let radiusY = person.offsetTop - thing.offsetHeight;
  let vector = getRandomNumber(0, 1);
  
  let kartinka = (vector == 1)?'Paper.gif':'Papka.gif';

  thing.style.backgroundImage = `url('./img/anime/${kartinka}')`;
  //thing.style.backgroundImage = `url('./img/anime/Papka.gif')`;


  //let speed =  getRandomNumber(1.8, 1.8);
  let speed =  2;

  let points = arrOval(startX, startY, radiusX, radiusY, vector, speed);
  let overlap;
  let scalelevel = 0;
  let stepanime = 0;

  thing.style.visibility = 'hidden';

  // Політ предмета
  function ThingAnimate(){
      if(stepanime < points.length){

        thing.style.left = points[stepanime].X+'px';
        thing.style.top = points[stepanime].Y+'px';
        stepanime++
        // ------------------------------
        if(Math.floor(points.length / stepanime) >= 2){
          scalelevel = (points.length - stepanime) * 0.01;
          thing.style.transform = `scale(${scalelevel})`;
        }
        // ---------------------------------
        wagons.forEach((wagon, index)=>{
          let rectWagon = wagon.getBoundingClientRect();
          let rectThing = thing.getBoundingClientRect();
          // Доторкання до вагона
          overlap = !(rectThing.right < rectWagon.left || 
                      rectThing.left > rectWagon.right || 
                      rectThing.bottom < rectWagon.top || 
                      rectThing.top > rectWagon.bottom);
          if(overlap){

            if(scalelevel <= 1){//Предмет вверху екрана. Початок перевірки дотику предмета до вагона.
              FlagStart = false;
              thing.style.display = `none`; //wagon.style.display = `none`;

              if(wagon.dataset.touched == `0`) {
                nowagon++;
                wagon.dataset.touched = `1`;
                //wagon.style.backgroundColor = `white`;
                wagon.style.color = 'red';
                wagon.querySelector('p').innerHTML = 'ЗАДОВОЛЕНО';
              }  

              messages.innerHTML = `Name: ${wagon.innerText} nowagon= ${nowagon} wagons.length=${wagons.length}<br>`;
              
              //Усі вагони помічені
              if(nowagon == wagons.length-1){
                messages.innerHTML += `FINISH: Name: ${wagon.innerText} nowagon= ${nowagon} wagons.length=${wagons.length}<br>`;
                messages.innerHTML = ``;

                nowagon = 0;
                // Повторна промальовка вагонів зі встановленням синього кольору
                for (let i = 0; i < wagons.length; i++) {
                  if(i==0){
                    wagons[i].style.backgroundColor = `transparent`;
                    wagons[i].style.backgroundImage = `url('./img/items/parotag.png')`;
                    wagons[i].style.backgroundSize = `contain`;
                    wagons[i].style.backgroundRepeat = `no-repeat`;
                    wagons[i].style.backgroundPosition = `bottom`;
                    wagons[i].style.left = `100%`;
                  } else {
                    wagons[i].dataset.touched = `0`;
                    wagons[i].style.backgroundColor = `blue`;
                    wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.0*pw}px`;
                    wagons[i].style.backgroundPosition = `bottom`;
                  }
                }
              } 

              // Предмет торкнувся вагона. Перемальовка предмета.          
              setTimeout(() => {
                thing.style.display = `flex`;
                FlagStart = true;
                InitThing();
              }, 1000);
              

            }
          }            
        });

        //-------------------------------
        if (FlagStart) {
          requestAnimationFrame(ThingAnimate);
        }  
      } else {

        stepanime = 0;
        InitThing();
        FlagStart = false;


        setTimeout(() => { // Очікування поки персонаж вибере інший предмет і кине його
          //messages.innerHTML += `Name: ${wagon.innerText} nowagon= ${nowagon} wagons.length=${wagons.length}<br>`;
          FlagStart = true;
          InitThing();
        }, 1000);

      }
  }

  thing.style.visibility = 'visible';  
  ThingAnimate();

  /*
  // Перший кидок  
  setTimeout(() => {
    thing.style.visibility = 'visible';  
    ThingAnimate();
  }, 2000);
  */

}

function WagonAnimate(){
  wagons.forEach((wagon)=>{//Зсув потяга вліво
    wagon.style.left = wagon.offsetLeft - (pw * 0.0015) + 'px';
  });
 
  if( (wagons[wagons.length - 1].offsetLeft + wagons[wagons.length - 1].offsetWidth) <= 0){//Коли потяг сховався вліво
    // Повторна промальовка вагонів
    WagonsPaint();
    /*
    for (let i = 0; i < wagons.length; i++) {
      if(i==0){
        wagons[i].style.backgroundColor = `transparent`;
        wagons[i].style.backgroundImage = `url('./img/items/parotag.png')`;
        wagons[i].style.backgroundSize = `contain`;
        wagons[i].style.backgroundRepeat = `no-repeat`;
        wagons[i].style.backgroundPosition = `bottom`;
        wagons[i].style.left = `100%`;
      } else {
        wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.000*pw}px`;
        wagons[i].style.backgroundPosition = `bottom`;
      }
    }
    */
  } else {
    animationIdWagonAnimate = requestAnimationFrame(WagonAnimate);
  };
}  




/* ============================================================================================================================ */
class Scena {
    constructor(parentEl){
      this.parentElement=parentEl;

      this.pw=this.parentElement.offsetWidth;
      this.ph=this.parentElement.offsetHeight;
      this.pmax=(this.pw>=this.ph)?this.pmax=this.pw:this.pmax=this.ph;
      this.pmin=(this.pw<=this.ph)?this.pmin=this.pw:this.pmin=this.ph;
      
      /*
      this.element = document.createElement('div');
      this.element.style.width = '100%';
      this.element.style.height = '100%';
      this.element.style.backgroundColor = 'darkslategray';
      this.element.style.border = '1px solid red';
      //this.parentElement.appendChild(this.element);
      */
    }

    createScena(){
      this.scena = document.createElement('div');
      this.scena.id = 'scenaanimationtravel';
      this.scena.style.width = '100%';
      this.scena.style.height = '100%';
      this.scena.style.backgroundColor = 'darkslategray';
      this.scena.style.border = '1px solid red';
      this.parentElement.appendChild(this.scena);
    }

    createPersona(width, height, left, bottom, bgcolor) {
      const persona = document.createElement('div');

      persona.id = 'personaanimationtravel';

      persona.style.position = 'absolute';
      persona.style.width = width*(this.pmin * 0.01)+'px';
      persona.style.height = height*(this.pmin * 0.01)+'px';

      persona.style.left = left*(this.pw * 0.01)+'px';
      persona.style.bottom = bottom*(this.ph * 0.01)+'px';
      persona.style.backgroundColor = bgcolor;

      this.scena.appendChild(persona);

    }


    createBlock(width, height, left, top, color) {

      const block = document.createElement('div');

      block.style.width = width + 'px';
      block.style.height = height + 'px';


      block.style.backgroundColor = color;
      block.style.position = 'absolute';
      block.style.left = left + 'px';
      block.style.top = top + 'px';
      //this.element.appendChild(block);
    }    


    init(){
      this.createScena();
      this.createPersona(15, 30, 45, 2, 'orange');

      //this.parentElement.appendChild(this.element);
      //this.createBlock(50, 50, 10, 10, 'orange');
    }


}
  
/* ============================================================================================================================ */

