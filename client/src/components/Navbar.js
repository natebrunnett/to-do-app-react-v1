import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";

function Navbar({user}) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row items-center justify-between bg-slate-800 pt-1 pb-1 pr-2 gap-2'>
            <TiHome 
                size={'60px'} className='text-white ml-1 cursor-pointer'
                onClick={() => navigate('/')}
            />
            <div className='flex gap-3'>
                <button 
                    className='text-white'
                    onClick={() => navigate('/login')}
                >Sign in</button>
                <CgProfile size={'60px'} className='text-white'/>
            </div>
        </div>
    )
}

export default Navbar