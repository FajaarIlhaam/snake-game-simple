//Import Sound and setup start game with variable
let inputDir = {x:0, y:0}
const foodSound = new Audio('assets/audio/eat.mp3')
const gameOverSound = new Audio('assets/audio/gameover.mp3')
const moveSound = new Audio('assets/audio/walking.mp3')
const MusicGame = new Audio('assets/audio/musicGame.mp3')
let score = 0
let speed = 8
let lastPaintTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]
food = {x: 6, y: 7}


//Function game 
function main(ctime) {
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return
    }
    lastPaintTime = ctime
    gameEngine();
}


function isCollide(snake) {
    //snake crash with his body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
     //snake crash in wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
            return true
    }
}

function gameEngine () {
    //update the snake array and food
    if(isCollide(snakeArr)) {
        gameOverSound.play()
        MusicGame.pause()
        MusicGame.currentTime = 0
        inputDir = {x:0, y:0}
        alert('Yaelah malah ketabrak...Silahkan tekan tombol oke untuk memulai kembali')
        snakeArr = [ { x: 13, y: 15 }]
        MusicGame.play()
        score = 0
    }

//update score and regenerate food if snake has get food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play()
    score += 1
    //Saving HighScore result
    if(score>highScorevalue){
        highScorevalue = score
        localStorage.setItem('highScore', JSON.stringify(highScorevalue))
        highScoreAll.innerHTML ='highscore : ' + highScorevalue
    }
    scoreAll.innerHTML = "score : " + score
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
    //food generate
    let a = 2
    let b = 16
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}

    //move snake body if to long
for (let i = snakeArr.length - 2; i >=0; i--){
   snakeArr[i + 1] = {...snakeArr[i]}
}

snakeArr[0].x += inputDir.x
snakeArr[0].y += inputDir.y



//Display the snake 
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y 
    snakeElement.style.gridColumnStart = e.x
    if(index === 0) {
        snakeElement.classList.add('head')
    }else {
        snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement)
})

//display food 
foodElement = document.createElement('div')
foodElement.style.gridRowStart = food.y 
foodElement.style.gridColumnStart = food.x
foodElement.classList.add('food')
board.appendChild(foodElement)
}

//Add to html
let highScore = localStorage.getItem('highScoreAll')
if(highScore === null) {
    highScorevalue = 0
    localStorage.setItem('highScoreAll', JSON.stringify(highScorevalue))
}
else {
    highScorevalue = JSON.parse(highScore)
   highScoreAll.innerHTML ='Highscore: ' + highScore
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y:1} //for start the game
    moveSound.play() //play
    //kewyword to move snake with arrow 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x =0 
            inputDir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
             break;
    }
})