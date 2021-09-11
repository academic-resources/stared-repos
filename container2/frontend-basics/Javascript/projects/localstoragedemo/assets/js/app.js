/* Vars */

const listaTweets = document.getElementById('lista-tweets');


/* Event Listeners */

eventListeners();

function eventListeners(){
    // Submit tweet
    document.querySelector('#formulario').addEventListener('submit',
    submitTweet);

    // Remove tweets
    listaTweets.addEventListener('click', removeTweet);

    // Load local storage
    document.addEventListener('DOMContentLoaded', getLocalStorage);
}

/* Functions */

function submitTweet(e){
    e.preventDefault();

    // Read text area
    const tweet = document.getElementById('tweet').value;

    // Create HTML
    addTweet(tweet);

    // Local Storage
    addTweetLocalStorage(tweet);

}

function addTweet(tweet){

    // Creats remove botton
    const removeBotton = document.createElement('a');
    removeBotton.classList = 'borrar-tweet';
    removeBotton.innerText = 'X';

    // Creates and adds element to the list
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(removeBotton);
    listaTweets.appendChild(li);
}

function removeTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        var userConfirm = confirm("Remove this tweet?");
        if (userConfirm) {
            e.target.parentElement.remove();
            removeTweetLocalStorage(e.target.parentElement.innerText);
        }
    }
}

function addTweetLocalStorage(tweet){
    let tweets;
    // Get previous tweets
    tweets = getTweetsLocalStorage();

    // Adds new tweet
    tweets.push(tweet);

    // Convert to string to save as JSON
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function removeTweetLocalStorage(tweet){
    let tweets, tweetToRemove;

    // Remove the last X
    tweetToRemove = tweet.substring(0, tweet.length-1);

    tweets = getTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetToRemove === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function getLocalStorage(){
    let tweets;

    tweets = getTweetsLocalStorage();

    tweets.forEach(function(tweet){
        addTweet(tweet);
    });
}
