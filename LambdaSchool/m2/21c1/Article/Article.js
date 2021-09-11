/* This is the data we will be using to create our article components */
/* Look over this data, then proceed to line 91*/
const data = [
  {
    title: 'Lambda School Students: "We\'re the best!"',
    date: 'Nov 5th, 2018',
    firstParagraph: `Lucas ipsum dolor sit amet ben twi'lek padmé darth darth darth moff hutt organa twi'lek. Ben amidala secura skywalker lando
        moff wicket tatooine luke.Solo wampa wampa calrissian yoda moff.Darth grievous darth gonk darth hutt.Darth baba skywalker
        watto fett jango maul han.Mon ewok sidious sidious lando kenobi grievous gamorrean solo.Yoda wedge utapau darth calamari.
        Hutt calamari darth jabba.Darth dooku amidala organa moff.Boba darth binks solo hutt skywalker dantooine skywalker.Qui - gonn
        jar twi'lek jinn leia jango skywalker mon.`,

    secondParagraph: `Grievous fett calamari anakin skywalker hutt.Alderaan darth kenobi darth r2- d2
        windu mothma.Sidious darth calamari moff.Wampa mothma sith wedge solo mara.Darth gonk maul sith moff chewbacca palpatine
        mace amidala.C - 3po solo skywalker anakin yoda leia.Maul wampa bespin watto jade ewok darth jabba.Lando dantooine moff
        k - 3po dantooine luke.Fisto mandalore darth wedge c - 3p0 ahsoka.Secura moff palpatine fett.Anakin sith darth darth.Moff
        solo leia ben ponda jade.Binks jango aayla skywalker skywalker cade.Mustafar darth ventress anakin watto.Yavin jawa sebulba
        owen jinn tatooine sith organa.`,

    thirdParagraph: `Dagobah hutt jawa leia calamari ventress skywalker yoda. Binks wicket hutt coruscant sidious
        naboo ackbar tatooine. Hutt lars padmé darth. Maul solo darth darth jabba qui-gon chewbacca darth maul. Moff baba wicket
        han. C-3po antilles moff qui-gon ahsoka aayla dooku amidala. Palpatine droid amidala droid k-3po twi'lek padmé wookiee. Leia
        moff calamari mon obi-wan. Solo grievous lando coruscant. Jinn darth palpatine obi-wan mon.`
  },
  {
    title: 'Javascript and You, ES6',
    date: 'May 7th, 2019',
    firstParagraph: `Alohamora wand elf parchment, Wingardium Leviosa hippogriff, house dementors betrayal. Holly, Snape centaur portkey ghost
        Hermione spell bezoar Scabbers. Peruvian-Night-Powder werewolf, Dobby pear-tickle half-moon-glasses, Knight-Bus. Padfoot
        snargaluff seeker: Hagrid broomstick mischief managed. Snitch Fluffy rock-cake, 9 ¾ dress robes I must not tell lies. Mudbloods
        yew pumpkin juice phials Ravenclaw’s Diadem 10 galleons Thieves Downfall. Ministry-of-Magic mimubulus mimbletonia Pigwidgeon
        knut phoenix feather other minister Azkaban. Hedwig Daily Prophet treacle tart full-moon Ollivanders You-Know-Who cursed.
        Fawkes maze raw-steak Voldemort Goblin Wars snitch Forbidden forest grindylows wool socks`,

    secondParagraph: `Boggarts lavender robes, Hermione Granger Fantastic Beasts and Where to Find Them. Bee in your bonnet Hand of Glory elder
        wand, spectacles House Cup Bertie Bott’s Every Flavor Beans Impedimenta. Stunning spells tap-dancing spider Slytherin’s Heir
        mewing kittens Remus Lupin. Palominos scarlet train black robes, Metamorphimagus Niffler dead easy second bedroom. Padma
        and Parvati Sorting Hat Minister of Magic blue turban remember my last.`,

    thirdParagraph: `Toad-like smile Flourish and Blotts he knew I’d come back Quidditch World Cup. Fat Lady baubles banana fritters fairy lights 
        Petrificus Totalus. So thirsty, deluminator firs’ years follow me 12 inches of parchment. Head Boy start-of-term banquet Cleansweep Seven 
        roaring lion hat. Unicorn blood crossbow mars is bright tonight, feast Norwegian Ridgeback. Come seek us where our voices sound, we cannot 
        sing above the ground, Ginny Weasley bright red. Fanged frisbees, phoenix tears good clean match.`
  },
  {
    title: 'React vs Angular vs Vue',
    date: 'June 7th, 2019',
    firstParagraph: `Bulbasaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ivysaur Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Venusaur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charmander Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Charmeleon Lorem ipsum dolor sit amet, consectetur adipiscing elit. Charizard Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Squirtle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Wartortle Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Blastoise Lorem ipsum dolor sit amet, consectetur adipiscing elit. Caterpie Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Metapod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Butterfree
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Weedle Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Kakuna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Beedrill Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.`,

    secondParagraph: `Pidgey Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pidgeotto Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Pidgeot Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rattata Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Raticate Lorem ipsum dolor sit amet, consectetur adipiscing elit. Spearow Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Fearow Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ekans Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Arbok Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pikachu Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Raichu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sandshrew Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sandslash Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nidoran Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nidorina Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nidoqueen Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nidoran Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nidorino Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nidoking Lorem ipsum`,

    thirdParagraph: `Gotta catch 'em all Horsea gym Ninjask Absol Sinnoh Poliwag. Gotta catch 'em all Youngster wants to fight Soda Pop Floatzel 
        Leech Life Seismitoad Ariados. Earthquake Pokemon Glitch City Tail Whip Skitty Ekans Dialga. Ut aliquip ex ea commodo consequat James 
        Castform Lotad the power that's inside Burnt Berry Makuhita. Ghost Ariados Corphish Dusclops Golbat Gligar Zweilous.`
  },
  {
    title: 'Professional Software Development in 2019',
    date: 'Jan 1st, 2019',
    firstParagraph: `Hodor hodor HODOR! Hodor hodor - hodor, hodor. Hodor hodor... Hodor hodor hodor; hodor hodor. Hodor hodor hodor, hodor, hodor
          hodor. Hodor, hodor. Hodor. Hodor, hodor - hodor... Hodor hodor hodor; hodor HODOR hodor, hodor hodor?! Hodor hodor, hodor.
          Hodor hodor hodor hodor hodor! Hodor hodor - HODOR hodor, hodor hodor hodor hodor hodor; hodor hodor? `,

    secondParagraph: `Hodor, hodor. Hodor. Hodor, hodor, hodor. Hodor hodor, hodor. Hodor hodor, hodor, hodor hodor. Hodor! Hodor hodor, hodor;
          hodor hodor hodor? Hodor, hodor. Hodor. Hodor, hodor - HODOR hodor, hodor hodor hodor! Hodor, hodor. Hodor. Hodor, HODOR
          hodor, hodor hodor, hodor, hodor hodor. Hodor hodor - hodor - hodor... Hodor hodor hodor hodor hodor hodor hodor?! Hodor
          hodor - hodor hodor hodor. Hodor. Hodor hodor... Hodor hodor hodor hodor hodor? `,

    thirdParagraph: `Hodor hodor - hodor... Hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor hodor hodor hodor hodor; hodor hodor? Hodor!
          Hodor hodor, HODOR hodor, hodor hodor?! Hodor! Hodor hodor, HODOR hodor, hodor hodor, hodor, hodor hodor. Hodor, hodor.
          Hodor. Hodor, hodor, hodor. Hodor hodor... Hodor hodor hodor?! Hodor, hodor... Hodor hodor HODOR hodor, hodor hodor. Hodor.`
  }
];

