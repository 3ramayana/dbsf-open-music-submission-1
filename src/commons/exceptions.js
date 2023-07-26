class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * 5. @TODO
 *
 * Buatlah kelas InvariantError yang merupakan turunan dari ClientError.
 * Dengan spesifikasi:
 * - Memiliki status code 400
 * - Memiliki nama InvariantError
 *
 * referensi: https://www.dicoding.com/academies/271/tutorials/14477
 *
 */

module.exports = { ClientError, NotFoundError, InvariantError };
