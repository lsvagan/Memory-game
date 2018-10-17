$(document).ready(function(){

   let $wrapp = $('#wrapp');
   let numbers = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
   let savedArr = [];
   let clickNum = 0;
   let endGame = 0;

   for(let i = 0; i < 16; i++){

      let randomNum = Math.floor(Math.random()*numbers.length);

      $wrapp.append(
      `<div class="box">

         <div class="back">${numbers[randomNum]}</div>
         <div class="front"></div>
         
      </div>`);
      
      numbers.splice(randomNum, 1);
   }
   
   function startFun(){
   $('.box').on('click', clickFun);
   }

   function clickFun(){
      
      $(this).find('.back').css("transform", "perspective(900px) rotateY(0deg)");

      $(this).find('.front').css("transform", "perspective(900px) rotateY(180deg)");
      
      savedArr.push($(this));
      clickNum ++;
      console.log("savedArr: "+savedArr, "clickNum: "+clickNum);

      if(clickNum === 2){
         clickNum = 0;
         $('.box').off();
         checkBox();
      }
   }

   function checkBox(){
      if((savedArr[0].html()) != (savedArr[1].html())){
         setTimeout(function(){
            savedArr[0].find('.front').css("transform", "perspective(900px) rotateY(0deg)");
            savedArr[0].find('.back').css("transform", "perspective(900px) rotateY(-180deg)");
      
            savedArr[1].find('.front').css("transform", "perspective(900px) rotateY(0deg)");
            savedArr[1].find('.back').css("transform", "perspective(900px) rotateY(-180deg)");

            savedArr.length = 0;
            startFun();
         },1200)
      }else{
         savedArr[0].attr("class", "disable");
         savedArr[1].attr("class", "disable");
         
         endGame++;

         if(endGame === 8){
            setTimeout(function(){
               var info = confirm("Congratulation! Click OK if you want play again.");
               if(info === true){
                  location.reload();
               }
            },800);
         }

         savedArr.length = 0;
      
         startFun();
      }
   }

   startFun();
})