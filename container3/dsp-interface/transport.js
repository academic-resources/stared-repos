var shoe = require('shoe');
var domready = require('domready');

var el0 = document.getElementById('line,0,val,');
var el1 = document.getElementById('line,1,val,');
var el2 = document.getElementById('line,2,val,');
var el3 = document.getElementById('line,3,val,');
var el4 = document.getElementById('line,4,val,');
var el5 = document.getElementById('line,5,val,');
var el6 = document.getElementById('line,6,val,');
var el7 = document.getElementById('line,7,val,');
var el8 = document.getElementById('line,8,val,');
var el9 = document.getElementById('line,9,val,');

var exp2 = document.getElementById('line,2,exp,');
var exp3 = document.getElementById('line,3,exp,');
var exp4 = document.getElementById('line,4,exp,');
var exp5 = document.getElementById('line,5,exp,');
var exp6 = document.getElementById('line,6,exp,');
var exp7 = document.getElementById('line,7,exp,');
var exp8 = document.getElementById('line,8,exp,');
var exp9 = document.getElementById('line,9,exp,');

var val = [0,0,0,0,0,0,0,0,0,0];
var exp = [0,0,0,0,0,0,0,0,0,0];


function setSlideOpts (el, min, max, step, stream){
 var slideOpts = {
   inp: el,
   step: step,
   min: min,
   max: max,
   vertical: true,
   hideInput: true,
   animation: 'tween',
   callbacks: {
    change: [function(e){
      stream.write(el.id + e.value);
      val[el.id.split(',')[1]] = eval(e.value);
    }]
   }
 } 

 Object.keys(slideOpts).forEach(function(e){
   if (slideOpts[e] === null) delete slideOpts[e]
 })

 return slideOpts
 
}

Touchy.stopWindowBounce();

domready(function () {

    var stream = shoe('/barnstorm');
    var x;

    var opts9 = setSlideOpts(el9, 0, 10, .1, stream ) // volume
    var opts0 = setSlideOpts(el0, null, null, null, stream ) // note class
    var opts1 = setSlideOpts(el1, null, null, null, stream ) // note octave
    var opts2 = setSlideOpts(el2, null, null, null, stream ) // note semitone

    var opts3 = setSlideOpts(el3, .1, 9.9, .1, stream )
    var opts4 = setSlideOpts(el4, .1, 9.9, .1, stream )

    var opts5 = setSlideOpts(el5, .1, 9.9, .1, stream )
    var opts6 = setSlideOpts(el6, .1, 9.9, .1, stream )

    var opts7 = setSlideOpts(el7, .1, 9.9, .1, stream )
    var opts8 = setSlideOpts(el8, .1, 9.9, .1, stream )

    fdSlider.createSlider(opts1);
    fdSlider.createSlider(opts2);
    fdSlider.createSlider(opts3);
    fdSlider.createSlider(opts4);
    fdSlider.createSlider(opts5);
    fdSlider.createSlider(opts6);
    fdSlider.createSlider(opts7);
    fdSlider.createSlider(opts8);
    fdSlider.createSlider(opts9);
    fdSlider.createSlider(opts0);

    var radios = document.getElementsByTagName('input');
    var r;
    for(r = 0; r < radios.length; r+=1){
	if (radios[r].type == 'radio'){
            radios[r].addEventListener('click', function(eve){
		stream.write(this.id);
            }, true)
	}

    };

    stream.on('data', function(a){
	var a = a.split(',');
	var b = a.splice(10,20);
	a.forEach(function(x, i){
	    var v = val[i] - parseFloat(x);
	    if(i < 3){
		fdSlider.increment('line,'+i+',val,', parseFloat(x))
	    };
	    if(i >= 3) fdSlider.increment('line,'+i+',val,', parseFloat(x) * 10);
	});
	b.forEach(function(y, i){
	    var els = document.getElementsByName('line,'+i+',exp,')[y];
	    if(els) els.checked = true;
	});
    });
    
});
