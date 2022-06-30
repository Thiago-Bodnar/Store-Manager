class UnprocessableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnprocessableError';
  }
}

module.exports = UnprocessableError;