// snake is an array, ground is an image, food is object, and score is 

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


const box = 32;
// size of each box is 32 pixels


// loading the images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


// setting up the audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// DRAWING THE SNAKE, and declaring as an array with brackets
let snake = [];
// snake position
snake[0] = {x : 9 * box, y : 10 * box};

// food position is randomly selected so we need a formula for it, the x position of the food will be between one box and 17 boxes, y poition between 15 and 3 boxes. -- the food will be inside the border
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


let score = 0;

// d is the variable for the function
let d;

// event listener to know which key the player pressed
// making sure every condition is covered, if the snake is going right and player presses left the snake will not go that way. no left to right, not up to down, etc.
document.addEventListener("keydown",direction);


// coding the keys to control the snake
// 38 is up, 37 is left, 39 is right, 40 is down

// event is parameter, keycode states which number is what key
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// if the head has the same position as any part of the tail, game over 
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


function draw(){
  // drawing the ground and its x and y position  
    ctx.drawImage(ground,0,0);
    
// looping the array over the snake to draw it. snake is orange if i is 0 and white if not
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "orange" : "white";
     ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake head and food are the same xy positon, the score goes up
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
// removes the head and adds a tail each round
        
        
    }else{

        snake.pop();
    }
    

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
// based on the old head position and the snake direction, this determines the new tail position
    
    
// if the snake hits the wall, game over! 
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    // removes the tail and adds a new head each time
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Didact Gothic";
    ctx.fillText(score,2*box,1.6*box);
}

// have to call the draw function every 100 milliseconds, assigning it to a variable so we can stop the game if needed
let game = setInterval(draw,100);


















