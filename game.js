'use strict'
const startButton = document.getElementById("startGameBtn");
const food = document.getElementById("food");
const width = window.innerWidth;
const height = window.innerHeight;
console.log(height);
console.log(width);
startButton.addEventListener("click", startgame);

function startgame(){
  // document.getElementById("beginning-modal").style.display = 'none';
  var foodWidth = randomGen(0,width,10);
  foodWidth = foodWidth+"px";
  var foodHeight = randomGen(0,height,10);
  foodHeight = foodHeight+"px";
  food.style.top = foodHeight;
  food.style.left = foodWidth;
}


function randomGen(min, max, div){
  var res = Math.floor(Math.random() * (max - min + 1)) + min;
  // for(var i = res; i < res + div; i++)
  // {
  //   if( i % div == 0 )
  //   {
  //     return i;
  //   }
  // } console.log("error");
  return (res + (div - res % div));
}
