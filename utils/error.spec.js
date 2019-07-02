/**
 * An abstract error class
 */
export class HttpClientError extends Error {
/**
* @param {String} message
* @param {Number} status
 * A function to load all routes
 */
  constructor(message = 'HTTPClientError occured!') {
    super(message);
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
 * @param {String} str
 * A function to load all routes
 */
  set message(str) {
    if (str instanceof Object) {
      this.message = JSON.stringify(str);
    } else {
      this.message = str;
    }
  }
}

/**
 * A class for HTTP400 error class
 */
export class Http400Error extends HttpClientError {
  /**
 * constructor function to for HTTP400 error
 * @param {String} message
 * @param {Number} status
 */
  constructor(message = 'bad request', status = 400) {
    super(message);
    this.status = status;
  }
}

/**
 * A class for HTTP404 error
 */
export class Http404Error extends HttpClientError {
  /**
 * constructor function for HTTP404 error
 * @param {String} message
 * @param {Number} status
 */
  constructor(message = 'Method not found', status = 404) {
    super(message);
    this.status = status;
  }
}
