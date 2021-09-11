/* ——— https://codepen.io/lefrenk/pen/YedpoY ——— */
const blocks = document.querySelectorAll('.block')

class Block {
  constructor(value) {
    this.div = value
    this.div.addEventListener('mousedown', this.launch)
    this.div.addEventListener('mouseup', this.land)
    this.div.addEventListener('click', this.moveTop)
    this.interval
  }

  launch(event) {
    let count = 0,
        x = 0,
        y = 0,
        deg = 0

    const move = (x, y, deg) => event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)'

    this.interval = setInterval(() => {
      if (count >= 200) {
        clearInterval(this.interval)
      } else if (count >= 150) {
        count += 1
        move(x, y -= 1, deg += 9)
      } else if (count >= 100) {
        count += 1
        move(x -= 1, y, deg += 9)
      } else if (count >= 50) {
        count += 1
        move(x, y += 1, deg += 9)
      } else {
        count += 1
        move(x += 1, y, deg += 9)
      }
    }, 10)
  }

  land(event) {
    clearInterval(this.interval)
    event.target.style.transform = 'translate(0px)'
  }

  moveTop(event) {
    event.target.parentNode.prepend(event.target)
  }
}

blocks.forEach(item => new Block(item))
