const Todos = require('./todo-model.js');
const jwt = require("jsonwebtoken");

class Todo {

	async findAllReturn(req, res){
		try{
			// const items = await Todos.find({});
			// res.send(items)
		}catch(e){
			res.send({e})
		}
	}

    async addItem(req, res){
        try{
            // await Todos.create(req.body);
            // const items = await Todos.find({});
            // res.send(items)
            if(req.body.todo.user === 'guest'){
                
                let tempArray = req.body.currentTodos;
                tempArray.push(req.body.todo);
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            }
            console.log(req.body)
        }catch(e){
            res.send({e})
        }
    }

    async updateItem(req, res){

        try{
            console.log(req.body)
            if(req.body.form.user === 'guest'){
                let tempArray = req.body.currentTodos;
                tempArray[req.body.form.index] = req.body.form; 
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token)
            }
            // const theOne = await Todos.findById(req.body._id);
            // console.log("theOne " + theOne)
            // await Todos.updateOne(theOne, 
            // {
            //     title : req.body.title,
            //     description : req.body.description || '',
            //     color: req.body.color || ''
            // });
            // const items = await Todos.find({});
            // res.send(items)
        }catch(e){
            console.log(e)
        }
    }

    async deleteItem(req, res){
        try{
            console.log(req.body)
            if(req.body.todo.user === 'guest'){
                let tempArray = req.body.currentTodos;
                tempArray.splice(req.body.todo.index, 1);
                const token = jwt.sign({ username: 'guest', todos: tempArray}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send(token);
            }
            // const theOne = await Todos.findOne(req.body);
            // console.log("theOne " + theOne)
            // await Todos.deleteOne(theOne);
            // const items = await Todos.find({});
            // res.send(items)
        }catch(e){
            console.log(e)
        }
    }

}

module.exports = new Todo()