'use strict';

module.exports = function(error, request, response, next) {

  console.log(error);
  response.status(500);
  response.end();

};