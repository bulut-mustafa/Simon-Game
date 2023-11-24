class Node {
    constructor(data) {
       this.data = data;
       this.next = null;
    }
 }

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
     }

     addToTail(data) {
        let newNode = new Node(data);
        if (this.head === null) {
           this.head = newNode;
           return;
        }
        let current = this.head;
        while (current.next !== null) {
           current = current.next;
        }
        current.next = newNode;
     }


    clear() {
        this.head = null;
    }
}

let level = 1;
let started = false;
const buttons = ["red", "blue", "green", "yellow"];
let buttonList = new LinkedList();
let clickedButtons = new LinkedList();



$(document).keypress(function(){
  if(!started){
    started= true;
    nextLevel();  
  }
})


function nextLevel(){
    setTimeout(function(){
        $("#level-title").text("Level " + level);
        var index = Math.floor(Math.random()*4);
        var button = buttons[index];
        buttonList.addToTail(button)
        $("#"+button).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(button)
    },150)
    
  }


$("button").click(function(){
    const clickedButton = this.id;
    clickedButtons.addToTail(clickedButton);
    playSound(clickedButton);
    animatePress(clickedButton);
    checkAnswer(buttonList.head, clickedButtons.head)
    this.blur();
})


function checkAnswer(node1, node2){
    var temp1 = node1;
    var temp2 = node2;
    while(temp1 && temp2){
        if(temp1.data != temp2.data){
            console.log("wrong") ;
            clickedButtons.clear();
            buttonList.clear();
            $("body").addClass("game-over");
            gameOver();
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200)
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startAgain();
            return false;
            
            
        }
        temp1 = temp1.next;
        temp2 = temp2.next;
    }
    if(temp1 == null && temp2 == null){
        clickedButtons.clear();
        level = level+1;
        nextLevel();
    }
}

function startAgain(){
    level = 1;
    started = false;
}
  

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}


function gameOver(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
  
