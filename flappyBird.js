"use strict"

let cvs = document.getElementById('canvas')
let ctx = cvs.getContext('2d')
cvs.height = 512
cvs.width = 288

let bird = new Image()
let bg = new Image()
let fg = new Image()
let pipeUp = new Image()
let pipeBottom = new Image()

bird.src = "image/bird.png"
bg.src = "image/bg.png"
fg.src = "image/fg.png"
pipeUp.src = "image/pipeUp.png"
pipeBottom.src = "image/pipeBottom.png"

let fly = new Audio()
let score_audio = new Audio()

fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"

let gap = 90
let xPos = 10
let yPos = 150
let grav = 1.5

let pipe = []
pipe[0] = {
    x: cvs.width,
    y: 0
}

let score = 0
ctx.fillStyle = "#000"
ctx.font = "24px Verdana"

function draw(){
    ctx.drawImage(bg, 0, 0)
    
    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom,  pipe[i].x, pipe[i].y + pipeUp.height + gap)
        
        if(pipe[i].x == 5){
            score++
            score_audio.play() 
        } 

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)||
            yPos + bird.height >= cvs.height - fg.height){
                location.reload()
            }      
            
        pipe[i].x--
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos += grav
    requestAnimationFrame(draw)
    ctx.fillText("Счет:" + score, 10, cvs.height - 20)
}

function moveUp(){
    yPos -= 25
    fly.play()
}

pipeBottom.onload = draw
document.addEventListener("keydown", (e)=>{
    if(e.code == 'Space') moveUp()
})

document.addEventListener("keydown", (e)=>{
    if(e.code == 'Escape') alert('Пауза, нажми ОК для продолжения')
})