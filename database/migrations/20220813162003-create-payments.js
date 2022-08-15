'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primarykey: true,
        allowNull: false,
      },
      id_orders: {
        type: sequelize.INTEGER,
        references: {
          model: 'orders', // nama table
          key: 'id', // nama column
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      payment_date: {
        type: sequelize.DATE,
        default: new DATE(),
      },
      payment_type: {
        type: sequelize.STRING,
      },
      amount: {
        type: sequelize.INTEGER,
      },
      created_at: {
        type: sequelize.DATE,
        default: new DATE(),
      },
      updated_at: {
        type: sequelize.DATE,
        default: new DATE(),
      },
      deleted_at: {
        type: sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};