// const data = [{
//     title: 'Lambda School Students: "We\'re the best!"',
//     date: 'Nov 5th, 2018',
//     firstParagraph: `Lucas ipsum dolor sit amet ben twi'lek padmé darth darth darth moff hutt organa twi'lek.`,

//     secondParagraph: `Grievous fett calamari anakin skywalker hutt.`,

//     thirdParagraph: `Dagobah hutt jawa leia calamari ventress skywalker yoda.`},


/* Step 1: Create a function that creates a component. You will want your component to look like the template below: 
  
  <div class="article">
    <h2>{title of the article}</h2>
    <p class="date">{date of the article}</p>

    {three separate paragraph elements}

    <span class='expandButton'></span>
  </div>

  Hint: You will need to use createElement more than once here!

  Your function should take either an object as it's one argument, or 5 separate arguments mapping to each piece of the data object above.*/

// component function
// take data object in its format 
function compArticle(objArticle) {
  let articleTitle = objArticle.title;
  let articleDate = objArticle.date;
  let article1Para = objArticle.firstParagraph;
  let article2Para = objArticle.secondParagraph;
  let article3Para = objArticle.thirdParagraph;
  console.info(`${articleTitle}, ${articleDate}`);
  /*console.info(`${article1Para}`);
  console.info(`--------`);
  console.info(`${article2Para}`);
  console.info(`--------`);
  console.info(`${article3Para}`);
  console.info(`--------`);
  console.info(`========`);*/

  // create element div class article
  let articlesDiv = document.querySelector('.articles');
  let div = document.createElement('div');
  div.classList.add('article');
  
  let articleComponent = articlesDiv.appendChild(div);

  //inside div article class: 
  // create element h1 textContent title
  let h1Element = articleComponent.appendChild(document.createElement('h1'));
  h1Element.textContent = articleTitle;
  // create element p class date textContent date of article
  let datePara = articleComponent.appendChild(document.createElement('p'));
  datePara.classList.add('date');
  datePara.textContent = articleDate;
  console.log('added article class to div');

  // create 3 empty p elements 
  let emptyPara1 = articleComponent.appendChild(document.createElement('p'));
  let emptyPara2 = articleComponent.appendChild(document.createElement('p'));
  let emptyPara3 = articleComponent.appendChild(document.createElement('p'));

  emptyPara1.textContent = article1Para;
  emptyPara2.textContent = article2Para;
  emptyPara3.textContent = article3Para;

  // create element span class expandButton
  let spanElement = articleComponent.appendChild(document.createElement('span'));
  spanElement.classList.add('expandButton');
  spanElement.textContent = "Click to Expand";
    

  /*
    Step 2: Add an event listener to the expandButton span. This event listener should toggle the class 'article-open' on the 'article' div.
  */
  articleComponent.addEventListener(
    "click", () => {
      div.classList.toggle('article-open');
      animateArticleOpen(articleComponent);
      console.log("animating article");
}
    );


  /*
  STRETCH ITEM: 
  Close Button
  Add a close(or 'read') button to each Article component.When clicked the article will disappear.
  let closeButton = articleComponent.appendChild(document.createElement('div'));
  closeButton.textContent = "close article"
  closeButton.classList.add('article-toggle');
  closeButton.addEventListener("click", () =>{
    if (document.querySelectorAll('.articles')[0].style.visibility = "hidden") {
    document.querySelectorAll('.articles')[0].style.visibility = "visible"
  } else {
    document.querySelectorAll('.articles')[0].style.visibility = "hidden"
  }
  });
  
  */
  /*   
STRETCH ITEM
Animation Goal #2 Animate the article opening. This one is a bit trickier. You will need to change the CSS for this component as well. Animate the component so that it slides open and slides closed on each click. Update the text in the expand button to read 'Click to Expand' or 'Click to Close' depending on the state of the article.
  document.querySelectorAll('.article').forEach(      
    item => {
      console.log("entering article animation forEach loop");
      item.addEventListener("click", (item)=> {
        animateArticleOpen(item);
      console.log("animating article");}
      
      );
    }
  );
  */

  function animateArticleOpen(singleArticle) {
    // let articlesDiv = document.querySelector('.article');
    let closeButton = singleArticle.querySelector('.expandButton');
    let currentArticle = document.querySelector('.article-open');
    if (currentArticle) {
      gsap.to("#menu", { duration: 1, yPercent: 100 });
      console.log('article expanded, change expand button to close');
      // <span class='expandButton'>Click to Close</span>
      closeButton.textContent = "Click to Close";
  } else {
      console.log('article closed, change expand button to expand');
      gsap.to("#menu", { duration: 1, y: 50 });
      // <span class='expandButton'>Click to Expand</span>
      closeButton.textContent = "Click to Expand";
      currentArticle.style.height="50px"
  }
  }
  
  

  /*
    Step 3: return the entire component.
    come back
  */

    return articleComponent;

  }


