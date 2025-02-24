function setup () {
    const cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.position(0, 0);
    let sizeA = 100
    let sizeB = 100
    let colourA = [0, 255, 0] // green
    let colourB = [0, 0, 255] // blue
    let colours = [[180, 100, 0], [180, 0, 100], [100, 180, 0], [0, 180, 100], [100, 0, 180], [0, 100, 180]]
    let velBounds = 10
    let numBalls = 120

    // Test
    // A = new Ball(
    // createVector(random(sizeA/2, width - sizeA/2), random(sizeA/2, height - sizeA/2)),
    // createVector(random(-5, 5), random(-5, 5)),
    // sizeA,
    // colourA
    // );

    // B = new Ball(
    // createVector(random(sizeB/2, width - sizeB/2), random(sizeB/2, height - sizeB/2)),
    // createVector(random(-5, 5), random(-5, 5)),
    // sizeB,
    // colourB
    // );

    // Set
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        size = random(50, 70)
        balls[i] = new Ball(
            createVector(random(size/2, width - size/2), random(size/2, height - size/2)),
            createVector(random(-velBounds, velBounds), random(-velBounds, velBounds)),
            size,
            random(colours)
        )
    }
}

function draw () {
    background(200);

    // Set
    for (let ball of balls) {
        ball.update();
        for (let bal of balls) {
            if (bal != ball) {
                bal.collide(ball)
            }
        }
        ball.show();
    }
    
    // Test
    // A.update()
    // B.update()
    // A.collide(B)
    // A.show()
    // B.show()
}