'use strict';
const faker = require('faker');

const storyData = [
  ["You never knew this about Superman", "The inside scoop on his greatest secret", "https://cdn.pixabay.com/photo/2017/08/07/09/50/wall-2602082_960_720.jpg"],
  ["'War of the Worlds' redux", "", "https://cdn.pixabay.com/photo/2017/08/02/10/52/world-war-2570885_960_720.jpg"],
  ["Greatest alien short stories of all time","At least IMO", "https://cdn.pixabay.com/photo/2017/06/17/22/55/ufo-2413965_960_720.jpg"],
  ["Conan is dead","A barbarian's life and death", "https://cdn.pixabay.com/photo/2020/05/09/21/45/viking-5151537_960_720.jpg"],
  ["Will George R. R. Martin ever finish writing his 'A Song of Ice and Fire' series?","The Game of Thrones needs to end!", "https://cdn.pixabay.com/photo/2019/08/22/08/30/fantasy-4422921_960_720.jpg"],
  ["Greatest Batman paraphernalia","All the best tools of the Dark Knight", "https://cdn.pixabay.com/photo/2018/04/25/08/59/super-heroes-3349031_960_720.jpg"],
  ["The Wonders of Wonder Woman","Little known details of a great American hero", "https://cdn.pixabay.com/photo/2017/06/07/19/30/wonder-woman-2381272_960_720.jpg"],
  ["J. R. R. Tolkien's Legacy","A retrospective","https://cdn.pixabay.com/photo/2019/11/08/20/54/ring-4612457_960_720.jpg"],
  ["Season 2 of 'Mandalorian' secrets","An insider's tell all","https://cdn.pixabay.com/photo/2021/01/11/22/15/mandalorian-5909871_960_720.jpg"],
  ["New movie release: Mortal","","https://cdn.pixabay.com/photo/2015/11/29/19/25/man-1069219_1280.jpg"],
  ["'Upside Down Magic' on Disney Now","","https://cdn.pixabay.com/photo/2018/02/13/23/41/nature-3151869_960_720.jpg"],
  ["Interview with best selling author Terry Brooks","His long running Shannara series","https://cdn.pixabay.com/photo/2018/05/30/21/54/druid-3442656_960_720.jpg"],
  ["Fan Fiction: The Ransacking of Hobbiton","","https://cdn.pixabay.com/photo/2019/09/22/05/26/hobbit-4495138_960_720.jpg"],
  ["How to write speculative fiction","For aspiring fantasy and sci-fi authors","https://cdn.pixabay.com/photo/2017/12/08/20/18/steampunk-3006650_960_720.jpg"],
  ["Fictional worldbuilding","Maps, conlangs, cultures, and more","https://cdn.pixabay.com/photo/2020/03/02/16/19/vintage-4896141_960_720.jpg"],
  ["Pirates of the Caribbean Six","Fresh news on an upcoming sequel","https://cdn.pixabay.com/photo/2015/07/14/15/05/martinique-844982_960_720.jpg"],
  ["The further adventures of the Green Lantern","Fan fic montage","https://cdn.pixabay.com/photo/2017/05/24/00/31/green-lantern-2339078_960_720.png"],
  ["Marvel Cinematic Universe explored","Deeper than you thought possible","https://cdn.pixabay.com/photo/2019/05/31/02/08/iron-man-4241268_960_720.jpg"],
  ["The rising again of Wolverine","You just can't keep him down","https://cdn.pixabay.com/photo/2017/04/01/18/13/hand-2194170_960_720.jpg"],
  ["Black Widow's past","A fan fic take","https://cdn.pixabay.com/photo/2013/07/12/12/55/black-widow-146550_960_720.png"],
  ["Rereading stories about Elric of Melniboné","A critical examination","https://cdn.pixabay.com/photo/2015/09/02/12/35/sword-918542_1280.jpg"],
  ["The Chronicles of Narnia in today's context","C. S. Lewis's philosphy as applicable today","https://cdn.pixabay.com/photo/2019/02/05/05/19/leo-3976183_960_720.jpg"],
  ["Fan Fiction: The Unbeliever Returns","Returning to 'The Land' of The Chronicles of Thomas Covenant","https://cdn.pixabay.com/photo/2020/09/24/18/00/man-5599377_960_720.jpg"],
  ["Critique of the Harry Potter series","Taking on one of the most top selling of all time","https://cdn.pixabay.com/photo/2017/03/28/16/36/hogwarts-2182636_960_720.jpg"],
  ["'Twilight' lit up!","Fan fic","https://cdn.pixabay.com/photo/2017/03/28/16/36/hogwarts-2182636_960_720.jpg"],
  ["Going around 'Discworld'","A review of major people and places of Terry Pratchett's world","https://cdn.pixabay.com/photo/2017/06/19/19/58/graphic-2420746_960_720.jpg"],
  ["Interview with author Christopher Paolini","The Inheritance Cycle series","https://cdn.pixabay.com/photo/2014/01/05/01/19/dragon-238931_960_720.jpg"],
  ["Star Wars fan fic list","Continually updated","https://cdn.pixabay.com/photo/2017/03/25/07/06/star-wars-2172955_960_720.jpg"],
  ["A new Shrek?","","https://cdn.pixabay.com/photo/2015/04/14/17/08/alien-722415_960_720.jpg"],
  ["Wall-E is back!","Sequel is rumored","https://cdn.pixabay.com/photo/2015/02/08/14/47/lego-628572__340.jpg"],
  ["Aliens, aliens, everywhere, aliens","","https://cdn.pixabay.com/photo/2019/06/04/13/34/alien-4251449_960_720.jpg"],
  ["Greatest Sci-fi movies of all time","","https://cdn.pixabay.com/photo/2011/12/14/12/17/galaxy-11098_960_720.jpg"],
  ["Greatest fantasy books of 2019","","https://cdn.pixabay.com/photo/2019/10/07/13/18/mystery-4532583_960_720.jpg"],
  ["Latest plans of Marvel and DC comics","","https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"],
  ["UFO: A true story","","https://cdn.pixabay.com/photo/2017/10/15/09/53/close-encounters-of-the-3rd-degree-2853070_960_720.jpg"],
  ["Remake of the X-files?","Hmmm...","https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_1280.jpg"],
  ["New Book Release: The Once and Future Witches by Alix E. Harrow","","https://cdn.pixabay.com/photo/2014/11/10/21/58/the-witch-525958_1280.jpg"],
  ["Upcoming Movie Release: Avatar 2","", "https://cdn.pixabay.com/photo/2018/07/05/07/18/fantasy-3517649_960_720.jpg"],
  ["What is speculative fiction?","A broad category for fantasy and sci-fi","https://cdn.pixabay.com/photo/2017/10/06/19/20/fantasy-2824304_960_720.jpg"],
  ["Book deals","Updated sales on spec fic books","https://cdn.pixabay.com/photo/2016/03/09/09/14/books-1245690_960_720.jpg"],
  ["Julian May","Revisiting her 'Saga of Pliocene Exile' and 'Galactic Milieu Series'", "https://cdn.pixabay.com/photo/2017/12/03/17/23/fantasy-2995326_960_720.jpg"],
  ["Design your own superhero","New website goes live","https://cdn.pixabay.com/photo/2019/09/22/13/11/superhero-4496015_960_720.jpg"],
  ["Monsters are everywhere","True life stories of fictional narratives","https://cdn.pixabay.com/photo/2018/09/20/06/53/horror-3690119_960_720.jpg"],
  ["Roleplaying roundup","The best in the latest role-playing games","https://cdn.pixabay.com/photo/2014/12/14/18/33/cube-568105_960_720.jpg"],
  ["The 'Warhammer Online' world","A look at the popular online game continued by fans", "https://cdn.pixabay.com/photo/2017/08/01/14/42/knight-2565957_960_720.jpg"],
  ["'World of Warcraft'","It's history and popularity","https://cdn.pixabay.com/photo/2019/09/18/12/19/jungle-troll-priest-4486456_960_720.jpg"],
  ["Advice for playing Star Wars: The Old Republic","An pro's tips","https://cdn.pixabay.com/photo/2017/02/20/15/45/star-wars-2082969_960_720.jpg"],
  ["Disney ruined Star Wars","","https://cdn.pixabay.com/photo/2017/02/22/23/04/wheelchair-2090900_960_720.jpg"],
  ["Star Trek's long history","A look at the major events of the sci-fi universe","https://cdn.pixabay.com/photo/2019/12/25/02/56/universe-4717740_960_720.jpg"],
  ["App Academy as a surreal experience","","https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107_960_720.jpg"],
]

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      const stories = [];
      const number = storyData.length; //50
      const users = 20;

      for(let i=0; i<number; i++) {
        const userId = getRandom(users);
        const published = `This ${i+1} story is totally gibberish from here ${faker.random.words(100 + getRandom(300))}`;
        const createdAt = faker.date.past(2);
        const updatedAt = faker.date.between(createdAt, faker.date.recent());

        stories.push(
          {
            title: storyData[i][0],
            subtitle: storyData[i][1],
            draft: '',
            published,
            publishAfter: null,
            imageLink: storyData[i][2],
            userId,
            createdAt,
            updatedAt,
          }
        );
      }

      return queryInterface.bulkInsert('Stories', stories, {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
