const SongsHandler = require('./handler');
const SongsValidator = require('./validator');
const routes = require('./routes');

const songs = {
  name: 'songs',
  register: async (server, { songsService }) => {
    const handler = new SongsHandler(SongsValidator, songsService);

    /**
     * 3. @TODO
     * Daftarkan `routes(handler)` ke server melalui `server.route()`
     *
     * referensi: https://www.dicoding.com/academies/271/tutorials/14432
     */
  },
};

module.exports = songs;
