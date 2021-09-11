// Google Search API stuff
let myKey = 'AIzaSyDH5tMYsOPf7AJFDVFwZLFmCpa2X6loWpw';
let myEngineId = '010726360740555939118:u9mpivezq3x';
const Http = new XMLHttpRequest();
let searches = [];


/*
  **********************
  * DOWNLOAD FUNCTIONS *
  **********************
*/

function createAndDownloadCSV() {
  if(searches.length == 0) {
    alert("there are no results to download!");
    return;
  }

  let selectedSearches = getSelectedCheckboxes();
  if(selectedSearches.length == 0) {
    alert("Please select at least one result!");
    return;
  }

  // find the searches we can download (the checked ones)
  let searchesToDownload = [];
  for(let i = 0; i < selectedSearches.length; i++) {
    searchesToDownload[i] = searches[selectedSearches[i]];
  }

  let csvString = '';
  for(let i = 0;i < searchesToDownload.length;i++) {
    csvString += searchesToDownload[i].title + ' , ';
    csvString += searchesToDownload[i].description + ' , ';
    csvString += searchesToDownload[i].address;
    if(i != searchesToDownload.length-1)
      csvString += ' , ';
  }
  downloadFile(getFileName()+'.csv', csvString, 'text/csv');
}

function createAndDownloadXML() {
  if(searches.length == 0) {
    alert("there are no results to download!");
    return;
  }
  let selectedSearches = getSelectedCheckboxes();
  if(selectedSearches.length == 0) {
    alert("Please select at least one result!");
    return;
  }
  let xmlDoc = document.implementation.createDocument('', '', null);

  // find the searches we can download (the checked ones)
  let searchesToDownload = [];
  for(let i = 0; i < selectedSearches.length; i++) {
    searchesToDownload[i] = searches[selectedSearches[i]];
  }
  // create a xml document of said searches
  let results = xmlDoc.createElement('results');
  for(let i = 0; i < searchesToDownload.length; i++) {
    let result = xmlDoc.createElement('result');

    let titleText  = xmlDoc.createTextNode(searchesToDownload[i].title);
    let title = xmlDoc.createElement('title');
    title.appendChild(titleText);

    let descriptionText  = xmlDoc.createTextNode(searchesToDownload[i].description);
    let description = xmlDoc.createElement('description');
    description.appendChild(descriptionText);

    let urlText  = xmlDoc.createTextNode(searchesToDownload[i].address);
    let url = xmlDoc.createElement('url');
    url.appendChild(urlText);

    result.appendChild(title);
    result.appendChild(description);
    result.appendChild(url);
    results.appendChild(result);
  }

  xmlDoc.appendChild(results);
  let xmlString = new XMLSerializer().serializeToString(xmlDoc);
  downloadFile(getFileName()+'.xml', xmlString, 'text/xml');
}

function createAndDownloadJSON() {
  if(searches.length == 0) {
    alert("there are no results to download!");
    return;
  }
  let selectedSearches = getSelectedCheckboxes();
  if(selectedSearches.length == 0) {
    alert("Please select at least one result!");
    return;
  }
  let searchesToDownload = [];
  for(let i = 0; i < selectedSearches.length; i++) {
    searchesToDownload[i] = searches[selectedSearches[i]];
  }
  downloadFile(getFileName()+'.json', JSON.stringify(searchesToDownload, null, 3), 'application/json');
}

function downloadFile(filename, text, dataType) {
  // this code was inspired by this post with minor adjustments
  // https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  var element = document.createElement('a');
  element.setAttribute('href', 'data:${dataType};charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getFileName() {
  let fileName = document.getElementById("fileNameForDownload").value;
  if(fileName.length != 0)
      return fileName;
  else
    return 'searchResults';
}

/*
  ********************
  * UPLOAD FUNCTIONS *
  ********************
*/

function fileHandler(files)  {
  let file = files[0];
  let label = document.getElementById("filename");
  label.innerHTML = file.name + `    (${file.size} bytes)`;

  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = (e) => {
    let fileTxt = reader.result;

    if(file.type === 'text/xml')
      parseXML(fileTxt);
    else if(file.type === 'application/json')
      parseJSON(fileTxt);
    else if(file.type === 'text/csv' || file.type == 'application/vnd.ms-excel')
      parseCSV(fileTxt);
    else
      alert('The selected file must be either .json, .csv, or .xml');
  }


}

function parseXML(xmlString) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  let xmlResults = [];

  let size = xmlDoc.getElementsByTagName('result').length;
  for(let i = 0; i < size; i++) {
    let titleText = xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue;
    let descriptionText = xmlDoc.getElementsByTagName('description')[i].childNodes[0].nodeValue;
    let url  = xmlDoc.getElementsByTagName('url')[i].childNodes[0].nodeValue;
    xmlResults[i] = {
      title: titleText,
      description: descriptionText,
      address: url
    };
  }
  searches = xmlResults;
}

