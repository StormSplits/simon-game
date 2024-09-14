const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let sequenceNumber = 0;
let gameStarted = false;
let level = 0;

function playSound(colour) {
    let audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    sequenceNumber += 1;

    $('#level-title').text('Level ' + sequenceNumber);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).animate({
        opacity: 0.5
    }, 100).animate({
        opacity: 1
    }, 100);

    playSound(randomChosenColour);
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

$(document).keydown(function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    sequenceNumber = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}
