import React, {useState, useEffect} from 'react'
import axios from 'axios';
import * as jose from 'jose'
import Header from '../components/Header'
import Write from '../components/Write'
import Todos from '../components/Todos'
import URL from '../components/config.js'
import DeveloperNotes from '../components/DeveloperNotes';

function Home({user, setUser, todos, setTodos}) {
    const defaultColor = "text-lime-400";
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    let processToken = async (token) => {
        //if there is a token, decode it, set user+todos, save it (for updates)
        if(token){
            console.log("token detected")
            let decodedToken = jose.decodeJwt(token);
            setTodos(decodedToken.todos);
            setUser(decodedToken.username);
            localStorage.setItem("token", JSON.stringify(token));
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

    useEffect(() => {
        processToken(token);
    }, [token])
    
    
    let addTodo = async(todo) => {
        try {
            todo.color = defaultColor;
            const response = await axios.post(URL + '/todos/add', {todo, currentTodos: todos, user});
            processToken(response.data)
        } catch (error) { console.log(error); }
    }

    let deleteTodo = async(todo, idx) => {
        try {
            todo.index = idx; //we only need to add an idx if user is guest
            const response = await axios.post(URL + '/todos/delete', {todo, currentTodos: todos, user});
            processToken(response.data);
        } catch (error) { console.log(error); }
    }

    let updateTodo = async(form, idx) => {
        try {
            form.index = idx;
            const response = await axios.post(URL + '/todos/update', {form, currentTodos: todos, user});
            processToken(response.data);
          } catch (error) { console.log(error); }
    }



    return (
    <main className='h-screen bg-slate-700 flex flex-col items-center'>
        <Header />
        <Write setTodos={setTodos} todos={todos} addTodo={addTodo}/>
        <Todos todos={todos} deleteTodo={deleteTodo} setTodos={setTodos} updateTodo={updateTodo}/>
        <DeveloperNotes />
    </main>
    )
}

export default Home