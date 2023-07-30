const Joi = require('joi');
const { InvariantError } = require('../../commons/exceptions');

const SongsValidator = {
  validatePostSongPayload(payload) {
    const scheme = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    });

    const result = scheme.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }

    return result.value;
  },

  validatePutSongPayload(payload) {
    const scheme = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    });

    const result = scheme.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }

    return result.value;
  },
};

module.exports = SongsValidator;
