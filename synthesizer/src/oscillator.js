import context from './context';
import AmpEnvelope from './amp_envelope';

export default class Oscillator {
  constructor(freq, type, ampEnvelope) {
    this.osc = context.createOscillator();
    this.osc.type = type;
    this.gain = context.createGain();
    this.osc.frequency.value = freq;
    this.osc.connect(this.gain);
    this.ampEnvelope = ampEnvelope;
    this.gain.connect(this.ampEnvelope.gain);
    // this.gain.connect(context.destination);
    const gainControl = document.getElementById(`${type}-gain`);
    this.gain.gain.setValueAtTime(gainControl.value, context.currentTime);
    gainControl.addEventListener('input', e => this.handleGainChange(e));
  }

  handleGainChange(e) {
    // this.gain.gain.value = e.target.value;
    this.gain.gain.setValueAtTime(e.target.value, context.currentTime);
  }
}
