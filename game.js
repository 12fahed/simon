var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).keypress(function(){
    if(!started){
        started = true
        nextSequence()
        console.log("Game Pattern: " + gamePattern)
    }
})

$("#start-btn").click(function(){
    if(!started){
        animatePress($("#start-btn").attr("id"))
        started = true
        nextSequence()
        $(this).addClass("visibility")
        console.log("Game Pattern: " + gamePattern)
    }
})

$(".btn").click(function() {

    // var userChosenColor = this.id
    // userClickedPattern.push(userChosenColor)

    userClickedPattern.push( $(this).attr("id") )
    playSound(this.id)
    animatePress(this.id)
    checkAnswer(userClickedPattern.length - 1)
    console.log( "User Click: " + userClickedPattern )

})

function checkAnswer(index){

    if(userClickedPattern[index] === gamePattern[index]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press any key to Restart")

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    }

}

function nextSequence(){

    userClickedPattern = []

    level++
    $("#level-title").text("Level "+ level)

    var randomNumber =  Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)

}



function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed")

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100)
}

function startOver(){
    started = false
    gamePattern = []
    userClickedPattern = []
    level = 0
    $("#start-btn").removeClass("visibility")
}