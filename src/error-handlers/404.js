'use strict';

module.exports = function(error, request, response, next) {

  console.log(error);
  response.status(404);
  response.end();

};