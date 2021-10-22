'use strict';

const express = require('express');
const app = express();
const apiRouter = require('./routes/api/v1.js');

app.use(express.json());

app.use('/api', apiRouter);

app.use(require('./middleware/logger'));
app.use(require('./error-handlers/404.js'));

app.use(require('./middleware/validator'));
app.get('/person', (req,res)=>{
  res.json({name: req.body.name});
});
app.use(require('./error-handlers/500.js'));

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('The server is running...'));
  },
};