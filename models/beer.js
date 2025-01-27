const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const BeerSchema = new Schema({
  name: String
})

module.exports = mongoose.model("Beer", BeerSchema);
