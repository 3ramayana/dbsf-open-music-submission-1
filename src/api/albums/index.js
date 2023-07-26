const AlbumsHandler = require('./handler');
const AlbumsValidator = require('./validator');
const routes = require('./routes');

const albums = {
  name: 'albums',
  register: async (server, { albumsService }) => {
    const handler = new AlbumsHandler(AlbumsValidator, albumsService);
    server.route(routes(handler));
  },
};

module.exports = albums;
