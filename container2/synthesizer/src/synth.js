import context from './context';
import Oscillator from './oscillator';
import AmpEnvelope from './amp_envelope';
import { keymappings } from './keymappings';
import Oscilloscope from './oscilloscope';
import FrequencyGraph from './frequency_graph';

export default class Synth {
  constructor() {
    window.addEventListener('keydown', e => this.handleDown(e));
    window.addEventListener('keyup', e => this.handleUp(e));
    const keyboardKeys = document.getElementsByClassName('keys');
    Array.from(keyboardKeys).forEach(key => {
      key.addEventListener('mousedown', e => this.handleDown(e));
      key.addEventListener('mouseup', e => this.handleUp(e));
    });
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.play = this.play.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.oscillators = {};
    this.filter = context.createBiquadFilter();
    this.gain = context.createGain();
    this.gain.connect(this.filter);
    this.gain.gain.setValueAtTime(0, context.currentTime);
    const oscilloscope = new Oscilloscope();
    const frequencyGraph = new FrequencyGraph();
    this.filter.connect(frequencyGraph.analyser);
    this.filter.connect(oscilloscope.analyser);
    this.filter.connect(context.destination);
    // this.attackControl = document.getElementById('attack');
    // this.releaseControl = document.getElementById('release');
    const filterControl = document.getElementById('lpf');

    // this.gain.linearRampToValueAtTime(0, context.currentTime + this.attackTime + this.releaseTime);
    this.filter.frequency.setValueAtTime(
      filterControl.value,
      context.currentTime
    );
    filterControl.addEventListener('input', e => this.handleFilterChange(e));
    // gainControls = document.getElementsByClassName('gain-slider')
    // gainControls.addEventListener('change', e => this.handleGainChange(e))
  }

  handleFilterChange(e) {
    this.filter.frequency.setValueAtTime(e.target.value, context.currentTime);
  }

  handleDown(e) {
    const key = e.type === 'keydown' ? e.which.toString() : e.target.id;
    // console.log(keymappings);
    // const attackTime = parseFloat(this.attackControl.value);
    if (keymappings[key] && !this.oscillators[key]) {
      // this.gain.gain.cancelScheduledValues(context.currentTime);
      // this.gain.gain.setValueAtTime(0, context.currentTime);
      document.getElementById(key).classList.add('pressed');
      this.play(key);
      // this.gain.gain.linearRampToValueAtTime(
      //   1,
      //   context.currentTime + attackTime
      // );
    }
  }

  handleUp(e) {
    // const key = e.which.toString();
    const key = e.type === 'keyup' ? e.which.toString() : e.target.id;
    if (keymappings[key]) {
      document.getElementById(key).classList.remove('pressed');
      // const releaseTime = parseFloat(this.releaseControl.value);
      // this.gain.gain.linearRampToValueAtTime(
      //   0,
      //   context.currentTime + releaseTime
      // );
      this.oscillators[key].forEach(osc => {
        osc.ampEnvelope.rampDown();
        osc.osc.stop(context.currentTime + osc.ampEnvelope.releaseTime);
      });
      delete this.oscillators[key];
    }
  }

  play(key) {
    const freq = keymappings[key];
    const ampEnvelope = new AmpEnvelope();
    ampEnvelope.gain.connect(this.filter);
    const osc1 = new Oscillator(freq, 'sine', ampEnvelope);
    const osc2 = new Oscillator(freq, 'sawtooth', ampEnvelope);
    const osc3 = new Oscillator(freq, 'square', ampEnvelope);
    const oscillators = [osc1, osc2, osc3];
    // const attackTime = parseFloat(this.attackControl.value);
    // this.gain.gain.cancelScheduledValues(context.currentTime);
    // this.gain.gain.setValueAtTime(0, context.currentTime);
    // ampEnvelope.gain.connect(this.gain);
    oscillators.forEach(osc => {
      osc.osc.start();
    });
    // this.gain.gain.setValueAtTime(0, context.currentTime);
    // this.gain.gain.linearRampToValueAtTime(1, context.currentTime + attackTime);
    this.oscillators[key] = oscillators;
  }
}
