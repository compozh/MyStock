const operation = require('../db/controlers/operationControler');

module.exports = app => {

  app.get('/operations', operation.findAll);
  app.post('/operations', operation.create);
  app.delete('/operations', operation.delete);

};
