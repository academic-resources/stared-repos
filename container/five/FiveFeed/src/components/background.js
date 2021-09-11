import React, { PureComponent } from 'react'
import styled from 'styled-components'
import a from '../images/a.svg'
import c from '../images/c.svg'
import x from '../images/x.svg'
import o from '../images/o.svg'

const Canvas = styled.canvas`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`

const ConfettiGenerator = function (params) {
  const appstate = {
    target: 'confetti-holder',
    max: 80,
    size: 1,
    animate: true,
    props: [], // 'circle', 'square', 'triangle', 'line'
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126],
    ],
    clock: 25,
    interval: null,
    rotate: false,
    width: window.innerWidth,
    height: window.innerHeight,
  }

  if (params) {
    if (params.target) appstate.target = params.target
    if (params.max) appstate.max = params.max
    if (params.size) appstate.size = params.size
    if (params.animate !== undefined && params.animate !== null)
      appstate.animate = params.animate
    if (params.props) appstate.props = params.props
    if (params.colors) appstate.colors = params.colors
    if (params.clock) appstate.clock = params.clock
    if (params.width) appstate.width = params.width
    if (params.height) appstate.height = params.height
    if (params.rotate !== undefined && params.rotate !== null)
      appstate.rotate = params.rotate
  }

  const cv = document.getElementById(appstate.target)
  const ctx = cv.getContext('2d')
  let particles = []

  function rand(limit, floor) {
    if (!limit) limit = 1
    const rand = Math.random() * limit
    return !floor ? rand : Math.floor(rand)
  }

  const totalWeight = appstate.props.reduce(function (weight, prop) {
    return weight + (prop.weight || 1)
  }, 0)

  function selectProp() {
    let rand = Math.random() * totalWeight
    for (let i = 0; i < appstate.props.length; ++i) {
      const weight = appstate.props[i].weight || 1
      if (rand < weight) return i
      rand -= weight
    }
  }

  function particleFactory() {
    const prop = appstate.props[selectProp()]
    const p = {
      prop: prop.type ? prop.type : prop,
      x: rand(appstate.width),
      y: rand(appstate.height),
      src: prop.src,
      radius: rand(4) + 1,
      size: prop.size,
      rotate: appstate.rotate,
      line: Math.floor(rand(65) - 30),
      angles: [
        rand(10, true) + 2,
        rand(10, true) + 2,
        rand(10, true) + 2,
        rand(10, true) + 2,
      ],
      color: appstate.colors[rand(appstate.colors.length, true)],
      rotation: (rand(360, true) * Math.PI) / 180,
      speed: rand(appstate.clock / 7) + appstate.clock / 30,
    }

    return p
  }

  function particleDraw(p) {
    const op = p.radius <= 3 ? 0.4 : 0.8

    ctx.fillStyle = ctx.strokeStyle = 'rgba(' + p.color + ', ' + op + ')'
    ctx.beginPath()

    switch (p.prop) {
      case 'circle': {
        ctx.moveTo(p.x, p.y)
        ctx.arc(p.x, p.y, p.radius * appstate.size, 0, Math.PI * 2, true)
        ctx.fill()
        break
      }
      case 'triangle': {
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(
          p.x + p.angles[0] * appstate.size,
          p.y + p.angles[1] * appstate.size
        )
        ctx.lineTo(
          p.x + p.angles[2] * appstate.size,
          p.y + p.angles[3] * appstate.size
        )
        ctx.closePath()
        ctx.fill()
        break
      }
      case 'line': {
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x + p.line * appstate.size, p.y + p.radius * 5)
        ctx.lineWidth = 2 * appstate.size
        ctx.stroke()
        break
      }
      case 'square': {
        ctx.save()
        ctx.translate(p.x + 15, p.y + 5)
        ctx.rotate(p.rotation)
        ctx.fillRect(
          -15 * appstate.size,
          -5 * appstate.size,
          15 * appstate.size,
          5 * appstate.size
        )
        ctx.restore()
        break
      }
      case 'svg': {
        ctx.save()
        const image = new Image()
        image.src = p.src
        const size = p.size || 15
        ctx.translate(p.x + size / 2, p.y + size / 2)
        if (p.rotate) ctx.rotate(p.rotation)
        ctx.drawImage(
          image,
          -(size / 2) * appstate.size,
          -(size / 2) * appstate.size,
          size * appstate.size,
          size * appstate.size
        )
        ctx.restore()
        break
      }
      default: {
        break
      }
    }
  }

  const _clear = function () {
    appstate.animate = false
    clearInterval(appstate.interval)

    requestAnimationFrame(function () {
      ctx.clearRect(0, 0, cv.width, cv.height)
      const w = cv.width
      cv.width = 1
      cv.width = w
    })
  }

  const _render = function () {
    cv.width = appstate.width
    cv.height = appstate.height
    particles = []

    for (let i = 0; i < appstate.max; i++) particles.push(particleFactory())

    let start = new Date().getTime()

    function draw() {
      if (appstate.animate) requestAnimationFrame(draw)

      const current = new Date().getTime()
      const delta = current - start
      ctx.clearRect(0, 0, appstate.width, appstate.height)

      particles.forEach((i) => particleDraw(i))

      if (delta >= 20) {
        update()
        start = new Date().getTime()
      } else {
        cancelAnimationFrame(draw)
      }
    }

    function update() {
      for (let i = 0; i < appstate.max; i++) {
        const p = particles[i]
        if (appstate.animate) p.y += p.speed

        if (p.rotate) p.rotation += p.speed / 35

        if (
          (p.speed >= 0 && p.y > appstate.height) ||
          (p.speed < 0 && p.y < 0)
        ) {
          particles[i] = p
          particles[i].x = rand(appstate.width, true)
          particles[i].y = p.speed >= 0 ? -10 : parseFloat(appstate.height)
        }
      }
    }

    return requestAnimationFrame(draw)
  }

  return {
    render: _render,
    clear: _clear,
  }
}

export default class Background extends PureComponent {
  confetti = null

  componentDidMount() {
    const settings = {
      target: 'canvas',
      clock: 10,
      colors: [
        [68, 73, 92],
        [24, 43, 58],
        [50, 55, 76],
      ],
      props: [
        'circle',
        'square',
        'triangle',
        { type: 'svg', src: a },
        { type: 'svg', src: c },
        { type: 'svg', src: x },
        { type: 'svg', src: o },
      ],
    }
    this.confetti = new ConfettiGenerator(settings)
    this.confetti.render()
  }

  componentWillUnmount() {
    this.confetti.clear()
  }

  render() {
    return <Canvas id="canvas" />
  }
}
