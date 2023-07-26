const Hapi = require('@hapi/hapi');
const { ClientError } = require('./commons/exceptions');
const { config } = require('./commons/config');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');

async function createServer() {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: {
      request: ['error'],
    },
  });

  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  await server.register([
    {
      plugin: albums,
      options: {
        albumsService,
      },
    },
    {
      plugin: songs,
      options: {
        songsService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode);
    }

    return h.continue;
  });

  return server;
}

(async () => {
  const server = await createServer();
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
})();
