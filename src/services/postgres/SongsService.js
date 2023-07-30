const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { NotFoundError } = require('../../commons/exceptions');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async persistSongs({
    title,
    year,
    genre,
    performer,
    duration = null,
    albumId = null,
  }) {
    const id = `songs-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) ',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    await this._pool.query(query);

    return id;
  }

  async getSongs(title, performer) {
    let text = 'SELECT id, title, performer FROM songs';
    // eslint-disable-next-line prefer-const
    let values = [];

    if (title) {
      text += " WHERE title ILIKE '%' || $1 || '%'";
      values.push(title);
    }

    if (!title && performer) {
      text += " WHERE performer ILIKE '%' || $1 || '%'";
      values.push(performer);
    }

    if (title && performer) {
      text += " AND performer ILIKE '%' || $2 || '%'";
      values.push(performer);
    }

    const query = {
      text,
      values,
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('songs is not found');
    }

    const song = {
      ...rows[0],
      albumId: rows[0].album_id,
    };

    delete song.album_id;

    return song;
  }

  async editSongById(
    id,
    { title, year, genre, performer, duration = null, albumId = null }
  ) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length > 0) {
      throw new NotFoundError('songs is not found');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length > 0) {
      throw new NotFoundError('songs is not found');
    }
  }
}

module.exports = SongsService;
