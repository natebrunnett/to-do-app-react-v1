import React, {useState} from 'react'

function DeveloperNotes() {

    const [open, setOpen] = useState(false);

    return (
        <div className='ml-12'>
            <button onClick={() => setOpen(!open)}>ℹ️</button>
        {open && <p className='text-white w-96 text-sm mt-2 ml-1'>To dos will be stored in the brower's Local Storage for up to 365 days unless you use an online database 😉</p>
        }
        </div>
    )
}

export default DeveloperNotes