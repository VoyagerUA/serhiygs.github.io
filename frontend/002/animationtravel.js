"use strict"
// Глобальні змінні 

var FlagStart = false;

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

// ---------------------------------------------------------------------------
const parentElement = document.querySelector('.parentblock');

parentElement.style.overflow = 'hidden';

let pw = parentElement.offsetWidth;
let ph = parentElement.offsetHeight;
let pmax = (pw>=ph)?pw:ph;
let pmin = (pw<=ph)?pw:ph;

const scene = document.getElementById('scene_animationtravel');
const person = document.getElementById('person_animationtravel');
const thing = document.getElementById('thing_animationtravel');
const wagons = document.querySelectorAll('.wagons_animationtravel');

// ------------------------------------------------

// Промальовка сцени
scene.style.width = `100%`;
scene.style.height = `100%`;
scene.style.overflow = 'hidden';
scene.style.backgroundColor = `rgb(47, 107, 92)`;
// ------------------------------------------------

// Промальовка вагонів
for (let i = 0; i < wagons.length; i++) {
  wagons[i].style.position = `absolute`;
  wagons[i].style.color = `white`;
  if(i==0){
    wagons[i].style.backgroundColor = `brown`;
    wagons[i].style.left = `${100}%`;
  } else {
    wagons[i].style.backgroundColor = `blue`;
    wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.015*pw}px`;
  }
  wagons[i].style.top = `20%`;
  wagons[i].style.width = `${0.23*pmax}px`;
  wagons[i].style.height = `${0.075*pmax}px`;
  //wagons[i].style.backgroundColor = `blue`;
}
// ------------------------------------------------

// Промальовка персони
let personLeft = 45;
let personBottom = '2';
let personWidth = 15;
let personHeight = 20;
let personBgColor = 'orange';

person.style.position = 'absolute';
person.style.left = personLeft*(pw * 0.01)+'px';
person.style.bottom = personBottom*(ph * 0.01)+'px';

person.style.width = personWidth*(pmin * 0.01)+'px';
person.style.height = personHeight*(pmin * 0.01)+'px';

//person.style.backgroundColor = personBgColor;
person.style.backgroundImage = `url('./img/2.gif')`;
person.style.backgroundSize = `cover`;
person.style.backgroundRepeat = `no-repeat`;
person.style.backgroundPosition = `center`;


// --------------------------------------------------

let nowagon = 0;
// Промальовка предмета
function InitThing(){

  let thingWidth = 50;
  let thingHeight = 50;
  let thingBgColor = 'red';

  thing.style.position = 'absolute';
  thing.style.display = `flex`;

  let thingLeft = person.offsetLeft + person.offsetWidth;

  thing.style.left = thingLeft + 'px';

  thing.style.width = thingWidth*(pmin * 0.0015)+'px';
  thing.style.height = thingHeight*(pmin * 0.0015)+'px';


  let thingTop = person.offsetTop - thing.offsetHeight;
  thing.style.top = thingTop + 'px';


  thing.style.backgroundColor = thingBgColor;
  thing.style.zIndex = `10`;

  // --------------------------------------------------
  let startX = thing.offsetLeft;
  let startY = thing.offsetTop;

  let radiusX = getRandomNumber(scene.offsetWidth * 0.05, scene.offsetWidth * 0.1);

    let radiusY = person.offsetTop - thing.offsetHeight;

    let vector = getRandomNumber(0, 1);

    //let speed =  getRandomNumber(1.8, 1.8);
    let speed =  2;

    let points = arrOval(startX, startY, radiusX, radiusY, vector, speed);

    let overlap;
    let scalelevel = 0;
    let stepanime = 0;
    const ThingAnimate = ()=>{
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
            if(scalelevel <= 1){
              FlagStart = false;

              thing.style.display = `none`;

              //wagon.style.display = `none`;
              if(wagon.style.backgroundColor == `blue`) {
                nowagon++;
                wagon.style.backgroundColor = `white`;
              }  

              console.log(nowagon);console.log(wagons.length);

              if(nowagon == wagons.length-1){

console.log(nowagon);console.log(wagons.length);

                //wagons.forEach((wagon)=>{wagon.style.display = `flex`;});  
                //wagons.forEach((wagon)=>{wagon.style.backgroundColor = `blue`;});  
                nowagon = 0;
  
                // Повторна промальовка вагонів зі встановленням синього кольору
                for (let i = 0; i < wagons.length; i++) {
                  if(i==0){
                    wagons[i].style.backgroundColor = `brown`;
                    wagons[i].style.left = `100%`;
                  } else {
                    wagons[i].style.backgroundColor = `blue`;
                    wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.015*pw}px`;
                  }
                }
                
        
              } 
        
        


              //thing.style.display = `flex`;
              //FlagStart = true;
              //InitThing();
        


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

    setTimeout(() => {
      FlagStart = true;
      InitThing();
    }, 10);


      }
    }

  ThingAnimate();
}


const WagonAnimate = ()=>{
  wagons.forEach((wagon)=>{
    wagon.style.left = wagon.offsetLeft - 2 + 'px';
  });
 
  if( (wagons[wagons.length - 1].offsetLeft + wagons[wagons.length - 1].offsetWidth) <= 0){

    // Повторна промальовка вагонів
    for (let i = 0; i < wagons.length; i++) {
      if(i==0){
        wagons[i].style.backgroundColor = `brown`;
        wagons[i].style.left = `100%`;
      } else {
        wagons[i].style.backgroundColor = `blue`;
        wagons[i].style.left = `${wagons[i-1].offsetLeft + wagons[i-1].offsetWidth + 0.015*pw}px`;
      }
    }

  };

  requestAnimationFrame(WagonAnimate);
}  

WagonAnimate();




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

