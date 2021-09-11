function AboutMe() {
  document.getElementById("home").innerHTML = 
  "Hi, my name is Anguel Metodiev. <br> I am interested in Machine Learning and Natural Language Processing. <br> I am currently taking: <br>Internet and Web Technologies, <br> CSCI 343 - Computer Architecture, <br> CSCI 340 - Operating Systems Principles, <br> CSCI 381 - Natural Language Processing, <br> CSCI 331 - Database Systems, <br> CSCI 320 - Theory of Computation, <br> CSCI 370 - Software Engineering";
}

function ContactMe() {
  document.getElementById("home").innerHTML = 
  "Email: me@anguelmetodiev.com";
}

function BrowserInfo() {
  var x = "User-agent header sent: " + navigator.userAgent;
  document.getElementById("home").innerHTML = x;
}

function WindowInfo() {
	
var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var x = document.getElementById("home");
x.innerHTML = "Browser inner dimmensions are: <br> Width: " + w + "<br> Height: " + h ;
}



function applyOrientation() {
  if (window.innerHeight < window.innerWidth) {
   document.getElementById("home").innerHTML = "You are now in landscape mode";
  } else {
    if (window.innerHeight < window.innerWidth) {
	document.getElementById("home").innerHTML = "You are now in landscape mode";
  } else {
    document.getElementById("home").innerHTML = "You are now in portrait mode";
  }
}}

function geturl() {
	document.getElementById("home").innerHTML = 
	"The full URL of this page is:<br>" + window.location.href;
}

