class Ball {
    constructor(startPos, startVel, size, colour) {
        this.position = startPos;
        this.velocity = startVel;
        this.size = size;
        this.colour = colour
    }

    setVelocity(newVelocity) {
        this.velocity = newVelocity;
    }

    update() {
        this.position.add(this.velocity);
        if ((this.position.y + this.size/2) > height) {
            this.position.y = height - this.size/2;
            this.velocity.y *= -1;
            this.friction()
        } else if (this.position.y < this.size/2) {
            this.position.y = this.size/2
            this.velocity.y *= -1;
            this.friction()
        }
        if ((this.position.x + this.size/2) > width) {
            this.position.x = width - this.size/2;
            this.velocity.x *= -1;
            this.friction()
        } else if (this.position.x < this.size/2) {
            this.position.x = this.size/2
            this.velocity.x *= -1;
            this.friction()
        }
        
    }

    friction() {
        this.velocity.setMag(this.velocity.mag() - 0.1)
    }

    collide(other) {
        if (other.position.dist(this.position) < this.size/2 + other.size/2) {
            let pDiff = p5.Vector.sub(other.position, this.position);
            let vDiff = p5.Vector.sub(other.velocity, this.velocity);
            let d = pDiff.mag()
            // correct overlap
            let overlap = d - (this.size/2 + other.size/2)
            let dir = pDiff.copy();
            dir.setMag(overlap * 0.5);
            this.position.add(dir);
            other.position.sub(dir);

            let mass = (this.size + other.size);


            // A - (This)
            let numA = (2 * other.size) * vDiff.dot(pDiff)
            let denA = mass * p5.Vector.magSq(pDiff)

            let fracA = numA/denA;
            // B - Other
            let numB = (2 * this.size) * vDiff.dot(pDiff)
            let denB = mass * p5.Vector.magSq(pDiff)

            let fracB = numB/denB;
            
            this.velocity.add(pDiff.copy().mult(fracA))
            other.velocity.sub(pDiff.copy().mult(fracB))
            this.friction()
        }
    }

    show() {
        fill(this.colour[0], this.colour[1], this.colour[2]);
        stroke(0);
        circle(this.position.x, this.position.y, this.size);
    }
}

// let plane = this.velocity.copy().add(other.velocity);
// let angleA = this.velocity.angleBetween(plane);
// let angleB = other.velocity.angleBetween(plane);
// let magA = this.velocity.mag();
// let magB = other.velocity.mag();