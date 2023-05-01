"use strict"
// Глобальні змінні 
var FlagStart = false;
var parentElement = null;
var pw = 0;
var ph = 0;
var pmax = 0;
var pmin = 0;
var scene = null;
var person = null;
var thing = null;
var tasksblocks = null;

var wagons = null;
var arrWagons = [];
var animationIdWagonAnimate = null;

let randomLeft = 0;
let randomTop = 0;
let numtask = 0;

// Додаткові функції ---------------------------------- 
// ==================================================================
// -----------------------------------------------------------------------
function isEven(number) { return number % 2 === 0;}
// ----------------------------------------------------------------------
function MyRandomNumber() {return Math.floor(Math.random() * 1000);};
// ------------------------------------------------------------------------
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

// ************************************** ПОЧАТОК ВЕРСІЇ №3 ******************************************************
function StartAnimationTravel(address){
  if(FlagStart){

    fetch(`${address}/goals.json`)
    .then(response => response.json())
    .then(data => {
      // Розшифровуємо дані з файлу та зберігаємо в змінну
      arrWagons  = JSON.parse(JSON.stringify(data));

      parentElement = null;
      pw = 0;
      ph = 0;
      pmax = 0;
      pmin = 0;
      scene = null;
      person = null;
      thing = null;
      tasksblocks = null;
            
      wagons = null;
      animationIdWagonAnimate = null;
            
      randomLeft = 0;
      randomTop = 0;
      numtask = 0;


      InitObjects();
    })
    .catch(error => console.error(error));
  }  
}
// ---------------------------------------------------------------------
function InitObjects(){
  if(FlagStart){

    parentElement = document.querySelector('.parentblock');
    parentElement.style.padding = 0;
    parentElement.style.boxSizing = `border-box`;
    parentElement.style.overflow = 'hidden';
    parentElement.style.backgroundColor = 'black';

    pw = parentElement.offsetWidth;
    ph = parentElement.offsetHeight;
    pmax = (pw>=ph)?pw:ph;
    pmin = (pw<=ph)?pw:ph;
  
    SceneMake();

    PersonPaint('items/standingperson.png','visible');
    //PersonPaint('anime/kydok2.gif','visible');
  
    ThingPaint('items/papkaG.png','hidden');
    TasksBlocks();
    setTimeout(() => {
      TaskMove();
    }, 1000);
  }

}
// ---------------------------------------------------------------
// Створення і відображення сцени та персони з предметом
function SceneMake(){
  if(FlagStart){

    //  cancelAnimationFrame(animationIdWagonAnimate);
      parentElement.innerHTML = '';
      scene = document.createElement('div');
      scene.id = 'scene_animationtravel';
      scene.style.position= 'relative';
      scene.style.width = '100%';
      scene.style.height = '100%';
      //scene.style.backgroundColor = `rgb(47, 107, 92)`;
      scene.style.overflow = 'hidden';
      //scene.style.border = '1px solid red';
      /*
      scene.style.background = `
      linear-gradient(to bottom, rgba(30, 150, 255, 1) 0%, 
      rgba(175, 238, 238, 1) 20%, 
      rgba(155, 200, 200, 1) 25%, 
      rgba(220, 220, 220, 0.4) 60%, 
      rgba(128, 128, 128, 0.4) 100%)`;
      */
    
      scene.style.background = `
      linear-gradient(to bottom, 
      rgba(180, 210, 240, 1) 0%, 
      rgba(150, 150, 150, 0.9) 100%)`;
      
      parentElement.appendChild(scene);
    }  

  }
// --------------------------------------------------------------------------------

