'use strict';

const { DATE } = require("sequelize");
const sequelize = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("order_status", {
            id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primarykey: true,
                unique: true,
                allowNull: false,
            },
            status_order: {
                type: sequelize.STRING,
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
        await queryInterface.dropTable("order_status");
    }
};