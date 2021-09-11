exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("characters")
    .truncate() // empties the table and resets the id back to 1
    .then(function() {
      const characters = [
        {
          name: "Eddard",
          house: "Stark",
          sigil: "Wolf",
          alive: false,
          origin: "The North",
        },
        {
          name: "Jon",
          house: "Stark",
          sigil: "Wolf",
          alive: true,
          origin: "The North",
        },
        {
          name: "Aria",
          house: "Stark",
          sigil: "Wolf",
          alive: true,
          origin: "The North",
        },
      ];
      // Inserts seed entries
      return knex("characters").insert(characters);
    });
};
