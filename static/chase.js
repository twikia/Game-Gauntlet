let controls = { "w": "up", "a": "left", "s": "down", "d": "right" };

const gridSize = 10;
const grid = document.getElementById("grid");

let you = { x: 1, y: 1 };
let monster = { x: 0, y: 0 };
let lastMonsterPos = { x: -1, y: -1 }; 
let gameRunning = false;
let monsterInterval, shuffleInterval;
let finishLine = { x: 9, y: 4 }; 

const maze = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0], 
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const playerSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="blue" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>`;

const monsterSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="red" d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1l0 64c0 26.5 21.5 48 48 48l48 0 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16l0 48 64 0 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16l0 48 48 0c26.5 0 48-21.5 48-48l0-64c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
    </svg>`;

function createGrid() {
    grid.innerHTML = "";
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (maze[y][x] === 1) {
                cell.classList.add("path");
            }
            if (x === finishLine.x && y === finishLine.y) {
                cell.classList.add("finish");
            }
            if (x === you.x && y === you.y) {
                cell.innerHTML = playerSVG; 
                cell.classList.add("you");
            }
            if (x === monster.x && y === monster.y) {
                cell.innerHTML = monsterSVG;
                cell.classList.add("monster");
            }

            grid.appendChild(cell);
        }
    }
}


function moveMonster() {
    let moves = [
        { x: monster.x, y: monster.y - 1 }, // Up
        { x: monster.x, y: monster.y + 1 }, // Down
        { x: monster.x - 1, y: monster.y }, // Left
        { x: monster.x + 1, y: monster.y }  // Right
    ];

    for (let move of moves) {
        if (
            move.y >= 0 && move.y < gridSize &&
            move.x >= 0 && move.x < gridSize &&
            maze[move.y][move.x] === 1 && 
            !(move.x === lastMonsterPos.x && move.y === lastMonsterPos.y) 
        ) {
            lastMonsterPos = { x: monster.x, y: monster.y }; 
            monster.x = move.x;
            monster.y = move.y;
            break;
        }
    }

    if (monster.x === you.x && monster.y === you.y) {
        alert("GAME OVER.");
        resetGame();
        return;
    }

    createGrid();
}

function shuffleControls() {
    let directions = ["up", "down", "left", "right"];
    let keys = Object.keys(controls);
    directions.sort(() => Math.random() - 0.5);
    keys.forEach((key, index) => {
        controls[key] = directions[index];
    });
}

document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    let movex = you.x;
    let movey = you.y;
    let action = controls[e.key.toLowerCase()];

    if (action === "up") movey--;
    if (action === "down") movey++;
    if (action === "left") movex--;
    if (action === "right") movex++;

    if (movex === monster.x && movey === monster.y) {
        alert("GAME OVER.");
        resetGame();
        return;
    }

    if (movey >= 0 && movey < gridSize && movex >= 0 && movex < gridSize && maze[movey][movex] === 1) {
        you.x = movex;
        you.y = movey;
    }

    if (you.x === finishLine.x && you.y === finishLine.y) {
        alert("WINNER");
        setTimeout(() => {
            window.location.href = "/after_game";  // Redirect - ADD ROUTE TO NEXT GAME
        }, 2000);
        return;
    }

    createGrid();
});

function resetGame() {
    gameRunning = false;

    clearInterval(monsterInterval);
    clearInterval(shuffleInterval);

    you = { x: 1, y: 1 };
    monster = { x: 0, y: 0 };
    lastMonsterPos = { x: -1, y: -1 };

    createGrid();
    startGame();
}

function startGame() {
    if (gameRunning) return;

    gameRunning = true;

    you = { x: 1, y: 1 };
    monster = { x: 0, y: 0 };
    lastMonsterPos = { x: -1, y: -1 };

    monsterInterval = setInterval(moveMonster, 1000);
    shuffleInterval = setInterval(shuffleControls, 3000);

    createGrid();
}


startGame();
