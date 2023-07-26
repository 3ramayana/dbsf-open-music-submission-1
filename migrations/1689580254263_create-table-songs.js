exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    year: {
      type: 'INT',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(250)',
      notNull: true,
    },
    duration: {
      type: 'INT',
      notNull: false,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
  });
};

// eslint-disable-next-line no-unused-vars
exports.down = (pgm) => {
  /**
   * 2. @TODO
   * hapuslah tabel songs dengan perintah pgm.dropTable()
   *
   * Catatan: referensi modul Dicoding: https://www.dicoding.com/academies/271/tutorials/17468
   */
};
