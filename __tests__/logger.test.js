'use strict';

const logger = require('../src/middleware/logger.js');
const supertest = require('supertest');
const server = require('../src/server.js');

const request = supertest(server.app);

describe('Testing my logger', () => {

  let req = {
    method: 'GET',
    path: '/person',
  };
  let res = {};
  let next = jest.fn();
  console.log = jest.fn();

  it('Should be able to log the method and path', () => {

    logger(req, res, next);

    expect(console.log).toHaveBeenCalledWith('Method: GET, Path: /person');
    expect(next).toHaveBeenCalled();

  });

});