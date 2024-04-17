const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  color: {type: String, required: false},
});

module.exports = mongoose.model("todos", todoSchema);