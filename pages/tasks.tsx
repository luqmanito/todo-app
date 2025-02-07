import { useEffect, useState } from 'react'
import axios from 'axios'

interface Task {
  id: number
  name: string
  description: string
  status: 'Not Started' | 'On Progress' | 'Done' | 'Reject'
  assignee: string
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTasks(response.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error('Error fetching tasks:', err)
      }
    }

    fetchTasks()
  }, [])

  const handleStatusChange = async (taskId: number, status:  'Not Started' | 'On Progress' | 'Done' | 'Reject') => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await axios.put(
        `/api/tasks/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)))
    } catch (err) {
      console.error('Error updating task status:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">Task Management</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">{task.name}</h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-2">
                <span className={`text-sm px-2 py-1 rounded ${task.status === 'Done' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}`}>{task.status}</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleStatusChange(task.id, 'Done')}
                  className="mr-2 bg-green-500 text-white p-2 rounded"
                >
                  Mark as Done
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'Reject')}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks
