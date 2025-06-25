document.querySelector('.rock-button')
.addEventListener('click',() =>{
   playGame('rock');
})
document.querySelector('.paper-button')
.addEventListener('click',() =>{
   playGame('paper');
})
document.querySelector('.scissors-button')
.addEventListener('click',() =>{
   playGame('scissors');
})

document.querySelector('.auto-play-button')
 .addEventListener('click',()=>{
   autoPlaying();
   autoStop();
 })

document.querySelector('.reset-button')
 .addEventListener('click',resetButton);




document.body.addEventListener('keydown',(event) => {
  if(event.key==='r'){
   playGame('rock');
  }else if(event.key==='p'){
   playGame('paper');
  }else if(event.key==='s'){
   playGame('scissors')
  }else if(event.key==='a'){
   autoPlaying();
  }else if(event.key==='Backspace'){
   resetButton();
  }
})

let score=JSON.parse(localStorage.getItem('score')) || {
   win:0,
   losses:0,
   tie:0
};

updateScoreElement();

function resetButton(){
   document.querySelector('.confirmation')
       .innerHTML=`Are you sure you want to reset the score?
       <button class="yes" onclick="resetScore();hiding()">Yes</button>
       <button class="no" onclick="hiding()">No</button>
       `;
}
function resetScore(){
   score.win=0;
   score.losses=0;
   score.tie=0;
   localStorage.removeItem('score');
   updateScoreElement();
}
function hiding(){
   document.querySelector('.confirmation')
    .innerHTML='';
}

let autoplay=false;
let intervalId;
function autoPlaying(){
  if(!autoplay){
  intervalId = setInterval(function(){
     let playerMove = computerPick();
     playGame(playerMove);
   },1000);
   autoplay=true;
  }
  else{
   clearInterval(intervalId);
   autoplay=false;
  }
};

function autoStop(){
   const buttonElement=document.querySelector('.auto-play-button')
   if(buttonElement.innerText==='Auto Play'){
     buttonElement.innerHTML='Stop Play';
   }else{
       buttonElement.innerText='Auto Play';
   }
}

function playGame(playerMove){
   const computerAns=computerPick();
   
   let result='';
   if(playerMove === 'scissors'){
       if(computerAns==='rock'){
           result='You lose.'
       }
       else if(computerAns==='paper'){
           result='You win.'
       }
       else{
           result='Tie.'
       }
   }
   else if(playerMove === 'paper'){
       if(computerAns==='rock'){
           result='You win.'
       }
       else if(computerAns==='paper'){
           result='Tie.'
       }
       else{
           result='You lose.'
       }
   }
   else if(playerMove === 'rock'){
       if(computerAns==='rock'){
           result='Tie.'
       }
       else if(computerAns==='paper'){
           result='You lose.'
       }
       else{
           result='You win.'
       }
   }

   document.querySelector('.js-result')
    .innerHTML=`${result}`;

   if(result==='You win.'){
       score.win +=1;
   }
   else if(result==='You lose.'){
       score.losses +=1;
   }
   else {
       score.tie += 1;
   }
   updateScoreElement();

   localStorage.setItem('score',JSON.stringify(score));
   
   document.querySelector('.js-move')
    .innerHTML=`You <img src="${playerMove}-emoji.png" class="image">  <img src="${computerAns}-emoji.png" class="image"> Computer`;
}

function updateScoreElement(){
   document.querySelector('.js-score')
   .innerHTML=`Wins=${score.win},Losses=${score.losses},Ties=${score.tie}`;
}

function computerPick(){
   const randomNumber= Math.random();
   let computerAns='';
   
   if(randomNumber>0 && randomNumber<1/3){
       computerAns='rock';
   }
   else if(randomNumber>1/3 && randomNumber<2/3){
       computerAns='paper';
   }
   else{
       computerAns='scissors';
   }
    
   return computerAns;
   }
