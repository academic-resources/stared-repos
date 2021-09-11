"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor nulla, tincidunt et vehicula euismod, aliquam ut felis. Nullam rutrum leo eget magna malesuada. ",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body:
            "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed a velit ornare, euismod turpis a, porttitor dui. Donec dapibus. ",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body:
            "Fusce egestas libero libero, at accumsan nibh sagittis facilisis. Aliquam sit amet tempus velit. Maecenas sit amet euismod diam. In sed semper metus, ac. ",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body:
            "In sed diam enim. Sed tincidunt neque non felis aliquam porttitor. Donec pharetra tempor fringilla. Aenean ultrices consectetur magna, id dictum odio laoreet vel. ",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
