//getting all required elements;

const startBtn=document.querySelector(".start-btn button");
const infoBox=document.querySelector(".info-box");
const exitBtn=infoBox.querySelector(".buttons .quit");
const continueBtn=infoBox.querySelector(".buttons .restart");
const quizBox=document.querySelector(".quiz-box");
const optionList=document.querySelector(".option-list");
const timeCount=quizBox.querySelector(".timer .time-sec");



//if start quiz button clicked

startBtn.onclick=()=>{
    infoBox.classList.add("show-info");
}

//if exitBTN clicked

exitBtn.onclick=()=>{
    infoBox.classList.remove("show-info");
}

// if continue button click

continueBtn.onclick=()=>{
    infoBox.classList.remove("show-info");
quizBox.classList.add("show-quizbox");
showQuestions(0);
queCounter(1);
startTimer(timevalue);
}




let queCount=0;
let queNumb=1;
let counter;
let timevalue=15;
let userScore=0;


const nextBtn=quizBox.querySelector(".next-btn");
const resultBox=document.querySelector(".result-box");
const restartQuiz=resultBox.querySelector(".buttons .restart");
const quitQuiz=resultBox.querySelector(".buttons .quit");

quitQuiz.onclick=()=>{
    console.log("i am error")
    window.location.reload();
}





//if next button clicked
nextBtn.onclick=()=>{
    if(queCount<questions.length-1){
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    
    startTimer(timevalue);
    nextBtn.style.display="none";
    }else{
        console.log("Questions completed");
        showResultBox();
    }
}






//getting questions and options from array

function showQuestions(index){
const queText=document.querySelector(".que-text");
let queTag='<span>'+ questions[index].numb + '.'+ questions[index].question +'</span>';
queText.innerHTML=queTag;


let optionTag='<div class="option"><span>' + questions[index].option[0] + '</span></div>'
+  '<div class="option"><span>' + questions[index].option[1] + '</span></div>'
+ '<div class="option"><span>' + questions[index].option[2] + '</span></div>'
+ '<div class="option"><span>' + questions[index].option[3] + '</span></div>'

optionList.innerHTML = optionTag;

const option=optionList.querySelectorAll(".option");
for(let  i=0; i<option.length; i++){
    option[i].setAttribute("onclick" , "optionSelected(this)");
}
}

function queCounter(index){
const bottomQuesCounter=quizBox.querySelector(".total-que");
let totalQuesTag= '<span><p>'+ index +'</p>Of<p>' + questions.length + '</p>Questions</span>';
bottomQuesCounter.innerHTML=totalQuesTag;
}

let tickIcon ='<div class="icon-ticks"><i class="fa fa-check"></i></div>';
let crossIcon ='<div class="icon-cross"><i class="fa fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    let userAns=answer.textContent;
    let correctAns=questions[queCount].answer;
    let allOptions=optionList.children.length;
    if(userAns==correctAns){
        userScore+= 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("wrong");
        console.log("wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answers is wrong then automatically selected the correct answer
        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent==correctAns){
                optionList.children[i].setAttribute("class" , "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);

            }
        }
    }

    //once user selected disabled all options
    for(let i=0;i < allOptions; i++){
        optionList.children[i].classList.add("disable");
    }
    nextBtn.style.display="block";
}


function showResultBox(){
    infoBox.classList.remove("show-info");
    quizBox.classList.remove("show-quizbox");
    resultBox.classList.add("show-resultbox");
    const scoreText=resultBox.querySelector(".score-text");
    if(userScore > 3){
        let scoreTag='<span>and congrats!, you got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML=scoreTag;
    }else if(userScore > 1){
        let scoreTag='<span>and nice, you got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML=scoreTag;
    }else{
     
        let scoreTag='<span>and sorry, you got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
        scoreText.innerHTML=scoreTag;
    }
        

}




function startTimer(time){
    counter=setInterval(timer, 1000);
    function timer(){
        timeCount.textContent=time;
        time--;
        if(time<0){
            clearInterval(counter);
            timeCount.textContent="00";
        }
    }
}

// function showResultBox(){
//     infoBox.classList.remove("show-info");
//     quizBox.classList.remove("show-quizbox");
//     resultBox.classList.add("show-resultbox");
// 

