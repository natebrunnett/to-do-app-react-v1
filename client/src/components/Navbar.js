import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";

function Navbar({user, handleLogout}) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row items-center justify-between bg-slate-800 pt-1 pb-1 pr-2 gap-2'>
            <TiHome 
                size={'60px'} className='text-white ml-1 cursor-pointer'
                onClick={() => navigate('/')}
            />
            <div className='flex gap-3 items-center'>
                {user === 'guest' ? 
                <button 
                    className='text-white'
                    onClick={() => navigate('/login')}
                >Sign in</button> : 
                <div className='flex flex-col items-center'>
                    <h1 className='text-white'>{user}</h1>
                    <button 
                        className='bg-white text-black pl-2 pr-2 text-sm rounded-2xl mt-1'
                        onClick={() => handleLogout()}
                    >Sign out</button>
                </div>
                }
                <CgProfile size={'60px'} className='text-white'/>
            </div>
        </div>
    )
}

export default Navbar