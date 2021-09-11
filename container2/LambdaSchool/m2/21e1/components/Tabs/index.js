// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>

function tabRequest() {
    let currentTopics;
    axios.get(`https://lambda-times-backend.herokuapp.com/topics`)
        .then(response => {
            // console.log(response); 
            currentTopics = response.data.topics;
            // console.log(currentTopics);
            for (x = 0; x < currentTopics.length;x++){
                let topicsDiv = document.querySelector('.topics');
                let tabDiv = topicsDiv.appendChild(document.createElement('div'));
                tabDiv.classList.add('tab');
                tabDiv.textContent = `${currentTopics[x]}`;        
            }
        })
        .catch(err => {
            // error
            console.log(err);
        });
}
tabRequest();