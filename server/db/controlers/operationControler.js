const operationModel = require('../models/operationModel');

exports.findAll = (req, res) => {
  operationModel.find((err, result) => {
    if (err) return console.error('operationModel', err);
    console.log(`read successfully`);
    res.send(result);
  });
};

exports.create = (req, res) => {
  req.body.forEach(operation => {
    operationModel.create({
      date: operation.date,
      type: operation.type,
      article: operation.article,
      account: operation.account,
      cost: operation.cost,
      description: operation.description,
    }, (err, result) => {
      if (err) return console.error('operationModel', err);
      console.log(`saved successfully`, operation.cost);
    });
  });
  res.sendStatus(200);
};

exports.delete = (req, res) => {
  operationModel.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) return console.error('operationModel', err);
    console.log(`remove successfully`);
    res.send(result);
  });
};
