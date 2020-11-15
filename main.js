// select elements
let count=document.querySelector(".count span");
let bullets=document.querySelector(".bullets .spans");
let questionArea=document.querySelector(".quiz-area");
let answerArea=document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// set the values
let currentIndex=0;
let rightAnswers = 0;
let countdownInterval;
// get questios from json file
function getQuestion () {
    fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.length);
    let qCount=data.length;
    count.innerHTML=qCount;
    createBullets(qCount);
   
    
      // Start CountDown
      countdown(3, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = data[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        questionArea.innerHTML = "";
        answerArea.innerHTML = "";

        // show data from json
      getData(data[currentIndex]);
        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(3, qCount);

        // Show Results
        showResults(qCount);
      };

    
  });
}
getQuestion()

function createBullets(num){
for(let i=0 ; i<num ;i++) {
let theBullets= document.createElement("span");
if(i===0){
    theBullets.classList.add("on")
}
bullets.appendChild(theBullets);


}
}

function getData(obj) {
// create the h2 q
let h2Ques=document.createElement("h2");
let h2Text=document.createTextNode(obj.title)
// append text to h2
h2Ques.appendChild(h2Text);
// append h2 to the questions area
questionArea.appendChild(h2Ques);
// create Answers ,4 is num of answers
for(let i=1; i<=4;i++) {

    let answer=document.createElement("div");
    answer.className="answer";
    // create radio
    let radio=document.createElement("input");
    radio.type="radio";
    radio.id=`answer_${i}`;
    radio.name="question";
    // add data-answer to make check the correct answer
    radio.dataset.answer=obj[`answer_${i}`];
    // make the label
    theLabel=document.createElement("label");
    theLabel.htmlFor= `answer_${i}`;
    let labelText=document.createTextNode(obj[`answer_${i}`]);
    theLabel.appendChild( labelText) ;
  answer.appendChild(radio)
    answer.appendChild(theLabel);
    answerArea.appendChild( answer);

}
}

function checkAnswer(rAnswer, count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;
  
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        theChoosenAnswer = answers[i].dataset.answer;
      }
    }
  
    if (rAnswer === theChoosenAnswer) {
      rightAnswers++;
    }
  }

  function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
      if (currentIndex === index) {
        span.className = "on";
      }
    });
  }
  
  function showResults(count) {
    let theResults;
    if (currentIndex === count) {
      quizArea.remove();
      answersArea.remove();
      submitButton.remove();
      bullets.remove();
  
      if (rightAnswers > count / 2 && rightAnswers < count) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
      } else if (rightAnswers === count) {
        theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
      } else {
        theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
      }
  
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "white";
      resultsContainer.style.marginTop = "10px";
    }
  }
  
  function countdown(duration, count) {
    if (currentIndex < count) {
      let minutes, seconds;
      countdownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
  
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
  
        countdownElement.innerHTML = `${minutes}:${seconds}`;
  
        if (--duration < 0) {
          clearInterval(countdownInterval);
          submitButton.click();
        }
      }, 1000);
    }
  }
  

