document.addEventListener("DOMContentLoaded", () => {
  // toggling restaurants

  const toggleLi = (e) => {
    const li = e.target;
    if (li.className === "visited") {
      li.className = "";
    } else {
      li.className = "visited";
    }
  };

  document.querySelectorAll("#restaurants li").forEach((li) => {
    li.addEventListener("click", toggleLi);
    
    
  const ul = document.getElementById("restaurants")
  const newLi = document.createElement("li")

  });
    // adding SF places as list items

  // --- your code here!



  // adding new photos

  // --- your code here!



});
