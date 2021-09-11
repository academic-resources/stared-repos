<?php

$server  = "";
$username = "";
$password = "";
$dbname = "";

$conn = new mysqli($server, $username, $password, $dbname);

//OUTPUT USING Custom HTML TAG mixed with CSS
function searchOutput($title, $url, $description){
  echo    //"<div class=>"
      //YOURstyle goes here  need to delete the div class
      //Replace everything but echo with the style you used
      //to display content
     // "  </div>";
}

/*

THis goes wherever your search page is at
<?php
  if(isset($_POST['YOURBUTTON'])){
    $search = mysqli_real_escape_string($conn, $_POST['YOURSEARCHBAR']);

    SearchDatabase($search, $conn, $_POST['SearchType']);
  }
 ?>

*/
function SearchDatabase($search, $conn, $searchType){

  $sql = "SELECT * FROM  page, word, page_word
  WHERE page.page_Id = page_word.page_Id
  AND word.word_Id = page_word.word_Id
  AND Upper(word.wordName) = Upper('$search')
  ORDER BY freq";

  $sqlx = $sql;

  //Get The Data Returned *************
  $result = mysqli_query($conn, $sqlx);

  //Number of results
  $queryResults = mysqli_num_rows($result);

  //OUTPUT to SCREEN  * ******** NEEDD seach OUPTFIXED First
  if($queryResults > 0){
    while($row = mysqli_fetch_assoc($result)){
    //  searchOutput($row['title'], $row['url'], $row['description']);
    }
  }
  else{
    echo "<div class=\"SearchResults\"> No search results for \"" .$search. "\"</div>";
  }
}
 ?>
