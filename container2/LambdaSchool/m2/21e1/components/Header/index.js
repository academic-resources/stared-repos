// STEP 1: Create a header component.
// -----------------------
// Using a function create the component you see below:
//
//  <div class="header">
//    <span class="date">SMARCH 28, 2019</span>
//    <h1>Lambda Times</h1>
//    <span class="temp">98°</span>
//  </div >
// And add it to the DOM in the .header-container component

function Header() {
    let headerDiv = document.querySelector('.header-container').appendChild(document.createElement('div'));
    headerDiv.classList.add('header');
    let dateSpan = headerDiv.appendChild(document.createElement('span'));
    dateSpan.classList.add('date');
    dateSpan.textContent = "SMARCH 28, 2019";
    let headlineH1 = headerDiv.appendChild(document.createElement('h1'));
    headlineH1.textContent = "Lambda Times";
    let tempSpan = headerDiv.appendChild(document.createElement('span'));
    tempSpan.classList.add('temp');
    tempSpan.textContent = "98°";    
    
}
Header();