// Промальовка персони
function PersonPaint(fotka, pokaz){
  if(FlagStart){

    //Створення персони  
    person = document.createElement('div');
    person.id = `person_animationtravel`;
    scene.appendChild(person);
    person = document.getElementById('person_animationtravel');

    //let personLeft = 45;
    let personBottom = '0';
    let personWidth = 20;
    let personHeight = 18.2;
    //let personBgColor = 'orange';

    person.style.position = 'absolute';

    //person.style.left = personLeft*(pw * 0.01)+'px';


    //person.style.bottom = personBottom*(ph * 0.015)+'px';
    person.style.bottom = `${personBottom}px`;

    person.style.width = personWidth*(pmin * 0.025)+'px';
    person.style.height = personHeight*(pmin * 0.025)+'px';

    person.style.left = (scene.offsetWidth / 2) - (person.offsetWidth / 2) + 'px';


    //person.style.backgroundColor = personBgColor;
  //  person.style.backgroundImage = `url('./img/kydok1.gif')`;
    person.style.backgroundImage = `url('./img/${fotka}')`;

    person.style.backgroundSize = `cover`;
    person.style.backgroundRepeat = `no-repeat`;
    person.style.backgroundPosition = `bottom`;

    //person.style.border = `1px solid red`;

    person.style.visibility = pokaz;
  }  
}

// Промальовка предмета
function ThingPaint(fotka, pokaz){
  if(FlagStart){

    //Створення предмету
    thing = document.createElement('div');
    thing.id = `thing_animationtravel`;
    scene.appendChild(thing);
    thing = document.getElementById('thing_animationtravel');

    let thingWidth = 5;
    let thingHeight = 4;

    thing.style.position = 'absolute';
    thing.style.display = `flex`;

    //let thingLeft = person.offsetLeft + person.offsetWidth;
    //let thingLeft = person.offsetLeft;

    let thingLeft = person.offsetLeft + person.offsetWidth / 4;
    thing.style.left = thingLeft + 'px';
    thing.style.width = thingWidth*(pmin * 0.025)+'px';
    thing.style.height = thingHeight*(pmin * 0.025)+'px';

    thing.style.transition = "left 1.0s ease-out, top 1.0s ease-out, transform 1.0s ease-in-out";
    //thing.style.transition = "all 0.5s ease-out";

    //thing.style.transform = `scale(${0.5}) rotateZ(360deg)`;

    thing.style.transform = `scale(${0.5})`;

    thing.style.backgroundSize = `cover`;
    thing.style.backgroundRepeat = `no-repeat`;
    thing.style.backgroundPosition = `center`;

    //thing.style.border = '1px solid red';

    let thingTop = person.offsetTop - thing.offsetHeight;
    //let thingTop = person.offsetTop - thing.offsetWidth;
    thing.style.top = thingTop + 'px';


    //thing.style.backgroundColor = thingBgColor;
    thing.style.zIndex = `10`;

    thing.style.backgroundImage = `url('./img/${fotka}')`;

    thing.style.visibility = pokaz;
  }  
}

//Створення блоків завдань
function TasksBlocks(){
  if(FlagStart){

    arrWagons.forEach((tb, index)=>{
      tb = document.createElement('div');
      tb.classList.add('tasksblocks_animationtravel');
      scene.appendChild(tb);

      tb.style.position = 'absolute';
      tb.style.display = `flex`;
      tb.style.justifyContent = 'center';
      tb.style.alignItems =  'center';

      //tb.style.left = 100*(pmin * 0.018)+'px';
      //tb.style.top = 1*(pmin * 0.01)+'px';
      tb.style.left = '100%';
      tb.style.top = '0px';

      tb.style.minWidth = 20*(pmin * 0.01)+'px';
      tb.style.minHeight = 10*(pmin * 0.01)+'px';

      tb.style.transform = `scale(${0.1})`;

      tb.style.fontSize = `${0.015*pmax}px`;

      tb.style.backgroundColor = 'white';

  //    tb.style.transition = "all 1.5s ease-in-out";
      tb.style.transition = "left 1.0s ease-in-out, transform 1.0s ease-in-out";

      tb.style.border = '1px solid red';
      tb.style.borderRadius = '5%';

      tb.innerHTML = arrWagons[index].content;


    });  

    tasksblocks = document.querySelectorAll(`.tasksblocks_animationtravel`);
  }  
} 


