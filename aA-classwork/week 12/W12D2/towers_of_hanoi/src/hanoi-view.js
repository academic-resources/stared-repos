
class View {
    constructor(game, $el) {
        this.game = game;
        this.$el = $el;
        this.setupTowers();
        this.render();
        this.fromTower = null;
        this.$el.on('click', 'ul', this.clickTower.bind(this));
    }

    setupTowers() {
        for (let i = 0; i < 3; i++) {
            let $ul = $('<ul>');
            this.$el.append($ul);
        }
        const firstUl = $('ul')[0];
        const $firstUl = $(firstUl);
        // debugger
        const $large = $('<li>').addClass('large');
        const $medium = $('<li>').addClass('medium');
        const $small = $('<li>').addClass('small');;
        $firstUl.append($small);
        $firstUl.append($medium);
        $firstUl.append($large);
        
    }

    render() {

    }

    clickTower(event) {
        event.stopPropagation();
        const $tower = $(event.currentTarget);
        // debugger
        if (this.fromTower === null) {
            this.fromTower = $tower
            // debugger
        } else {
            if (this.game.move(this.fromTower.index(), $tower.index())) {
                const $from = $(this.fromTower)[0];
                const $top = $($from.firstChild);
                ($top).remove();
                ($tower).prepend($top);
                // debugger

                this.fromTower = null;
            } else {
                alert("invalid move");
            }
        }

        if (this.game.isWon()) {
            let $h1 = $('<h1>').text("You Win!");
            const $body = $('body');
            $body.append($h1);
        }
        // debugger
    }
}

module.exports = View;