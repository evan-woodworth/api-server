'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const { expect, it } = require('@jest/globals');
const request = supertest(server.app);
const { db, clothes, foods } = require('../src/models');

beforeAll(async () => {
  //makes sure that my tables exist
  await db.sync(); //creates our table if they do not exist
});

afterAll(async () => {
  //drops all of the table rows within our database instance
  await db.drop();
});

describe('Testing my Basic Express Server', () => {

  it('Should be able to output the name as a json object', async () => {

    let param = { name: 'Sam' };

    let response = await request.get('/person').send(param);
    // console.log(response);
    expect(response.text).toBe(`{\"name\":\"Sam\"}`);

  });

});

describe('Testing my food sequelize model', () => {

  it('Should be able to create a food', async () => {

    let newFood = await foods.create({
      name: 'banana',
      type: 'fruit',
      calories: 200,
    });

    expect(newFood.name).toEqual('banana');
    expect(newFood.type).toEqual('fruit');
    expect(newFood.calories).toEqual(200);

  });

});

describe('Testing my animal sequelize model', () => {

  it('Should be able to create an animal', async () => {

    let newAnimal = await clothes.create({
      name: 'shirt',
      size: 'l',
      brand: 'get some clothes',
    });

    expect(newAnimal.name).toEqual('shirt');
    expect(newAnimal.size).toEqual('l');
    expect(newAnimal.brand).toEqual('get some clothes');

  });

});

describe('Testing CRUD routes', () => {

  it('Should return a new food on POST /', async () => {
    
    let param = {
      name: 'chicken',
      type: 'yummy',
      calories: 5,
    };

    const response = await request.post('/api/foods').send(param);

    expect(response.text).toContain('chicken');
    expect(response.text).toContain('yummy');
  });

  it('Should return all foods on GET /', async () => {

    const response = await request.get('/api/foods');

    expect(response.text).toContain('banana');
    expect(response.text).toContain('fruit');
    expect(response.text).toContain('chicken');
    expect(response.text).toContain('yummy');
  });

  it('Should return a specific food on Get /:id', async () => {

    const response = await request.get('/api/foods/1');

    expect(response.text).toContain('banana');
  });

  it('Should return an updated record on PUT /:id', async () => {

    let param = {
      name: 'Apple',
    };

    const response = await request.put('/api/foods/1').send(param).set('Accept','application/json');

    expect(response.text).toContain('Apple');
  });

  it('Should return id of deleted item on DELETE /:id', async () => {

    const response = await request.delete('/api/foods/1');

    expect(response.text).toContain('1');
  });

});