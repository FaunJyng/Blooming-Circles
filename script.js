class Utils {
    static randNum(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randVel(acl) {
        return (Math.random() - 0.5) * acl;
    }
}

class Circle {
    static colors = [
        '#4335A7',
        '#80C4E9',
        '#FFF6E9',
        '#FF7F3E',
        '#0d1e25'
    ];
    constructor(currentRadius, x, y, dx, dy, color, maxRadius) {
        this.currentRadius = currentRadius;
        this.minRadius = currentRadius;
        this.maxRadius = maxRadius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        brush.beginPath();
        brush.fillStyle = this.color;
        brush.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
        brush.strokeStyle = `rgba(0,0,0,0)`;
        brush.fill();
        brush.stroke();
    }

    update() {
        if (this.x + this.currentRadius > canvas.width || this.x - this.currentRadius < 0)
            this.dx = -this.dx;
        if (this.y + this.currentRadius > canvas.height || this.y - this.currentRadius < 0)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;

        if(Math.abs(this.x - mouse.x) < 40
        && Math.abs(this.y - mouse.y) < 40){
            if (this.currentRadius < this.maxRadius)
                this.currentRadius += 3.5;
        } else if (this.currentRadius > this.minRadius){
            this.currentRadius -= 1;
        }

        this.draw();
    }
}

function initCircleArr(numberOfCircle) {
    let circles = [];
    for (let i = 0; i < numberOfCircle; i++) {
        let radius = Math.round(Utils.randNum(1,4));
        let x = Utils.randNum(radius, canvas.width - radius);
        let y = Utils.randNum(radius, canvas.height - radius);
        let dx = Utils.randVel(3);
        let dy = Utils.randVel(3);
        let maxR = radius * 11;
        let color = Circle.colors[Math.round(Utils.randNum(0,Circle.colors.length))];
        circles.push(new Circle(radius, x, y, dx, dy, color, maxR));
    }
    return circles;
}

var canvas = document.querySelector('canvas');
var brush = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var numberOfCircle = 1000;
var circles = initCircleArr(numberOfCircle);
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', event => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circles = initCircleArr(numberOfCircle);
});

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
})

console.log(brush);

function animate() {
    brush.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
        circle.update();
    }
    requestAnimationFrame(animate);
}

animate();




