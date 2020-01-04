var index = 0;
var questionBox = document.querySelector("#questionBox");
var header = document.querySelector("#header")
var timeLeft = document.createElement("span")
var timer = 75;
var highscores = []

var title = document.createElement("h1");
var userScore = document.createElement("p");
var userName = document.createElement("input");
var submitButton = document.createElement("button");
var startButton = document.createElement("button");
var displayHighscore = document.createElement("a");
var highscoresEl = document.createElement("ol")
var goBackEl = document.createElement("button")
var clearEl = document.createElement("button")

title.setAttribute("class", "row")
displayHighscore.setAttribute("class", "nav-link")


//Create clicks.
startButton.addEventListener("click", function () {
    timerFunction();
    displayQuestionFunction();
});

displayHighscore.addEventListener("click", viewHighscoreFunction);

submitButton.addEventListener("click", function () {
    console.log("submit button")
    saveHighscoreFunction();
    viewHighscoreFunction();
});



// Create landing page to start quiz.
function startMenuFunction() {
    index = 0;
    questionBox.innerHTML = "";
    header.innerHTML = "";
    timer = 75


    title.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startButton.textContent = "Start Quiz";
    displayHighscore.textContent = "View Highscores";
    timeLeft.textContent = "Time: " + timer;


    questionBox.appendChild(title);
    questionBox.appendChild(startButton);

    header.appendChild(displayHighscore);
    header.appendChild(timeLeft);

    if (localStorage.getItem("UserScores") != null) {
        console.log("got high scores")
        highscores = JSON.parse(localStorage.getItem("UserScores"));
    }


}


// Display questions.
function displayQuestionFunction() {

    questionBox.innerHTML = "";

    title.textContent = questions[index].title;
    questionBox.appendChild(title);

    var choicesArray = questions[index].choices;

    choicesArray.forEach(function (item) {
        var buttonEl = document.createElement("button");
        //buttonEl.setAttribute("class", "btn red etc.");
        buttonEl.textContent = item;
        buttonEl.addEventListener("click", checkAnswersFunction);
        questionBox.appendChild(buttonEl);
    });

};

// Calculate Score.
function checkAnswersFunction(event) {


    if (questions[index].answer === event.target.textContent) {

    } else {
        timer -= 15;
    }

    index++

    if (index < questions.length) {
        displayQuestionFunction();
    } else {
        endMenuFunction();
    };
};

// Submit highscore.
function endMenuFunction() {
    questionBox.innerHTML = ""


    userName.setAttribute("placeholder", "Please enter initials")

    title.textContent = "Great Job!"
    userScore.textContent = "Your final score is " + timer
    submitButton.textContent = "Submit"

    questionBox.appendChild(title)
    questionBox.appendChild(userScore)
    questionBox.appendChild(userName)
    questionBox.appendChild(submitButton)

    timeLeft.innerHTML = ""
}

// Create timer.
function timerFunction() {
    var timerInterval = setInterval(function () {
        timeLeft.textContent = "Time Remaining: " + timer

        if (timer === 0 || index >= questions.length) {
            clearInterval(timerInterval);
        } else {
            timer--;
        }

    }, 1000);
}

// Display highscores.
function viewHighscoreFunction() {
    questionBox.innerHTML = ""
    header.innerHTML = ""

    DisplayHighscoresFunction()

    title.textContent = "Highscores"
    goBackEl.textContent = "Go Back"
    clearEl.textContent = "Clear Highscores"    

    goBackEl.addEventListener("click", startMenuFunction)
    clearEl.addEventListener("click", clear)

    questionBox.appendChild(title)
    questionBox.appendChild(highscoresEl)
    questionBox.appendChild(goBackEl)
    questionBox.appendChild(clearEl)


}

// Clears Highscores.
function clear() {
    localStorage.setItem("UserScores", "")  
    highscores = []
    viewHighscoreFunction()  
}

function saveHighscoreFunction() {
    var savedScores = {
        name: userName.value,
        score: timer,
    }

    
    highscores.push(savedScores)
    localStorage.setItem("UserScores", JSON.stringify(highscores))
}



function DisplayHighscoresFunction (){
    highscoresEl.innerHTML = ""
    console.log(highscores);
    for (var i = 0; i < highscores.length; i++) {
        
        
        var listItem = document.createElement("li")
        listItem.textContent = highscores[i].name + "  score: " + highscores[i].score;
        
        highscoresEl.appendChild(listItem)
    }
    
}


startMenuFunction();
