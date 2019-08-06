const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = new Schema({
    date: String,
    type: String,
    article: String,
    account: String,
    cost: {
      type: Number,
      set: val => +val
    },
    description: String
}, {
    versionKey: false,
    collection: 'operations'
});

module.exports = mongoose.model('operationModel', operationSchema);
