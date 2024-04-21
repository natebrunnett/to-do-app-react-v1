const e = require('express');
const jwt = require("jsonwebtoken");
const Users = require('./user-model.js')

class Todo {

	async findAllReturn(req, res){
		try{
			// const items = await Todos.find({});
			// res.send(items)
		}catch(e){
			res.send({e})
		}
	}

    /* add, update, delete functions do not need an if else statement
    if(req.body.user !== 'guest') await Users.updateOne() */

    async addItem(req, res){
        try{
            // await Todos.create(req.body);
            // const items = await Todos.find({});
            // res.send(items)
            if(req.body.user === 'guest'){
                
                let tempArray = req.body.currentTodos;
                tempArray.push(req.body.todo);
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            } else{
                console.log("user detected, get todos in this user's schema")
                let tempArray = req.body.currentTodos;
                tempArray.push(req.body.todo);
                await Users.updateOne({username: req.body.user}, {todos: tempArray})
                console.log("todo array in mongodb-compass should update, but not the client")
                const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            }
        }catch(e){
            res.send({e})
        }
    }

    async updateItem(req, res){

        try{
            console.log(req.body)
            if(req.body.user === 'guest'){
                let tempArray = req.body.currentTodos;
                tempArray[req.body.form.index] = req.body.form; 
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            } else {
                let tempArray = req.body.currentTodos;
                tempArray[req.body.form.index] = req.body.form; 
                await Users.updateOne({username: req.body.user}, {todos: tempArray})
                const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            }
            
        }catch(e){
            console.log(e)
        }
    }

    async deleteItem(req, res){
        try{
            console.log(req.body)
            if(req.body.user === 'guest'){
                let tempArray = req.body.currentTodos;
                tempArray.splice(req.body.todo.index, 1);
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",}); 
                res.send(token);
            } else {
                console.log("user detected, get todos in user schema and delete by _id");
                let tempArray = req.body.currentTodos;
        //         tempArray.splice(req.body.todo.index, 1);
        //         const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
        //             expiresIn: "365d",}); 
        //         res.send(token);
            }

        }catch(e){
            console.log(e)
        }
    }

}

module.exports = new Todo()