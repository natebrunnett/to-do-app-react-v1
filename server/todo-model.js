const mongoose = require("mongoose");

  // { 
  // image: [sundubu],
  // name: "Sundubu Jjigae Tofu Stew",
  // description: "Spicey soup with tofu, mushrooms, clams and vegetables",
  // price: 1599, 
  // quantity: 1
  // },

const todoSchema = new mongoose.Schema({
  user: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  color: {type: String, required: false},
});

module.exports = mongoose.model("todos", todoSchema);