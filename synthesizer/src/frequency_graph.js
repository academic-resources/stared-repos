import context from './context';

export default class FrequencyGraph {
  constructor() {
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = 256;
    this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
    this.draw = this.draw.bind(this);
    this.draw();
  }

  draw() {
    const canvas = document.getElementById('frequencies');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 1100;
    canvas.height = 200;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.analyser.getByteFrequencyData(this.frequencies);
    const barWidth = (canvas.width / this.frequencies.length) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < this.frequencies.length; i++) {
      barHeight = this.frequencies[i] - 100;
      ctx.fillStyle = `rgb(153, 247, ${barHeight + 100})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
    requestAnimationFrame(this.draw);
  }
}
