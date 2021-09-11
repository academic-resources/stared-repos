/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will 
  be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects 
  at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments 
  below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(characteristics){
  this.createdAt = characteristics.createdAt;
  this.dimensions = characteristics.dimensions;
}


GameObject.prototype.destroy = function(obj){
  return `${obj} was removed from the game.`
};

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(characteristics) {
  GameObject.call(this, characteristics)
  this.hp = characteristics.hp;
  this.name = characteristics.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(obj){
  return `${this.name} took damage.`
}; 

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(characteristics) {
  GameObject.call(this,characteristics)
  CharacterStats.call(this, characteristics)
  this.faction = characteristics.faction;
  this.weapons = characteristics.weapons;
  this.language = characteristics.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function(name){
  return `${this.name} offers a greeting in ${this.language}.`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test your work by uncommenting these 3 objects and the list of console logs below:

/*
  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
*/

  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!


  function Villain(characteristics) {
    GameObject.call(this, characteristics)
    CharacterStats.call(this, characteristics)
    Humanoid.call(this, characteristics)
    this.attackStrength = characteristics.attackStrength;
  }
  Villain.prototype = Object.create(Humanoid.prototype);

  function Hero(characteristics) {
  GameObject.call(this, characteristics)
  CharacterStats.call(this, characteristics)
  Humanoid.call(this, characteristics)
  this.attackStrength = characteristics.attackStrength;
}
Hero.prototype = Object.create(Humanoid.prototype);



Villain.prototype.attackHero = function(Hero) {
  if (Hero.hp > this.attackStrength) {
    return `${Hero.name} suffered ${this.attackStrength} damage from ${this.name}. ${Hero.name} has ${Hero.hp-=this.attackStrength}hp remaining.`;
  } else if (Hero.hp <= this.attackStrength) {
    return `${Hero.name} has been defeated.`
  }
  }

  Hero.prototype.attackVillain = function(Villain) {
    if (Villain.hp > this.attackStrength) {
      return `${Villain.name} suffered ${this.attackStrength} damage from the brave hero ${this.name}! ${Villain.name} has ${Villain.hp-=this.attackStrength}hp until defeat.`;
    } else if (Villain.hp <= this.attackStrength) {
      return `${Villain.name} has been utterly destroyed.`
    }
  }

  const Voldemort = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 10,
      width: 5,
      height: 2,
    },
    hp: 40,
    attackStrength: 4,
    name: 'Voldemort',
    faction: 'The Death Eaters',
    weapons: [
      'Yew Wand,'
    ],
    language: 'British',
  })

  const HarryPotter = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 5,
      width: 2,
      height: 8,
    },
    hp: 60,
    attackStrength: 6,
    name: 'Harry Potter',
    faction: 'The Order of the Phoenix',
    weapons: [
      'Holly Wand,'
    ],
    language: 'British',
  })

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

console.log(Voldemort.attackHero(HarryPotter));
console.log(HarryPotter.attackVillain(Voldemort));

// 56
// 34
// 52
// 28
// 48
// 22
// 44
// 16
// 40
// 10
// 36
// 4
// 32
// Voldemort has been destroyed.