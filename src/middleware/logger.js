'use strict';

module.exports = function (req, res, next) {

  let method = req.method;
  let path = req.path;
  console.log(`Method: ${method}, Path: ${path}`);

  if (method === 'GET' && path === '/person') {
    next();
  } else {
    next('404 Not Found');
  }
};