function parseJSON(jsonString) {
  let jsonObject = JSON.parse(jsonString);
  searches = jsonObject;
}

function parseCSV(csvString) {
  var csvResults = csvString.split(' , ');
  if((csvResults.length % 3) != 0) {
    alert('Something is wrong with that csv, length is' + csvResults.length);
    return;
  }
  searches = [];
  let j = 0;
  for(let i = 0; i < (csvResults.length/3);i++) {
    searches[i] = {
      title: csvResults[j++],
      description: csvResults[j++],
      address: csvResults[j++]
    };
  }
}

function showFileResults() {
  let file = document.getElementById("uploadedFile").files[0];
  if(!file) {
    alert("Please select a file with a correct format then try again");
    return;
  }
  showResults();
}

/*
  *******************
  * QUERY FUNCTIONS *
  *******************
*/

function showResults() {
  clearPreviousResults();
  for(var i = 0;i < searches.length;i++)
    addResultToDOM(searches[i]);
}

function getSearchResults() {
  clearPreviousResults();
  // find out what the user wants to search
  var query = document.getElementsByName("searchQuery")[0].value;
  // if empty, don't bother
  if(query.length == 0)
    return;

  let url='https://www.googleapis.com/customsearch/v1?'
    + 'q='+ query
    + '&cx=' + myEngineId
    + '&key=' + myKey;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    let response = JSON.parse(Http.responseText); // convert String -> JavaScript object
    let results = response.items;
    if(!results)
      return;

    searches = [];
    for(var i = 0;i < results.length;i++) {
      searches[i] = {
        title: results[i].title,
        description: results[i].snippet,
        address:results[i].link
      };

    }
    showResults();
  }

}

function clearPreviousResults() {
  let cards = document.getElementById("card-holder");
  while (cards.hasChildNodes()) {
    cards.removeChild(cards.lastChild);
  }
}

function addResultToDOM(result, number) {

  // get a handle on the cards div
  var cards = document.getElementById("card-holder");


  //add some padding
  var padding = document.createElement("div")
  padding.setAttribute("style", "height:10px;");
  cards.appendChild(padding);

  // make div tag to hold a search result + checkbox
  var holder = document.createElement("div");
  holder.setAttribute("class", "d-flex flex-row justify-content-between card shadow");

  // make an instance of a card
  var card = document.createElement("div");
  card.setAttribute("class", "p-3");
  // make header
  var cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "card-title");

  var cardLink = document.createElement("a");
  cardLink.setAttribute("href", result.address);
  cardLink.setAttribute("class", "card-link text-primary");
  cardLink.innerHTML = result.title;

  cardTitle.appendChild(cardLink);

  // make body
  var cardDescription = document.createElement("p");
  cardDescription.setAttribute("class", "card-text");
  cardDescription.innerHTML = result.description;

  // make footer
  var cardAddress = document.createElement("p");
  cardAddress.setAttribute("class", "card-text address text-success");
  cardAddress.innerHTML = result.address;

  //link everything
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(cardAddress);


  // create checkbox
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "checkboxes");
  checkbox.setAttribute("value", number);
  checkbox.setAttribute("class", "m-5");

  holder.appendChild(card);
  holder.appendChild(checkbox);
  cards.appendChild(holder);

};

function selectAll() {
  let checkboxes = document.getElementsByName("checkboxes");
  if(checkboxes.length == 0)
    return;

  for(var i = 0;i < checkboxes.length;i++)
    checkboxes[i].checked = true;

}

function deSelectAll() {
  let checkboxes = document.getElementsByName("checkboxes");
  if(checkboxes.length == 0)
    return;

  for(var i = 0;i < checkboxes.length;i++)
    checkboxes[i].checked = false;

}

function getSelectedCheckboxes() {
  let checkArray = new Array();
  let checkboxes = document.getElementsByName("checkboxes");

  for(var i = 0;i < checkboxes.length;i++)
    if(checkboxes[i].checked)
      checkArray.push(i);

  return checkArray;
}