function TaskMove(){
  if(FlagStart && numtask < tasksblocks.length){
  
      tasksblocks[numtask].style.visibility = 'visible';
      // tasksblocks[0].style.transform = `translate3d(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px, 0) rotate(${Math.random() * 360}deg)`;
      // tasksblocks[0].style.transition = "";
      // tasksblocks[0].style.transition = "all 1.5s ease-in-out";
      tasksblocks[numtask].style.transform = `scale(${1})`;
      randomLeft = getRandomNumber(scene.offsetLeft, scene.offsetWidth - tasksblocks[numtask].offsetWidth);
      randomTop = getRandomNumber(scene.offsetTop, scene.offsetTop + scene.offsetHeight / 3);
      tasksblocks[numtask].style.left = `${randomLeft}px`;
      tasksblocks[numtask].style.top = `${randomTop}px`;

      //tasksblocks[0].style.backgroundColor = 'cyan';
      tasksblocks[numtask].style.backgroundColor = 'white';

      setTimeout(() => {
        PersonChange(`anime/kydok2.gif`);
      }, getRandomNumber(10, 1000));//Можна змінювати
      
  }
};

function PersonChange(fotka){
  if(FlagStart){
    person.style.backgroundImage = `url('./img/${fotka}?${MyRandomNumber()}')`;
    //person.style.backgroundImage = `url('./img/${fotka}?${MyRandomNumber}')`;
    // Кидок предмета у ціль
    setTimeout(() => {
      TaskUdar();
    }, 1500); //Не можна змінювати
  }  
};

function TaskUdar(){
  if(FlagStart){
    thing.style.visibility = `visible`;
    thing.style.transform = `scale(${1}) rotateZ(360deg)`;

    thing.style.left = `${randomLeft}px`;
    thing.style.top = `${randomTop}px`;
    setTimeout(() => {
      thing.style.left = person.offsetLeft + person.offsetWidth / 4 +'px';    
      thing.style.top = person.offsetTop - thing.offsetHeight +'px';    
      thing.style.visibility = 'hidden';
      thing.style.transform = `scale(${0.5}) rotateZ(-360deg)`;

      setTimeout(() => {
        TaskRemove();
      }, 10 /*getRandomNumber(10, 2000)*/); //Можна змінювати
    }, 750); //Можна 750, але не треба змінювати
  }  
}  

// -------------------------------------------------------------------------------------
function TaskRemove(){
  if(FlagStart){

    tasksblocks[numtask].style.backgroundColor = 'gray';

    tasksblocks[numtask].style.transform = `scale(${0})`;
    //tasksblocks[0].style.left = scene.offsetWidth / 2 + 'px';
    tasksblocks[numtask].style.left = scene.offsetLeft + 'px';
    setTimeout(() => {
      tasksblocks[numtask].style.visibility = 'hidden';
      tasksblocks[numtask].style.left = 90*(pmin * 0.018)+'px';
      tasksblocks[numtask].style.top = 1*(pmin * 0.01)+'px';
      setTimeout(() => {
        numtask++
        if(isEven(numtask)){
          thing.style.backgroundImage = `url('./img/items/papkaG.png')`;
        } else {
          thing.style.backgroundImage = `url('./img/items/paperG.png')`;
        }
        if(numtask == tasksblocks.length-1){
          thing.style.backgroundImage = `url('./img/items/bootleG.png')`;
        }

        TaskMove();
      }, getRandomNumber(1000, 2000)); //Можна змінювати діапазон від 1000 вверх
    }, 1000); // Не можна змінювати
  }  
}
// ************************************** КІНЕЦЬ ВЕРСІЇ №3 ******************************************************
