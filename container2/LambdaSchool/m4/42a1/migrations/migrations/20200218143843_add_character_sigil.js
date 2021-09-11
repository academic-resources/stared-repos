exports.up = function(knex) {
  return knex.schema.table("characters", tbl => {
    tbl.string("sigil", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.table("characters", tbl => {
    tbl.dropColumn("sigil");
  });
};
