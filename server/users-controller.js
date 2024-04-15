const Users = require('./user-model.js');
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

class User {

	async findAllReturn(req, res){
		try{
			const allUsers = await Users.find({});
			res.send(allUsers)
		}catch(e){
			res.send({e})
		}
	}

    async createGuestToken(req, res){
        try {
            const token = jwt.sign({ username: 'guest', todos: []}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.send(token)
        } catch (error) {
            console.log(error)
        }
    }
    
    async addUser(req, res){
        const salt = 'learn2code8134'
        try {
            console.log(req.body)
            const hash = await argon2.hash(req.body.password, salt);
            console.log("username = " + req.body.username);
            console.log("password = " + hash);
            console.log("email = " + req.body.email);
            await Users.create({
                username: req.body.username,
                password: hash,
                email: req.body.email
            })
        } catch (error) {
            console.log(error)
        }
    }


    // async addItem(req, res){
    //     try{
    //         await Todos.create(req.body);
    //         const items = await Todos.find({});
    //         res.send(items)
    //     }catch(e){
    //         res.send({e})
    //     }
    // }

    // async updateItem(req, res){

    //     try{
    //         console.log(req.body)
    //         const theOne = await Todos.findById(req.body._id);
    //         console.log("theOne " + theOne)
    //         await Todos.updateOne(theOne, 
    //         {
    //             title : req.body.title,
    //             description : req.body.description || '',
    //             color: req.body.color || ''
    //         });
    //         const items = await Todos.find({});
    //         res.send(items)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    // async deleteItem(req, res){
    //     try{
    //         console.log(req.body)
    //         const theOne = await Todos.findOne(req.body);
    //         console.log("theOne " + theOne)
    //         await Todos.deleteOne(theOne);
    //         const items = await Todos.find({});
    //         res.send(items)
    //     }catch(e){
    //         res.send({e})
    //     }
    // }

}

module.exports = new User()