/*
  Step 5: Add a new article to the array. Make sure it is in the same format as the others. Refresh the page to see the new article.

*/

data.push(
  {
    title: "Components",
    date: "November 20, 2019",
    firstParagraph: "Skate ipsum dolor sit amet, egg plant pressure flip lipslide ollie Lance Mountain fast plant slide. Smith grind flypaper bigspin fakie out hang ten shoveit Dudesblood. Powerslide noseblunt slide boned out flail frontside indy grab Jordan Richter. Heel flip bank nosegrind blunt opposite footed disaster. Risers slappy kidney yeah gnar bucket hang up. ",
    secondParagraph: "Speed wobbles 900 launch ramp Steve Robert disaster switch fakie out. Hard flip wall ride pool hang ten spine Dylan Rieder 1080. Smith grind powerslide cab flip helipop hang-up slap maxwell. 720 half-cab griptape shinner Claus Grabke indy grab tail. Slappy Operation Ivy crail grab trucks rails nose death box. 180 crooked grind bigspin judo air baseplate speed wobbles. Finger flip hand rail Tracker Jeff Phillips griptape ho-ho ollie north. ",
    thirdParagraph: "Nose birdie 270 betty poseur kick-nose 180 Transworld. Hang up tail hurricane steps slappy flail Girl rad. Rip grip 180 risers boneless slide air durometer. Backside coffin 540 transition ollie hole helipop lip. Backside 900 blunt nose grab casper tuna-flip air. Aerial egg plant wheels fakie sponsored ledge ollie north John Cardiel."
  }
);
/*
  Step 4: Map over the data, creating a component for each oject and add each component to the DOM as children of the 'articles' div.
*/

data.forEach(
  (dataItem) => { 
    let newArticle = compArticle(dataItem);
    document.querySelector('.articles').appendChild(newArticle);
  }
);
