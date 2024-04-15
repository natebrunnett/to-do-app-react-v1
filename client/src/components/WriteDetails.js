import React, {useState, useEffect} from 'react'
import axios from 'axios'
import URL from './config.js'
import Calendar from './Calendar.js'
import ColorPicker from './ColorPicker.js'

function WriteDetails({todo, setTodos, updateTodo, index}) {

  const [form, setValues] = useState({
    _id: todo._id,
    title : todo.title,
    __v: todo.__v,
    description: todo.description || '',
    color: todo.color || 'text-lime-400',
  })

  useEffect(() => {
    console.log(form)
  }, [form])

  let handleChange = (e) => {
    e.preventDefault();
    setValues(
      { 
        ...form, 
        [e.target.name]: e.target.value 
      }
    )
  }

  let handleSubmit = async (e) => {
    e && e.preventDefault();
    updateTodo(form, index);
  }

  let topDivStyle = todo.color + ' relative';

  return (
    <div className={topDivStyle}>
        <textarea 
          className='bg-black p-2 pr-10 pb-20 rounded-2xl' 
          placeholder='description' 
          name='description'
          onChange={handleChange}
          value={form.description}
        />
        <button 
          className='absolute bg-white left-50 top-16 mt-10 text-black ml-2 pr-2 pl-2 pb-1 pt-1 w-9 rounded-full font-bold'
          onClick={handleSubmit}
        >💾</button>
        <button className='absolute bg-white rounded-full p-2 ml-2' >🎨</button>
        <ColorPicker handleSubmit={handleSubmit} form={form} setValues={setValues}/>
    </div>
  )
}

export default WriteDetails