let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;
let highestScore = 0; // New variable for highest score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash (btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;
    
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkSeq(idx){
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
                // Update highest score if current score is greater
                if (level > highestScore) {
                    highestScore = level;
                }

        h2.innerHTML = `Game Over! your score is <b>${level}</b> <br> Highest Score: <b>${highestScore}</b> <br> press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout (function () {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        

        
        reset();
    }
}

function btnPress () {
    let btn = this; // line 72
    console.log(this);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset () {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
