let holes = [];
let moles = [];
let score = 0;
let gameOver = false;
let gameInterval;
let isGameRunning = false;
let hitPositions = [];

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('gameCanvas');

    // 创建洞
    for (let i = 0; i < 9; i++) {
        holes.push(new Hole(50 + (i % 3) * 100, 50 + Math.floor(i / 3) * 100));
    }

    // 初始化地鼠
    for (let i = 0; i < 3; i++) {
        moles.push(new Mole());
    }
}

function draw() {
    background(200);

    // 绘制洞
    for (let hole of holes) {
        hole.display();
    }

    // 绘制地鼠
    for (let mole of moles) {
        mole.display();
    }

    // 绘制击中的位置
    for (let pos of hitPositions) {
        fill(255, 0, 0);
        ellipse(pos.x, pos.y, 20, 20);
    }

    // 显示分数
    fill(0);
    textSize(24);
    text('Score: ' + score, 10, 30);

    // 游戏结束
    if (gameOver) {
        fill(255, 0, 0);
        textSize(48);
        text('Game Over', width / 2 - 100, height / 2);
    }
}

function mousePressed() {
    if (gameOver) return;

    for (let mole of moles) {
        if (mole.isVisible && mole.contains(mouseX, mouseY)) {
            mole.isVisible = false;
            score++;
            hitPositions.push({ x: mole.x, y: mole.y });
        }
    }

    // 检查是否所有地鼠都被捕捉
    if (moles.every(mole => !mole.isVisible)) {
        generateNewMoles();
    }
}

function showRandomMole() {
    if (gameOver) return;

    // 隐藏所有地鼠
    for (let mole of moles) {
        mole.isVisible = false;
    }

    // 随机显示一个地鼠
    let randomIndex = Math.floor(Math.random() * moles.length);
    moles[randomIndex].show();
}

function generateNewMoles() {
    // 清空击中位置
    hitPositions = [];

    // 生成新的一组地鼠
    moles = [];
    for (let i = 0; i < 3; i++) {
        moles.push(new Mole());
    }
}

class Hole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        fill(0);
        ellipse(this.x, this.y, 50, 50);
    }
}

class Mole {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.isVisible = false;
    }

    show() {
        let randomHole = holes[Math.floor(Math.random() * holes.length)];
        this.x = randomHole.x;
        this.y = randomHole.y;
        this.isVisible = true;
    }

    display() {
        if (this.isVisible) {
            fill(100, 50, 0);
            ellipse(this.x, this.y, 30, 30);
        }
    }

    contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        return d < 15;
    }
}

function startGame() {
    if (!isGameRunning) {
        score = 0;
        gameOver = false;
        setup();
        gameInterval = setInterval(showRandomMole, 1000);
        isGameRunning = true;
        document.getElementById('startButton').textContent = 'Finish';
    } else {
        clearInterval(gameInterval);
        isGameRunning = false;
        document.getElementById('startButton').textContent = 'Start';
    }
}

document.getElementById('startButton').addEventListener('click', startGame);