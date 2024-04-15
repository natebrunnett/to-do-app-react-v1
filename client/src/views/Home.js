import React, {useState, useEffect} from 'react'
import axios from 'axios';
import * as jose from 'jose'
import Header from '../components/Header'
import Write from '../components/Write'
import Todos from '../components/Todos'
import URL from '../components/config.js'
import DeveloperNotes from '../components/DeveloperNotes';

function Home({user, setUser}) {
    const defaultColor = "text-lime-400";
    const [todos, setTodos] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    
    useEffect(() => {
        // let getTodos = async () => {
        //     try {
        //         if(user === 'guest'){
        //             console.log("guest detected")
        //         }else {
        //             const response = await axios.get(URL + '/todos/');
        //             console.log(response);
        //             setTodos(response.data);
        //         }

        //     } catch (error) { console.log(error); }
        // }
        // getTodos();
        let detectToken = async () => {
            if(token){
                console.log("token detected")
                //send request to server to verify integrity of token
                //this will also update any changes made to the todos
                //use jose to get todos from token
                let decodedToken = jose.decodeJwt(token);
                setTodos(decodedToken.todos);
                setUser(decodedToken.username);
            }
            else{
                console.log("no token detected")
                try {
                    //create a guest token
                    const response = await axios.post(URL + '/users/guest');  
                    localStorage.setItem("token", JSON.stringify(response.data));
                    console.log('guest token saved to Local Storage')
                } catch (error) {
                    console.log(error);
                }
            }
        }
        detectToken();
    }, [token])
    
    
    let addTodo = async(todo) => {
        try {
            todo.color = defaultColor;
            todo.user = user;
            const response = await axios.post(URL + '/todos/add', {todo, currentTodos: todos});
            if(user === 'guest'){
                /*if user is read as guest, server will send back a token */
                let decodedToken = jose.decodeJwt(response.data);
                setTodos(decodedToken.todos);
                localStorage.setItem("token", JSON.stringify(response.data));
            }
            
        } catch (error) { console.log(error); }
    }

    let deleteTodo = async(todo, idx) => {
        try {
            todo.user = user;
            if(user === 'guest'){
                todo.index = idx; //we only need to add an idx if user is guest
                const response = await axios.post(URL + '/todos/delete', {todo, currentTodos: todos});
                /*if user is read as guest, server will send back a token */
                console.log(response)
                let decodedToken = jose.decodeJwt(response.data);
                setTodos(decodedToken.todos);
                localStorage.setItem("token", JSON.stringify(response.data));
            }
            //console.log(response);
            //setTodos(response.data);
        } catch (error) { console.log(error); }
    }

    let updateTodo = async(form, idx) => {
        try {
            form.user = user;
            if(user === 'guest'){
                form.index = idx;
                const response = await axios.post(URL + '/todos/update', {form, currentTodos: todos});
                let decodedToken = jose.decodeJwt(response.data);
                setTodos(decodedToken.todos);
                localStorage.setItem("token", JSON.stringify(response.data));
            }
            //setTodos(response.data);
          } catch (error) { console.log(error); }
    }



    return (
    <main className='h-screen bg-slate-700'>
        <Header />
        <Write setTodos={setTodos} todos={todos} addTodo={addTodo}/>
        <Todos todos={todos} deleteTodo={deleteTodo} setTodos={setTodos} updateTodo={updateTodo}/>
        <DeveloperNotes />
    </main>
    )
}

export default Home