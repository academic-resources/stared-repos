/* ——— https://codepen.io/lefrenk/pen/YedpoY ——— */
const blocks = document.querySelectorAll('.block')

blocks.forEach(block => {
  block.addEventListener('click', () => {
    const parent = block.parentNode
    parent.removeChild(block)
    parent.prepend(block)
  })
  block.addEventListener('mousedown', () => {
    block.style.transform = 'translate(75px)'
  })
  block.addEventListener('mouseup', () => {
    block.style.transform = 'translate(0px)'
  })
})
