'use strict';

const { DATE } = require("sequelize");
const sequelize = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orders", {
            id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primarykey: true,
                unique: true,
                allowNull: false,
            },
            id_users: {
                type: sequelize.INTEGER,
                references: {
                    model: 'users', // nama table
                    key: 'id' // nama column
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            id_order_items: {
                type: sequelize.INTEGER,
                references: {
                    model: 'order_items', // nama table
                    key: 'id' // nama column
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            id_promo: {
                type: sequelize.INTEGER,
                references: {
                    model: 'promos',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            no_invoice: {
                type: sequelize.STRING,
            },
            customer_name: {
                type: sequelize.STRING,
            },

            date_order: {
                type: sequelize.DATE,
                default: new DATE(),
            },
            sender_addres: {
                type: sequelize.TEXT,
            },
            receiver_addres: {
                type: sequelize.TEXT,
            },
            total_price: {
                type: sequelize.FLOAT,
            },
            order_status: {
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
        await queryInterface.dropTable("orders");
    }
};