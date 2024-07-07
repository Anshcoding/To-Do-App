import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { v4 as uuidv4 } from 'uuid';


function App() {
const [todo, settodo] = useState("")
const [todos, settodos] = useState([])  // it is a  array that conatins all todo
const [showfinished, setshowfinished] = useState(true)

useEffect(() => {   // load karegha saare todos ko
  let todoString=localStorage.getItem("todos")
  if(todoString){

    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
}, [])


const saveToLs=(param)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

const togglefinished=(e)=>{
setshowfinished(!showfinished)
}

  const handleEdit=(e,id)=>{
    let todo=todos.filter(item=>{
     return item.id===id
    })
settodo(todo[0].todo)  // essa kyu kiya [0].todo direct todo kyu nahi likha
handleDelete(e,id)

  }

  const handleDelete=(e,id)=>{
 let newtodos=todos.filter(item=>{
  return item.id!==id;
 })
 settodos(newtodos)
 saveToLs();
  }

  const handleAdd=()=>{
settodos([...todos, {id:uuidv4(), todo  , isCompleted: false}])
settodo("")
console.log(todos)
saveToLs();
  }

  const handleChange=(e)=>{
settodo(e.target.value) 
  }

  const handleCheckbox=(e) => {
   let id= e.target.name
   let index = todos.findIndex(item=>{
    return item.id===id;
   })
   let newtodos=[...todos];   // hame esse karke ke copy karna padegha jisee naya array bane
   newtodos[index].isCompleted=!newtodos[index].isCompleted;
   settodos(newtodos)
   saveToLs();
    }
  

  return (
    <>
    <Navbar/>
    <div className="md:container mx-3 md:mx-auto my-5 bg-violet-200 p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
      <h1 className='text-center text-brown '>Do What You Said and Don't get tricked by your Monkey mind. Control it</h1>
      <div className="addTodo flex flex-col gap-4">
        <h1 className='text-2xl font-bold my-5'>Add a Todo</h1>

        <div className="flex gap-3">

        <input onChange={handleChange} value={todo} type="text" className='w-full border-black border-2 rounded-lg px-5 py-1'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600 rounded-md p-4 py-1'>Save</button>
        </div>
      </div>
      <input type="checkbox" className='my-4' onChange={togglefinished} checked={showfinished} /> showfinished
      <div className='h-[1px] opacity-15 w-[90] mx-auto my-2 bg-black'></div>
      <h2 className='text-2xl font-bold'>Yours Todo</h2>
      <div className="todos">
        {todos.length===0 && <div className='flex font-bold text-lg justify-center items-center'>No Todo to Display!</div>}
        {todos.map(item=>{
           return  (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-2">
            <div className='flex gap-5'>

<input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
<div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
<div className="button flex h-full">
  <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-600 rounded-md p-4 py-1 mx-1 '><FaEdit /></button>
  <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-600 rounded-md p-4 py-1 mx-1'><MdDelete /></button>
</div>
      </div>
})}
      </div>
      


    </div>
    </>
  )
}

export default App
