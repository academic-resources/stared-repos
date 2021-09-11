# Wavy Web Synthesizer

> A classic three oscillator synth with filter and amplitude controls.

[Live](https://jm-riley.github.io/synthesizer/)

![synth](https://raw.githubusercontent.com/jm-riley/synthesizer/master/dist/synth_screenshot.png)

# MVPs

- Interactive keyboard with click events and keybindings
- User can mix sine, sawtooth, and square waves together to create the desired output tone
- Basic control over the amplitude envelope (attack, release)
- Asjustable filter to cutoff low end frequencies

![synth outline](https://raw.githubusercontent.com/jm-riley/synthesizer/master/dist/outline.png)

## Technologies Used

- Vanilla Javascript
- Web Audio API

## Web Audio API Usage

The Web Audio API is a high-level JavaScript API meant to provide a more powerful way to implement and interact with audio within web applications. Much like HTML Canvas, most of the Web Audio API's functionality revolves around a context. From this context, you're able to create audio nodes and link them together in a number of ways. 

There are many different types of audio nodes, one of which is the OscillatorNode. When creating a new node, you have the ability to define its' frequency and waveform type. I mapped appropriate frequencies to individual keys, and used the OscillatorNode to create three new waveforms (sine, square, and sawtooth) on each keypress. 

## Oscilloscope and Frequency Graph

Both utilize an HTML canvas element and the Web Audio API's analyser node. Data is stored and continually updated in an array using analyser node functions, either getByteFrequencyData for the frequency graph, or getByteTimeDomainData for the oscilloscope. Both classes implement a similar draw function that iterate through the array of data and draw the relevant points to their associated canvas elements.

![oscilloscope](https://raw.githubusercontent.com/jm-riley/synthesizer/master/dist/oscilloscope_gif.gif)

![frequency graph](https://raw.githubusercontent.com/jm-riley/synthesizer/master/dist/frequency_gif.gif)
