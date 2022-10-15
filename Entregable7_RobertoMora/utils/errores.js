import pick from 'lodash'

class BaseError extends Error {
  constructor(message, metadata = {}) {
    super(message)
    this.metadata = metadata
  }
}

class NotFoundError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = 404
  }
}

class BadRequestError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = 400
  }
}

class UnauthorizedError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = 401
  }
}

class InternalServerError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = 500
  }
}

const errorHandler = function (err, req, res, next) {
  let error = err
  const fieldTarget = ['message', 'metadata', 'httpStatusCode']
  if (!err instanceof BaseError) {
    error = new InternalServerError('Ah ocurrido un error desconocido', err)
  }
  res.status(error.httpStatusCode).json(pick(error, fieldTarget))
}

export default  {
  BaseError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  errorHandler,
}