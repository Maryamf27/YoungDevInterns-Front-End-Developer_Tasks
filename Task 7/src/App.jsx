import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin2Fill } from "react-icons/ri";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showf, setShowf] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
    }
    setTodos(todos)
  }, [])
  const toggleF = (e) => {
    setShowf(!showf)
  }


  const saveTLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTLS()
  }
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    confirm("Are you sure you want to delete this Todo ?")
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTLS()
  }
  return (
    <>
      <Navbar />
      <div className=" mx-2 md:container md:mx-auto bg-slate-400 p-4 rounded-xl my-5 min-h-[85vh] md:w-1/2">
        <h1 className='text-center font-bold text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-2">

          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-slate-600 rounded-md px-2 text-sm disabled:bg-slate-500 font-bold py-1 hover:bg-slate-800 text-white '>Save</button>
        </div>
        <input onChange={toggleF} type="checkbox" checked={showf} name="" id="" />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-25 w-[90%] mx-auto my-3 '></div>
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div>No more Todos to display</div>}
          {todos.map(item => {
            return (showf || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between items-center "><div className='flex gap-5 items-center'>
              <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
            </div>
              <div className="buttons flex">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-slate-600 rounded-md px-2 text-sm font-bold py-1 hover:bg-slate-800 text-white m-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-600 rounded-md px-2 text-sm font-bold py-1 hover:bg-slate-800 text-white m-1'><RiDeleteBin2Fill /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
