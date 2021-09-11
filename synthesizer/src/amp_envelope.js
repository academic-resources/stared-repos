import context from './context';

export default class AmpEnvelope {
  constructor() {
    this.gain = context.createGain();
    this.attackControl = document.getElementById('attack');
    this.releaseControl = document.getElementById('release');
    const attackTime = parseFloat(this.attackControl.value);
    this.releaseTime = parseFloat(this.releaseControl.value);
    this.gain.gain.cancelScheduledValues(context.currentTime);
    this.gain.gain.setValueAtTime(0, context.currentTime);
    this.gain.gain.linearRampToValueAtTime(1, context.currentTime + attackTime);
    this.rampDown = this.rampDown.bind(this);
  }

  rampDown() {
    this.gain.gain.linearRampToValueAtTime(
      0,
      context.currentTime + this.releaseTime
    );
  }
}
