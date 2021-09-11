'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          userName: 'TheMightyLion',
          email: 'admin001@javascriptjungle.com',
          hashedPassword: '$2a$10$PIoUWAjK78TNhHczxGEc1eDqjZsVT3fCBdJr9GKucj58Ykr1MllZC'
        },
        {
          userName: 'TheAgileTiger',
          email: 'admin002@javascriptjungle.com',
          hashedPassword: '$2a$10$PIoUWAjK78TNhHczxGEc1eDqjZsVT3fCBdJr9GKucj58Ykr1MllZC'
        },
        {
          userName: 'TheMountainsKeeper',
          email: 'admin003@javascriptjungle.com',
          hashedPassword: '$2a$10$RbLIxfZku8109HrugXVpC.PvcTn79gJAyKFu507LvD2nm/sATA/RC'
        },
        {
          userName: 'demo_user',
          email: 'demo@demo.com',
          hashedPassword: '$2a$10$2S0HDIBgCrVUUAsyDI.kFO4wKbWiKhQa13s7IrIzB6qBNam0tI9qu'
        }
      ]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
