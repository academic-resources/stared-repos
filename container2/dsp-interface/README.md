**Basic DSP Interface**

    npm install dsp-interface

Require this real-time, socketed HTML5 / Touch compatible interface for some of your DSP needs. It returns just two arrays, values and and exponents.

    var mui = require('dsp-interface');

    mui.val[0] = 0 - 11 inclsuive, interval 1  
    mui.val[1] = 10 - 11 inclusive, interval 1
    mui.val[2] = -12 - 12 inclusive, interval 1 
    mui.val[3-9] = 0.0 - 9.9 inslcusive, interval 0.1

    mui.epx[0-1] = 0
    mui.exp[2-9] = 0-3 inclusive, inetrval 1

![pretty generic!](http://i.imgur.com/ix99W.jpg)

**POSTED:** This is a string transporting, float parsing, pseudo midi signal! The GUI is a clumsy, DOM based implementation with non-continunous values! And I traded multi-touch non working range sliders for single touch capable sliders that actually work... so it works on the ipad.

Future version will be nice tho: binary transport, real midi, canvas face, continuous value ranges.

The interface has 10 range sliders, and 8 corresponding exponents buttons.

    var gui = require('dsp-interface');

    gui.start(5001); // optional port, defaults to 8012

    gui.val // a length 10 array
    gui.exp // a length 10 array ([0] and [1] are always zero);

    function(time){
      return Math.sin( time * Math.PI * ( gui.val[3] * Math.pow(10, gui.exp[3]) ))
    }

**You can set your initial values**

    var mui = require('dsp-interface');

    var values = [1, 1, -10, 1.1, 2.2, 3.3, 4.4, 5.5, 6.9, 8.2]; // there are 10 range sliders

    var exponents = [0, 0, 1, 1, 2, 2, 3, 3, 3, 3]; // also ten, but only 8 lines have exponent switches. The first two indecies will always be zero!!!!!!

    mui.start(5001, values, exponents)

**the interface will start at those values**

**API**

*interface.val*

* val[0] and val[1] have range [0,11] inclusive to correspond with either cranking it past ten, or for 12 octaves for each of the 12 note classes in the western scale. Why 12 octaves? You can't hear 7 hertz, but you can feel it!

* val[2]'s range is [-12, 12] inclusive (for semitones). It is the only line with negative values.

* vals 3-9 have range [0, .9.9] at intervals of 0.1. 

*interface.exp*

* ui.exp channels 2-9 return values 0-3, meant to be used to define the exponent for the their corresponding channels values. exp[0] and exp[1] are always zero.

* exp[0] and exp[1] are not used, and always zero

TODO:

* Add incr / decr buttons to range sliders
* Add on/off punch buttons
* Add placeholders for values you want to come back to