import Oscillator from './oscillator';
import Synth from './synth';

document.addEventListener('DOMContentLoaded', () => {
  // document.querySelector('button').addEventListener('click', function() {
  //   const osc1 = new Oscillator(440, 'sine');
  //   // const osc2 = new Oscillator(440, 'square');
  // });
  new Synth();
});
