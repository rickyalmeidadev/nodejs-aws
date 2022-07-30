export class Response {
  constructor(status, body, headers) {
    this.status = status;
    this.body = body;
    this.headers = headers;
  }
}

export class OKResponse extends Response {
  constructor(body, headers) {
    super(200, body, headers);
  }
}

export class CreatedResponse extends Response {
  constructor(body, headers) {
    super(201, body, headers);
  }
}

export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}
