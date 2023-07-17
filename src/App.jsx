import { useState } from "react"
import "./styles.css"

export default function App(){
  const [newItem, setNewItem] = useState("") 
  const [todos, setToDos] = useState([]) 

  function handleSubmit(e) {
    e.preventDefault()

    setToDos((currentTodos) => {
      return [...currentTodos, {id: crypto.randomUUID(), title: newItem, completed: false} 
      ]
    }
    )
      setNewItem("")
  }

  function toggleToDo(id, completed) {
    setToDos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setToDos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
  <form  onSubmit={handleSubmit} className="new-item-form">
    <div className="form-you">
      <label htmlFor="item">New Item</label>
      <input value= {newItem} onChange={e => setNewItem(e.target.value)}id="item" ></input> 
    </div>
    <button className="btn">Add</button>
  </form>
  <h1 className="header">To-Do List</h1>
  <ul className="list">
    {todos.length === 0 && "No Todos"}
    {todos.map(todo =>{
      return (
        <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed} onChange={(e) => toggleToDo(todo.id, e.target.checked)}/>
          {todo.title} 
        </label>
        <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
      </li>
      )
    })}
  </ul>
  </>
  )
}
