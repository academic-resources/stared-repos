const Level = require('./level')
const Bird = require('./bird')


class Game {
    constructor(canvas) {

        this.animate = this.animate.bind(this)
        this.restart = this.restart.bind(this)
        this.play = this.play.bind(this)
        this.click = this.click.bind(this)

        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.canvas.addEventListener('mousedown',() => this.click());
        // this.canvas.addEventListener('mousedown',() => alert("ssss"));
        console.log(this.canvas);
        
        this.restart()

    }

    animate() {
        this.level.animate(this.context)
        this.bird.animate(this.context)
        if(this.running) requestAnimationFrame(this.animate)
    }

    restart() {
        this.level = new Level(this.width, this.height)
        this.bird = new Bird(this.width, this.height);
        this.animate()
        this.running = false
    }

    play() {
        this.running = true
        this.animate()
    }

    click(){
        
        if (!this.running){
            this.play();    
        }
        this.bird.flap();

    }
}

module.exports = Game;