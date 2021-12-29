var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(".btn-start").click(function(){
    if(started===false){
        $("h1").text("Level "+level);
        setTimeout(function(){
            gameSequence();
        },1000);
       
        started=true;
        $(".btn-start").slideUp();
    }
    
});

function gameSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor); 
   
}


$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSolution(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});



function checkSolution(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                gameSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over!!😣");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }

}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");


    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");}
        ,100);
    
}
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    $(".btn-start").slideDown();
}
