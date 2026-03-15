import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://taskapp-backend-7u53.onrender.com/api/tasks/'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const fetchTasks = async () => {
    const res = await axios.get(API)
    setTasks(res.data)
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async () => {
    if (!input.trim()) return
    await axios.post(API, { title: input, completed: false })
    setInput('')
    fetchTasks()
  }

  const toggleTask = async (task) => {
    await axios.patch(`${API}${task.id}/`, { completed: !task.completed })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API}${id}/`)
    fetchTasks()
  }

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Bindu Task Manager</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: '10px 14px', fontSize: 16, border: '1px solid #ddd', borderRadius: 8, outline: 'none' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      {tasks.length === 0 && <p style={{ color: '#888' }}>No tasks yet. Add one above.</p>}

      {tasks.map(task => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <span style={{ flex: 1, fontSize: 16, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : '#111' }}>
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            style={{ padding: '4px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}