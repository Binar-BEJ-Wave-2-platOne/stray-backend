'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable( 'verifikasi',{ 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // untuk membuat auto id secara pengulangan
        primaryKey: true, //key dari tabel untuk membedakan data 1 dan lainnya
        unique: true, // key nya untuk membuat validasi uniq, biar key id nya berbeda dan tidak sama
        allowNull: false
      },
      user_id: {   // penghubung ke create user
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'CASCADE',// mengikuti parent yang dihapus
        onUpdate: 'CASCADE'
                  //'RESTRICT', dilarang (misal mengikuti alur penghapusan data)
                  //'NO ACTION', tidak ada aksi apa2
      },
      kode_verifikasi: {
        type: Sequelize.STRING
      },
      expired_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ADMIN', 'MEMBER']
      },
      created_at: {
        type: Sequelize.DATE,
        default: new Date()
      },
      updated_at: {
        type: Sequelize.DATE,
        default: new Date()
      },
      deleted_at: {
        type: Sequelize.DATE
      },
    },
  );
},

async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('verifikasi');
}
};