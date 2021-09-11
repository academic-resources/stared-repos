/* This is the data we will be using, study it but don't change anything, yet. */

let menuItems = [
  'Students',
  'Faculty',
  "What's New",
  'Tech Trends',
  'Music',
  'Log Out'
];

function compArticle(array) {
  let x;
/* 
  Step 1: Write a function that will create a menu component as seen below:

  <div class="menu">
    <ul>
      {each menu item as a list item}
    </ul>
  </div>

  The function takes an array as its only argument.
  console.info(`${array}`);
*/
  console.info(array);
  let divItem = document.createElement('div');
  divItem.classList.add('menu');
  let header = document.querySelector('body > div');
  header.appendChild(divItem);
  divItem.classList.add('menu--close'); 
  let ulItem = divItem.appendChild(document.createElement('ul'));

  /*
  console.info(`${array}`); 
    Step 2: Inside this function, iterate over the array creating a list item <li> element for each item in the array. 
    Add those items to the <ul>
  */
  menuItems.forEach(item => {
    let liItem = ulItem.appendChild(document.createElement('li'));
    liItem.textContent = item;
    console.info(`added ${item} as list item`);}
  );

  
  /* 
    Step 3: Using a DOM selector, select the menu button (the element with a class of 'menu-button') currently on the DOM.
  */
  let menuBtn = document.querySelector('.menu-button');

  /* 
    Step 4: add a click event listener to the menu button. When clicked it should toggle the class 'menu--open' on the menu (your div with a 'menu' class).
  */
  menuBtn.addEventListener("click", () => {
    let menuClass = document.querySelector('.menu');
    console.log(menuClass);
    if(document.querySelector('.menu--close')) {
      console.log('performing open menu');   
      menuAnimation();
      menuClass.classList.add('menu--open'); 
      menuClass.classList.remove('menu--close'); 
    }else if (document.querySelector('.menu--open')){
      console.log('performing close menu');     
      menuAnimation();
      menuClass.classList.remove('menu--open'); 
      menuClass.classList.add('menu--close'); 
    } 
  
  });

  /*   
STRETCH ITEM
Animation Goal #1. Animate the menu opening: You will need to change the CSS for the menu in order to achieve this. Get the menu to slide in from the left side of the screen. And slide out when the button is clicked. Bonus: Get the menu to slide back out when the user clicks anywhere on the screen other than the menu.
  */  
  function menuAnimation() {
    if (document.querySelector('.menu--open')) {
      console.log('performing close animation');     
      gsap.from(".menu", { duration: 1, x: 0});
      gsap.to(".menu", { duration: 1, x: -50});
    }else if (document.querySelector('.menu--close')){
      console.log('performing open animation');   
      gsap.from(".menu", { duration: 1, x: -50});
      gsap.to(".menu", { duration: 1, x: 0});  
    }
    

  document.querySelector('.articles').addEventListener("click",
    () => {
      gsap.from(".menu", { duration: 1, x: 0});
      gsap.to(".menu", { duration: 1, x: -50 });
      document.querySelector('.menu').classList.add('menu--close');
      document.querySelector('.menu').classList.remove('menu--open');
    }
  );
    }


  
  /*   
STRETCH ITEM
Animation Goal #2 Animate the article opening. This one is a bit trickier. You will need to change the CSS for this component as well. Animate the component so that it slides open and slides closed on each click. Update the text in the expand button to read 'Click to Expand' or 'Click to Close' depending on the state of the article.
  */
  document.querySelectorAll('.article').forEach(      
    item => {
      console.log("entering article animation forEach loop");
      item.addEventListener("click", (item)=> {
        animateArticleOpen(item);
      console.log("animating article");}
      
      );
    }
  );

  function animateArticleOpen(singleArticle) {
    // let articlesDiv = document.querySelector('.article');
  let closeButton = singleArticle.appendChild('div');
  closeButton.classList.add('article-toggle');
  closeButton.addEventListener("click", () =>{
    if (articlesDiv.style.visibility = "hidden") {
      gsap.to("#menu", { duration: 1, yPercent: 100 });
      // <span class='expandButton'>Click to Close</span>
      document.querySelectorAll('.expandButton')[0].textContent = "Click to Close";
      articlesDiv.style.visibility = "visible"
  } else if (articlesDiv.style.visibility = "visible") {
      gsap.to("#menu", { duration: 1, yPercent: 100 });
      // <span class='expandButton'>Click to Expand</span>
      document.querySelectorAll('.expandButton')[0].textContent = "Click to Expand";
      articlesDiv.style.visibility = "hidden"
  }
  });
  }
  
  /* 
    Step 5: return the menu component.
    come back
  */
  return divItem;
  

}
  /* Step 6: add the menu component to the DOM. */

    let newMenu = compArticle(menuItems);
    document.querySelector('body > div').appendChild(newMenu);


/*
Component Constructor
Create a function that builds Article components. You are not expected to finish this. This goal is simply an exercise in thinking about how you would implement a function that took some data, created a new Article from it, and appended it to the HTML (without actually writing anything in the HTML file). This is a difficult concept to undertake, but even thinking about how you would implement it will give you a better understanding of how we use frameworks in upcoming sprints.
*/




/*
Implement a way to write your own articles using the Component Constructor and some input fields.
*/

