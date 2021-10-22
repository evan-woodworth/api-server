'use strict';

const express = require('express');
const router = express.Router();
const { clothes, foods } = require('../../models');

const Collection = require('../../models/collection-class');

const modelMap = {
  clothes: new Collection(clothes),
  foods: new Collection(foods),
};

router.use('/:model/:id?', async (req, res, next) => {

  const model = modelMap[req.params.model];

  const method = req.method;

  if (!model) {
    next('No model found');
  }

  let id = null;
  if (req.params.id) {
    id = req.params.id;
  }

  switch(method) {
  case 'GET':
    if (id) {
      let records = await model.read(id);
      res.send(records);
    } else {
      let record = await model.read();
      res.send(record);
    }
    break;
  case 'POST': {
    let newRecord = await model.create(req.body);
    res.send(newRecord);
    break;
  }
  case 'PUT': {
    let updatedRecord = await model.update(id, req.body);
    res.send(updatedRecord);
    break;
  }
  case 'DELETE': {
    let deletedRecord = await model.delete(id);
    res.json(deletedRecord);
    break;
  }
  default:
    next('Model Router Error');
  }
});

module.exports = router;