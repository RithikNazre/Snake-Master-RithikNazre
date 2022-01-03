//game constant and variables

let inputDir = {x: 0 ,y: 0};
const foodSound = new Audio('munch.mp3.mp3');
//const moveSound = new Audio('Hiss.mp3.mp3');
const musicSound = new Audio('Theme.mp3.mp3');
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//Game Function
function main(currentTime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();

}

function isCollide(snake) {
    //if you bump into yourself
    for(let i = 1; i<snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bumped into wall
        if(snake[0].x >= 18 || snake[0].x <=0  || snake[0].y >= 18 || snake[0].y <=0) {
            return true;
        }
    }
    

function gameEngine(){
        //part1 :Updating the snake array and food
        if(isCollide(snakeArr)){
            musicSound.pause();
            inputDir = {x:0 ,y:0};
            alert("Game Over.Press any Key  to play again!");
            snakeArr = [{x:13 , y:15}];
            musicSound.play();
            score = 0;

        }
        //if food is consumed
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            foodSound.play();
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random())}
        }

        //moving snake

        for (let i = snakeArr.length - 2;  i>=0; i--) {
            snakeArr[i+1] = {...snakeArr[i]};
            
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;


        //part2 :Display the snake and food
        //Display the snake
        board.innerHTML = "";
        snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColoumnStart = e.x;
            //snakeElement.classList.add('snake');
            if(index === 0){
                snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('snake');
            } 
            board.appendChild(snakeElement);

        });
        //Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColoumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}




//Main logic strats here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0,y: 1}
   // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

         case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }

});
