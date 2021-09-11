// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
// Create a card for each of the articles and add the card to the DOM.

function cardRequest() {
    let currentArticles;
    axios.get(`https://lambda-times-backend.herokuapp.com/articles`)
        .then(response => {
            currentArticles = response.data.articles;            

            Object.values(currentArticles).forEach(
                (item) => {
                    item.forEach(
                        (individualArticle) => {
                            let cardsCtr = document.querySelector('.cards-container');
                            let cardDiv = cardsCtr.appendChild(document.createElement('div'));
                            cardDiv.classList.add('card');
                            let headlineDiv = cardDiv.appendChild(document.createElement('div'));
                            headlineDiv.classList.add('headline');
                            let authorDiv = cardDiv.appendChild(document.createElement('div'));
                            authorDiv.classList.add('author');
                            let imgCtr = authorDiv.appendChild(document.createElement('div'));
                            imgCtr.classList.add('img-container');
                            let authorImgURL = imgCtr.appendChild(document.createElement('img'));
                            let spanCtr = authorDiv.appendChild(document.createElement('div'));
                            /*console.log("headline:  " + individualArticle.headline);
                            console.log("author URL:  " + individualArticle.authorPhoto);
                            console.log("author name:  " + individualArticle.authorName);
                            console.log('--------------------------------------');*/
                            headlineDiv.textContent = individualArticle.headline;
                            authorImgURL.src = individualArticle.authorPhoto;
                            spanCtr.textContent = `By ${individualArticle.authorName}`;
                        }

                    );
                }
            );
            


        })
        .catch(err => {
            // error
            console.log(err);
        });
}
cardRequest();