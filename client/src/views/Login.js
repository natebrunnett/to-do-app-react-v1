import React, {useState} from 'react'
import axios from 'axios';
import URL from '../components/config.js'
import * as jose from 'jose';
import { useNavigate } from 'react-router-dom';


function Login({setUser, setTodos}) {
    let navigate = useNavigate();
    const [option, setOption] = useState(null);
    const [form, setValues] = useState(
        {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        }
    ) 
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setValues(
            {
               ...form,
                [e.target.name]: e.target.value
            }
        );
    }

    const LoginFormSubmission = async() => {
        if(option === 'new'){
            //add
            const response = await axios.post(URL + '/users/add', form)
            console.log(response)
            if(response.data.ok === false){
                setMsg(response.data.message);
                return false;
            }
            else{
                localStorage.setItem("token", JSON.stringify(response.data.token));
                let decodedToken = jose.decodeJwt(response.data.token);
                setTodos(decodedToken.todos);
                setUser(decodedToken.username);
                return true
            }
            /*
            if the response is ok
                method to setToken
                return true
            else
                grab error data from response
                return false
            */
        } else if(option === 'existing'){
            const response = await axios.post(URL + '/users/login', form)
            console.log(response)
        }
        return false;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('submit')
        let submitOK = null;
        try {
            submitOK = await LoginFormSubmission()
        } catch (error) {
            submitOK = false;
            console.log(error);
        }
        console.log(submitOK)
        if(submitOK === true)
        {
        setValues(
            {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
            })
        navigate('/');
        }
        else{
            //do nothing, the form is incomplete
        }
    }

    return (
        <div className='flex flex-col items-center h-screen bg-slate-600 text-lime-400'>
            <h1 className='text-7xl animate-bounce pt-10'>Login</h1>
            {/********  form start **********/}
            {option === null ?
                <div className='text-5xl mt-6 flex flex-col gap-2'>
                    <h1 className='mb-5'>Who are you?</h1>
                    <h1 
                        className='italic bg-black rounded-2xl hover:text-white p-3 cursor-pointer'
                        onClick={() => setOption('new')}
                    >New user</h1>
                    <h1 
                        className='italic bg-black rounded-2xl hover:text-white p-3 cursor-pointer'
                        onClick={() => setOption('existing')}
                    >Existing user</h1>
                    <h1>{option}</h1>
                </div>
            : option === 'new'?
            <div className='mt-5 flex flex-col'>
                <h1 className='text-2xl text-center italic '>Ahhh a new user</h1>
                <h1 className='text-center text-2xl text-red-500 mt-3'>{msg}</h1>
                <form 
                    className='flex flex-col gap-4 text-2xl mt-3'
                    onSubmit={handleSubmit}
                >
                    <h1>Username</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                    />
                    <h1>Password</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='password'
                        value={form.password}
                        type='password'
                        onChange={handleChange}
                    />
                    <h1>Confirm password</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='confirmPassword'
                        value={form.confirmPassword}
                        type='password'
                        onChange={handleChange}
                    />
                    <h1>Email</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <button className=' bg-lime-400 text-black p-3 text-3xl font-bold rounded-3xl'>Submit</button>
                </form>
                <button className='text-5xl mt-2' onClick={() => setOption(null)}>👈</button>
            </div>
             :
            <div className='mt-5 flex flex-col'>
                <h1 className='text-2xl text-center italic '>Welcome back dude!</h1>
                <form 
                    className='flex flex-col gap-4 text-2xl mt-3'
                    onSubmit={handleSubmit}
                >
                    <h1>Username</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                    />
                    <h1>Password</h1>
                    <input 
                        className='rounded-2xl p-1 pl-4 text-black'
                        name='password'
                        value={form.password}
                        type='password'
                        onChange={handleChange}
                    />
                    <button className=' bg-lime-400 text-black p-3 text-3xl font-bold rounded-3xl'>Submit</button>
                </form>
                <button className='text-5xl mt-2' onClick={() => setOption(null)}>👈</button>
            </div>
            }
            {/*******  form end *********/}
            <button onClick={() => console.log(form)}>Debug form</button>
        </div>
  )
}

export default Login