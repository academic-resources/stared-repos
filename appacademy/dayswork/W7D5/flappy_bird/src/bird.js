const CONSTANTS = {
    GRAVITY: 0.8,
    FLAP_SPEED: -8,
    TERMINAL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
};

class Bird {
    constructor(width, height){
        this.velocity = 0;
        this.width = width;
        this.height = height;
        this.x = width / 3
        this.y = height / 2
    }

    drawBird( context ) {
        context.fillStyle = 'purple';
        context.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate(context) {
        this.move()
        this.drawBird(context)
    }

    move() {
        this.velocity += this.y
        this.velocity += CONSTANTS.GRAVITY
    }

    flap() {
        this.velocity = CONSTANTS.FLAP_SPEED
    }
}

module.exports = Bird