const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { NotFoundError } = require('../../commons/exceptions');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async persistAlbum({ name, year }) {
    const id = `albums-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3)',
      values: [id, name, year],
    };

    await this._pool.query(query);

    return id;
  }

  async getAlbumById(id) {
    const queryGetAlbum = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const queryGetSongs = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };

    const albumResult = await this._pool.query(queryGetAlbum);
    const songsResult = await this._pool.query(queryGetSongs);

    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan', 404);
    }

    const album = albumResult.rows[0];
    const result = {
      id: album.id,
      name: album.name,
      year: album.year,
      songs: songsResult.rows,
    };

    return result;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
