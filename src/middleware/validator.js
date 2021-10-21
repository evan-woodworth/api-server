'use strict';

module.exports = function (request, response, next) {

  let body = request.body;
  console.log(body);

  // if query string has the name property, send the request through when valid, forces an error when not.
  if ('name' in body) {
    next();
  } else {
    next('500 Server Error');
  }

};