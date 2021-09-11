import context from './context';

export default class Oscilloscope {
  constructor() {
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.waveform = new Uint8Array(this.analyser.frequencyBinCount);
    // this.analyser.getFloatTimeDomainData(this.waveform);
    this.draw = this.draw.bind(this);
    this.analyser.smoothingTimeConstant = 0.85;
    this.draw();
    // this.updateWaveform();
  }

  draw() {
    const canvas = document.getElementById('oscilloscope');
    const ctx = canvas.getContext('2d');
    this.analyser.getByteTimeDomainData(this.waveform);
    canvas.width = 300;
    canvas.height = 250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const sliceWidth = (canvas.width * 1.0) / this.waveform.length;
    let x = 0;
    for (let i = 0; i < this.waveform.length; i++) {
      let v = this.waveform[i] / 128.0;
      let y = (v * canvas.height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.strokeStyle = 'rgb(118, 80, 223)';
    ctx.lineWidth = 3;
    ctx.stroke();
    requestAnimationFrame(this.draw);
    // setTimeout(this.draw, 100);
  }
}
