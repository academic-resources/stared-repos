const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3333;

const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

// Data from https://www.uncommongoods.com/fun/by-interest/geek-gifts

let items = [
  {
    name: "Reel Viewer",
    id: 0,
    price: 29.95,
    imageUrl:
      "https://www.uncommongoods.com/images/items/47400/47435_1_360px.jpg",
    description:
      "Ah, nostalgia. Give yourself a double dose with this grown-up, just-for-you version of one of childhood's greatest gadgets: the reel viewer. Assemble snapshots of your favorite memories and add them to your very own reel using the redemption code included with your viewer. Once you receive your made-to-order reel, pop it in the viewer and marvel at baby's first steps, or your favorite beach at sunset, or... well, whatever else you want immortalized. Remember: You're the view master now. Made in Oregon.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Mathematical Glasses - Set of 4",
    id: 1,
    price: 38.0,
    imageUrl:
      "https://www.uncommongoods.com/images/items/46700/46720_1_360px.jpg",
    description:
      "Whether it's advanced calculus or just calculating ideal ice to iced tea ratios, stay hydrated in statistical style with this set. Drinking with mathematical precision is easy: Just use the standard ounce marks and their equivalent constants, then geek out over the expanded formulas—all presented in delightfully differential colors like graph paper blue and #2 pencil gray. Glassware made in New Jersey. Decorated in Blanchester, Ohio. ",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Shakespearean Insults Chart",
    id: 2,
    price: 25.49,
    imageUrl:
      "https://www.uncommongoods.com/images/items/27300/27303_1_360px.jpg",
    description:
      'We all know someone who deserves to be dubbed a "penurious and indubitate beggar." And from time to time, you may be tempted to say that "he has not so much brain as ear-wax." This rollicking infographic is chock-full of such colorful insults from Shakespeare, the playwright who practically invented the art of the poetic put-down. Designer Tim Sanders culled the Oxford Complete Shakespeare to compile an endlessly entertaining word map of the Bard\'s boisterous, bawdy jabs, each one a mini-masterpiece of raunchy, rancorous Renaissance wit. The four-color, offset-printed poster on 100 lb., acid-free, FSC-certified paper makes the perfect reference and decor for an astute office, library, or thespian lounge. Made in Seattle.',
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Yoga Joes",
    id: 3,
    price: 25.0,
    imageUrl:
      "https://www.uncommongoods.com/images/items/43200/43212_1_360px.jpg",
    description:
      'This troop\'s mission? To keep inner peace. Designer Dan Abramson looked to a favorite childhood toy to help inspire grown-ups to get into yoga. Armed with a general knowledge of the practice, this platoon of posing servicemen show off their secret weapon: major strength and flexibility. Give the battalion to the disciplined yogi or well-balanced lieutenant in your life, or keep them in your barracks as a reminder to soldier on through your basic (yoga) training. Packaged in a "mini yoga studio" box with a bamboo floor. Made of ABS plastic in China.',
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Dinosaur Taco Holders",
    id: 4,
    price: 12.0,
    imageUrl:
      "https://www.uncommongoods.com/images/items/45700/45759_1_360px.jpg",
    description:
      "Known for their hard shells and spicy dispositions, dinosaurs roamed the earth millions of years ago. These taco-toting beasts are back for a blast of mealtime fun. The durable, dishwasher-safe triceratops and t-rex hold two hard shell tacos until you make them extinct. Made in China.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Color Changing Cinema Lightbox",
    id: 5,
    price: 49.95,
    imageUrl:
      "https://www.uncommongoods.com/images/items/46600/46667_1_360px.jpg",
    description:
      "Picture your name or favorite phrase in lights… bright, color-changing lights. This colorful, retro lightbox adds blockbuster bling to special occasions and everyday spaces in need of some inspiration. Back-lit like a real marquee, it cycles through a spectrum of colors or stops on your hue of choice, including classic white. The piece comes in three sizes including mini for your desktop or side table, standard, or large for special occasions like weddings or birthdays. Lightweight and portable, you can slide any creative combination of the included characters into three slotted lines. Battery or USB-powered. Made in China.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Avocado Tree Starter Kit - Set of 3",
    id: 6,
    price: 20.0,
    imageUrl:
      "https://www.uncommongoods.com/images/items/40800/40804_1_360px.jpg",
    description:
      "Avocados are the gift that keeps on giving, and this avocado tree starter kit makes it easy to double your green. Simply insert the shiny seed of your last avocado into the pod, float it in a water bath, and patiently watch your windowsill set-up sprout signs of life. This expertly designed floating planter easily holds a toothpick flag to mark your progress from day one to avocado toast. Glass bowl is not included. Made in China.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Hero Bookend",
    id: 7,
    price: 19.95,
    imageUrl:
      "https://www.uncommongoods.com/images/items/47500/47500_1_360px.jpg",
    description:
      'After a full day of fighting crime, this miniature superhero has his priorities straight: Saving the stories! The little defender appears to have extraordinary strength, "pushing" a row of your favorite books upright. Place the cover of a paperback book around the traditional book end to disguise it, and the hero connects on the other side with superhuman strength (aka a magnet). It\'s a playful nod to every courageous protagonist, and makes a great gift for literary lovers whether teachers, writers, or just voracious readers. Designed by Ori Niv in Tel Aviv, Isreal. Made in China.',
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Fishing Pole Campfire Roaster",
    id: 8,
    price: 29.95,
    imageUrl:
      "https://www.uncommongoods.com/images/items/43000/43021_1_360px.jpg",
    description:
      "We once toasted a marshmallow THIS BIG. Hook and roast your favorite campfire food with this fishing pole–inspired skewer. Made of powder-coated steel and finished with a maple handle, this flipping-fun roaster will occupy a prime spot in your camp tackle box. Find a comfy spot in front of the fire, then jig the pole to flip your snack so it's evenly roasted on all sides. Made in Taiwan.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Elwood the Unicorn Cereal Bowl",
    id: 9,
    price: 39.95,
    imageUrl:
      "https://www.uncommongoods.com/images/items/25800/25893_1_360px.jpg",
    description:
      'With his flowing rainbow mane and sweetly stout body, Elwood turns a simple bowl of cereal, soup, or ice cream into a walk on the wondrous side. His iconic horn promises a bit of magic with your meal, while his enigmatic blue eyes stare deep into yours as if to say, "Hey friend, all the enchantment you need is right here within my ample stoneware vessel." Each hand painted detail showcases your Elwood\'s unique personality, while his all-purpose, hand-thrown silhouette makes him an equally charming companion as well as a trinket dish and miraculous mascot. Handmade by JoAnn Stratakos in Pennsylvania.',
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Spotted Wellies Garden Ducks",
    id: 10,
    price: 19.99,
    imageUrl:
      "https://www.uncommongoods.com/images/items/26500/26530_1_360px.jpg",
    description:
      "This trio of darling ducklings will waddle into your home and your heart. Each duck is hand-carved from sustainable bamboo and reclaimed teak by artisans in Indonesia and finished with charming hand-painted booties. Since each one is made by hand, it has its own look, name, and lovable personality. Shelter the big duck, little duck, or baby duck, or collect the whole paddle! Place them inside to sweeten up any space, or give them a coat of varnish and let them liven up your lawn or garden. Handmade in Indonesia.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  },
  {
    name: "Eye Glasses Holder",
    id: 11,
    price: 15.49,
    imageUrl:
      "https://www.uncommongoods.com/images/items/19000/19079_1_360px.jpg",
    description:
      "A group of craftsmen in India is trying to help you find your glasses. This hand-carved wooden statuette is perfect for holding your glasses when you're not using them. No more searching around blindly, or trying to remember where you last put them down.",
    shipping:
      "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: \r\n ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later."
  }
];

server.get("/items", (req, res) => {
  res.json(items);
});
let itemId = 12;

server.get("/itemById/:id", (req, res) => {
  const { id } = req.params;
  const findItemById = item => {
    return item.id == id;
  };
  const foundItem = items.find(findItemById);
  if (!foundItem) {
    return sendUserError("No Item found by that ID", res);
  } else {
    res.json(foundItem);
  }
});

server.post("/items", (req, res) => {
  const { name, price, imageUrl, description, shipping } = req.body;
  const newItem = { name, price, imageUrl, description, shipping, id: itemId };
  if (!name || !price || !description) {
    return sendUserError(
      "Ya gone did goofed! Name/Price/Description are all required to create an item in the item DB.",
      res
    );
  }
  const findItemByName = item => {
    return item.name === name;
  };
  if (items.find(findItemByName)) {
    return sendUserError(
      `Ya gone did goofed! ${name} already exists in the item DB.`,
      res
    );
  }

  items.push(newItem);
  itemId++;
  res.json(items);
});

server.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl, description, shipping } = req.body;
  const findItemById = item => {
    return item.id == id;
  };
  const foundItem = items.find(findItemById);
  if (!foundItem) {
    return sendUserError("No Item found by that ID", res);
  } else {
    if (name) foundItem.name = name;
    if (price) foundItem.price = price;
    if (imageUrl) foundItem.imageUrl = imageUrl;
    if (description) foundItem.description = description;
    if (shipping) foundItem.shipping = shipping;
    res.json(items);
  }
});

server.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const foundItem = items.find(item => item.id == id);

  if (foundItem) {
    const ItemRemoved = { ...foundItem };
    items = items.filter(item => item.id != id);
    res.status(200).json(items);
  } else {
    sendUserError("No item by that ID exists in the item DB", res);
  }
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
