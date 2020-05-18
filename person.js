const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/personDB", {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    subject: String
});

const person = mongoose.model('Person', personSchema);

module.exports = person;
