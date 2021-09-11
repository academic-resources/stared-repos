console.log("Hello from the JavaScript console!");

const APIKey = ''
$.ajax({
  type: 'GET',
  url: `http://api.openweathermap.org/data/2.5/weather?q=new%20york,US&appid=${APIKey}`,
  success(data) {
    console.log("We have your weather!")
    console.log(data);
  },
  error() {
    console.error("An error occurred.");
  },
});

console.log("Hello from the JavaScript console!");