"use strict"



const min = 0;
const max = 100;
let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
let r,g,b,prozoro,povorot;


const mySvg = document.getElementById("my_svg");
mySvg.onload = function() {

  for (let i = 0; i < 1500; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    circle.setAttribute("cx", randomNum);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    circle.setAttribute("cy", randomNum);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    //circle.setAttribute("r", Math.random() * 0.02 +'vmin');
    circle.setAttribute("r", randomNum * 0.0001 +'vmin');

/*
    circle.setAttribute("cx", Math.random() * 500);
    circle.setAttribute("cy", Math.random() * 100);
    circle.setAttribute("r", Math.random() * 0.1 +'vmin');
*/

    r = Math.floor(Math.random() * (max - min + 1)) + min;
    g = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;

    circle.setAttribute("fill", `rgba(${r*1.5},${g*2},${b*2},${r*1}`);

    mySvg.appendChild(circle);
  }


  setInterval(() => {
    const svg = document.querySelector("svg");
    const circles = svg.querySelectorAll("circle");
    for (let i = 0; i < circles.length; i++) {
      const kolo = circles[i];
      r = Math.floor(Math.random() * (max - min + 1)) + min;
        
      //console.log(r*0.01);


      kolo.setAttribute("opacity", r*0.03);

      //kolo.setAttribute("fill", `rgba(${200},${200},${r},${r*0.4}`);
        //console.log(circle.getAttribute("fill"));
    }



  }, Math.random() * 1000);


  povorot=1;
  setInterval(() => {
    if(povorot<3600) povorot++ 
    else povorot=1;
    mySvg.style.transform = `rotate(${povorot*0.1}deg)`;
  }, 100);




};






ex1.addEventListener("click", function(){alert("подія 1");});
         
ex1.addEventListener('mouseenter', (event) => {
  ex1.dataset.content = ex1.innerText;
});

ex1.addEventListener('mousemove', (event) => {
   const wx = event.clientX;
   const wy = event.clientY;

   const bx = event.offsetX;
   const by = event.offsetY;

   //let verh = ex1.offsetTop;
   //let nyz = ex1.offsetTop;


   let vysota = ex1.offsetHeight;
   let shyrota = ex1.offsetWidth;

   let seredynaH = ex1.offsetHeight / 2;
   let seredynaW = ex1.offsetWidth / 2;
   let zsuvX = 0;
   let zsuvY = 0;


//   ex1.innerText = ` ${shyrota} ${vysota} ${seredynaW} ${seredynaH} WindowX: ${wx}, WindowY: ${wy} BlockX: ${bx}, BlockY: ${by}`;


    zsuvX = (seredynaW - bx) / (seredynaW * 0.075);

    zsuvY = (seredynaH - by) / (seredynaH * -0.075);


    //id_header.innerHTML = ` ${bx} : ${seredynaW} : ${zsuvX} <br> ${by} : ${seredynaH} : ${zsuvY}`;


    //ex1.style.transform = `perspective(10vmin) rotateX(${zsuvY}deg) rotateY(${zsuvX}deg) scale3d(1,1,1)`;

    ex1.style.transform = `perspective(300px) rotateX(${zsuvY}deg) rotateY(${zsuvX}deg) scale3d(1,1,1)`;









//   ex1.innerText = ` ${shyrota} ${vysota} ${seredynaW} ${seredynaH} BlockX: ${bx}, BlockY: ${by}`;


   //ex1.style.transform = 'perspective(300px) rotateX(-8.03deg) rotateY(8.82deg) scale3d(1,1,1)';
                                                                             
});


ex1.addEventListener('mouseleave', (event) => {
   ex1.innerText = ex1.dataset.content;
   ex1.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale3d(1,1,1)';

});


//ex1.style.transform = 'scale(0)';
setTimeout(() => {
  //ex1.style.transition = 'transform 0.25s ease-out';
  ex1.style.transform = 'scale(1)';



}, 1000);


