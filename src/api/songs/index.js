const SongsHandler = require('./handler');
const SongsValidator = require('./validator');
const routes = require('./routes');

const songs = {
  name: 'songs',
  register: async (server, { songsService }) => {
    const handler = new SongsHandler(SongsValidator, songsService);
    server.route(routes(handler));
  },
};

module.exports = songs;
