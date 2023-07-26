class SongsHandler {
  constructor(validator, songsService) {
    this._validator = validator;
    this._songsService = songsService;
  }

  async postSongHandler(request, h) {
    const payload = this._validator.validatePostSongPayload(request.payload);
    const songId = await this._songsService.persistSongs(payload);
    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler() {
    const songs = await this._songsService.getSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._songsService.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    const { id } = request.params;
    const payload = this._validator.validatePutSongPayload(request.payload);

    await this._songsService.editSongById(id, payload);

    return {
      status: 'success',
      message: 'songs updated',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;

    await this._songsService.deleteSongById(id);

    return {
      status: 'success',
      message: 'song deleted',
    };
  }
}

module.exports = SongsHandler;
