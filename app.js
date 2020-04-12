import anime from './node_modules/animejs/lib/anime.es.js';
let auScream = new Audio('./au.mp3');
let points = 0;
let animationDuration = 500;
let score = document.querySelector('h2');
let shuffleButton = document.querySelector('#shuffle');
let mj_list = document.querySelectorAll('.michael-jackson')
let cup1 = {
    name: 'cup1',
    element: document.querySelector('#cup-1'),
    startingPosition: 1,
    currentPosition: 1,
    offset: 0,
};
let cup2 = {
    name: 'cup2',
    element: document.querySelector('#cup-2'),
    startingPosition: 2,
    currentPosition: 2,
    offset: 0,
};
let cup3 = {
    name: 'cup3',
    element: document.querySelector('#cup-3'),
    startingPosition: 3,
    currentPosition: 3,
    offset: 0,
};
let cup_list = [cup1, cup2, cup3];


function raiseCup(){
    mj_list[cup2.currentPosition -1].classList.remove('hide');
    anime({
        targets: this,
        keyframes: [
            {translateY: -250},
            {translateY: 0},
        ],
        duration: 2800,
        easing: 'easeInOutExpo',
        autoplay: true,
    });

    if(this.id === 'cup-2'){
        auScream.play();
        points+= 1;
        score.innerHTML = `Pontuação: ${points}`;     
        document.querySelector('#shuffle').classList.remove('hide');
    
        document.querySelectorAll('.cup').forEach( (cup) => {
            cup.removeEventListener('click', raiseCup);
        });


        shuffleButton.classList.remove('disabled');
        shuffleButton.innerHTML = "Jogar";
    } else{
        shuffleButton.innerText = 'Você perdeu !';
        document.querySelectorAll('.cup').forEach( (cup) => {
            cup.removeEventListener('click', raiseCup);
        });
    }
    
}


document.querySelector('#shuffle').addEventListener('click',() => {

    shuffleButton.innerHTML = 'Aguarde...';
    shuffleButton.classList.add('disabled');
    document.querySelectorAll('.cup').forEach( (cup) => {
        cup.removeEventListener('click', raiseCup);
    });

    mj_list.forEach((mj) => {
        mj.classList.add('hide');
    });
    

    function randCup(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if(points % 2 === 0 && animationDuration > 100){
        animationDuration -= 50
    }

    console.log(points);
    console.log(animationDuration);

    var game = setInterval(() => {
        let one = randCup(1,3);
        let two = randCup(1,3);
        
        moveTwoCups(one, two);
    },animationDuration + 500);

    setTimeout(() => {
        clearInterval(game);
        shuffleButton.innerHTML = 'Escolha !'
        document.querySelectorAll('.cup').forEach( (cup) => {
            cup.addEventListener('click', raiseCup);
        });
    }, 10000)

    
});

function moveTwoCups(cup1, cup2){
    let cup1_index = cup_list.findIndex( cup => cup.currentPosition == cup1)
    let cup2_index = cup_list.findIndex( cup => cup.currentPosition == cup2)
    let element1 = cup_list[cup1_index];
    let element2 = cup_list[cup2_index];
    let cup1_translation, cup2_translation = 0;
    if((cup1 == 1 && cup2 == 2) || (cup1 == 2 && cup2 == 3)){
        cup1_translation = 200 + element1.offset;
        cup2_translation = -200 + element2.offset;
    }
    if((cup1 == 2 && cup2 == 1) || (cup1 == 3 && cup2 == 2)){
        cup1_translation = -200 + element1.offset;
        cup2_translation = 200 + element2.offset;
    }
    if(cup1 == 1 && cup2 == 3){
        cup1_translation = 400 + element1.offset;
        cup2_translation = -400 + element2.offset;
    }
    if(cup1 == 3 && cup2 == 1){
        cup1_translation = -400 + element1.offset;
        cup2_translation = 400 + element2.offset;
    }
    if(cup1 == cup2){
        return;
    }
    
    
    anime({
        targets: element1.element,
        keyframes: [
            {translateX: [cup1_translation]},
        ],
        duration: animationDuration,
        easing: 'easeInOutExpo',
        autoplay: true,
    });
    anime({
        targets: element2.element,
        keyframes: [
            {translateX: [cup2_translation]},
        ],
        duration: animationDuration,
        easing: 'easeInOutExpo',
        autoplay: true,

    });

    
    // Update current positions
    element1.currentPosition = cup2;
    element2.currentPosition = cup1;


    //Set new offset for element1
    if(element1.name === 'cup1'){
        switch(element1.currentPosition){
            case 1:
                element1.offset = 0;
                break;
            case 2:
                element1.offset = 200;
                break;
            case 3:
                element1.offset = 400;
                break;
        }
    }
    if(element1.name === 'cup2'){
        switch(element1.currentPosition){
            case 1:
                element1.offset = -200;
                break;
            case 2:
                element1.offset = 0;
                break;
            case 3:
                element1.offset = 200;
                break;
        }
    }
    if(element1.name === 'cup3'){
        switch(element1.currentPosition){
            case 1:
                element1.offset = -400;
                break;
            case 2:
                element1.offset = -200;
                break;
            case 3:
                element1.offset = 0;
                break;
        }
    }

    //Setting new offset for element2
    if(element2.name === 'cup1'){
        switch(element2.currentPosition){
            case 1:
                element2.offset = 0;
                break;
            case 2:
                element2.offset = 200;
                break;
            case 3:
                element2.offset = 400;
                break;
        }
    }
    if(element2.name === 'cup2'){
        switch(element2.currentPosition){
            case 1:
                element2.offset = -200;
                break;
            case 2:
                element2.offset = 0;
                break;
            case 3:
                element2.offset = 200;
                break;
        }
    }
    if(element2.name === 'cup3'){
        switch(element2.currentPosition){
            case 1:
                element2.offset = -400;
                break;
            case 2:
                element2.offset = -200;
                break;
            case 3:
                element2.offset = 0;
                break;
        }
    }
    
}

let initial_animation = anime({
    targets: '#cup-1, #cup-2, #cup-3',
    keyframes: [
        {translateY: -250},
        {translateY: 0},
    ],
    duration: 2800,
    easing: 'easeInOutExpo',
    autoplay: true,
});

