const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    color: {type: String, required: false},
  });

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  todos: {todoSchema}
});

module.exports = mongoose.model("users", userSchema);