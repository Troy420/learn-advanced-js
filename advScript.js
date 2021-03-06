// ELEMENTS
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');


//EVENT LISTENERS
startScreen.addEventListener("click", start); // start()
document.addEventListener("keydown", pressOn); //pressOn()
document.addEventListener("keyup", pressOff); // pressOff()


//OBJECTS
let player = {
    speed: 5, // player.speed
    score: 0 // player.score
};
let keys = {
    ArrowUp: false, // keys.ArrowUp
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}


function pressOn(e) { // the 'e' parameter are the event listeners keydown
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key + " on");
}

function pressOff(e) { // the 'e' parameter are the event listeners keyup
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key + " off");
}

function start() {
    startScreen.classList.add("hide");
    score.classList.remove("hide");
    gameArea.innerHTML = ""; // this is to refresh the gameArea nodes

    player.start=true;
    player.score=0;

    // Creating the line 
    for(let x = 0; x < 10; x++){
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (div.y) + "px";
        gameArea.appendChild(div);
    }

    window.requestAnimationFrame(playGame);

    // creating my car
    let car = document.createElement("div"); // <div></div>
    car.innerText = "Car"; // <div>Car</div>
    // car.setAttribute("class", "car"); // <div class="car">Car</div>
    // car.className = "car";
    car.classList.add("car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // Creating the enemies 
    for(let x = 0; x <= 5; x++){
        let div = document.createElement("div");
        div.classList.add("enemy");
        div.innerHTML = (x+1);
        div.y = ((x+1)*600) * -1;
        div.style.top = div.y + "px";
        div.style.left = Math.floor(Math.random() * 750) + "px";
        div.style.backgroundColor = randomColor();
        gameArea.appendChild(div);
    }
}


function moveLines() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(line){
        if(line.y > 1500){
            line.y -= 1500;
        }
        line.y += player.speed;
        line.style.top = line.y + "px";
    })
}

function moveEnemy(car) {
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function(enemy){
        if(isCollide(car, enemy)){
            endGame();
        }
        if(enemy.y >= 1500){
            enemy.y = -600;
            enemy.style.left = Math.floor(Math.random() * 300) + "px";
            enemy.style.backgroundColor = randomColor();
        }
        enemy.y += (player.speed);
        enemy.style.top = enemy.y + "px";
    })
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right)
    )
}

function playGame() {
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    moveLines();
    moveEnemy(car);

    if(player.start){
        if(keys.ArrowUp && player.y > road.top) {
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < road.bottom - 100) {
            player.y += player.speed; 
        }
        if(keys.ArrowLeft && player.x > 25) {
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < 275) {
            player.x += player.speed;
        }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

function endGame() {
    player.start = false;
    score.innerHTML = "Game Over <br> Your Score is " + player.score;
    startScreen.classList.remove("hide");
    startScreen.innerText = "Click here to play again";
}

function randomColor() {
    function a() {
        let hex = Math.floor(Math.random()*256).toString(16);
        console.log(hex);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+a()+a()+a();
    
}