<?php
/*
this goes on whatever page your put into url is
<?php
  if(isset($_POST['YOURURLBUTTON'])){
    $url = mysqli_real_escape_string($conn, $_POST['YOURURLINPUTFROMSEARCH']);
    getURLInfo($url, $conn);
  }
?>
*/

function getURLInfo($main_url, $conn){
  // Gets Webpage Title
   $title =  parse_url('http://' . str_replace(array('https://', 'http://'), '', $main_url), PHP_URL_HOST);
   $title =  str_replace(['www.', '.com', '.edu', '.gov', '.net'], "", $title);

  // Gets Webpage Description
  $b =$main_url;
  @$url = parse_url( $b );
  @$tags = get_meta_tags($url['scheme'].'://'.$url['host'] );
  $description=$tags['description'];

  //MAKE CALL TO CREATE  %%%%%%%%%%
  insert($main_url, $title, $description, $conn);
}

//INSERT INTO the DATABASE ******************************
function insert($main_url, $title, $description, $conn){
  //Insert Date into page *****************************
  $sql = "INSERT INTO `page` (`page_Id`, `url`, `title`, `description`, `lastModified`, `lastIndexed`, `timeToIndex`)
        VALUES (NULL, '$main_url', '$title', '$description', current_timestamp(), current_timestamp(), '0')";
  mysqli_query($conn, $sql);

  //SELECT url to set up TABLEs ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  $sql = "SELECT * FROM page
          WHERE page.url =  '$main_url'";
  $result = mysqli_query($conn, $sql);
  $queryResults = mysqli_num_rows($result);

  if($queryResults > 0){
    while($row = mysqli_fetch_assoc($result)){
      $checkword = $row['description'];
      //  print_r($matchesUnique); //FOR DEBUGGING
      // Collect all UNIQUE words in the String   ***************************
      $setofWords = (array_count_values(str_word_count($checkword, 1)) );
      $setofWords += [$row['title'] => 1];
      $setofWords += [$row['url'] => 1];

      //print_r($setofWords); //FOR DEBUGGING

      //Put all words found in the description of the url into the database
      foreach($setofWords as $key => $value){
        //Query Insert to word Table
        $sqlputword = "INSERT INTO `word` (`word_Id`, `wordName`) VALUES (NULL, '$key')";

        //Insert Data into the word table *************************
        mysqli_query($conn, $sqlputword);

        //Query for the word in the table   ^^^^^^^^^^^^^^^^^^^^^^
        $sqlsearchWord = "SELECT * FROM `word` WHERE `wordName` LIKE '$key'";
        $resultSearchword = mysqli_query($conn, $sqlsearchWord);
        //Get the word
        $wordSearched = mysqli_fetch_assoc($resultSearchword);

        $pageId = $row['page_Id'];
        $wordId = $wordSearched['word_Id'];

        //Query Inset into page_word  *************************
        $sqlputpageword = "INSERT INTO `page_word` (`pageWord_Id`, `page_Id`, `word_Id`, `freq`)
                            VALUES (NULL, '$pageId', '$wordId', '$value')";

        //Insert Data into the pageword table  *************************
        mysqli_query($conn, $sqlputpageword);
      }

    }
  }
}

?>
