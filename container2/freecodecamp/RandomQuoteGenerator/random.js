var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

$(document).ready(function() {
  function getQuote(){
    var arrayOfQuotes = ['"He\'s gonna feel that one tomorrow!"', '"Self-praise is for losers. Be a winner. Stand for something. Always have class, and be humble."', '"When your arm gets hit, the ball is not going to go where you want it to."', '"The fewer rules a coach has, the fewer rules there are for players to break."', '"Coaches have to watch for what they don\'t want to see and listen to what they don\'t want to hear."', '"The road to Easy Street goes through the sewer."', '"If you see a defense team with dirt and mud on their backs they\'ve had a bad day."', '"Don\'t worry about the horse being blind, just load the wagon."', '"The only yardstick for success our society has is being a champion. No one remembers anything else."', '"They\'re either going to run the ball here or they\'re going to pass it."', '"The best way to gain more yards is advance the ball down the field from the line of scrimmage."', '"If the quaterback throws the ball in the endzone and the Wide Receiver catches it……. It’s a touchdown."', '"Whenever you talk about a Mike Shanahan offense, you’re always going to be talking about his offense."', '"It\'s in the game!"'];
    var arrayOfAuthors = ["-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden", "-John Madden"];
    var randomNumber = Math.floor((Math.random()*arrayOfQuotes.length));
    var randomQuote = arrayOfQuotes[randomNumber];
    var randomAuthor = arrayOfAuthors[randomNumber];
    var quot = 'https://twitter.com/intent/tweet?text=' + randomQuote + randomAuthor + '#Madden';
    $(".quote").text(randomQuote);
    $(".author").text(randomAuthor);
    $(".twitter-share-button").attr("href", quot);
  }
  
  $(".btn").on("click", function() {
    getQuote();
  });
  
  
  
  
  /*$("#twitter-share-button").append("<a href='https://twitter.com/intent/tweet?text='"+ randomQuote +"' target='_blank'>Tweet</a>");*/
  
});