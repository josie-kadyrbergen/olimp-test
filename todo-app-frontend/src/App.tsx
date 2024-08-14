import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Modal from './components/TaskModal';
import KanbanBoard from './components/KanbanBoard';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  created_at: string;  // добавлено для сортировки по дате создания
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('title');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [totalTasks, setTotalTasks] = useState(0);



  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('/tasks', {
        params: {
          status: filterStatus,
          page: viewMode === 'kanban' ? 1 : currentPage, // Показ всех задач в режиме Kanban
          limit: viewMode === 'kanban' ? totalTasks : tasksPerPage,
          sort: sortOption,
        },
      });
      setTasks(response.data.tasks);
      setTotalTasks(response.data.total);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [currentPage, filterStatus, sortOption, viewMode, totalTasks]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      fetchTasks();
    }
  }, [fetchTasks, currentPage, filterStatus, sortOption]);


  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
    fetchTasks();
  };

  const handleRegisterSuccess = () => {
    window.location.href = '/login';
  };

  const addTask = (task: { title: string; description?: string; status: string }) => {
    axios.post('/tasks', task).then((response) => {
      fetchTasks();
    });
    closeModal();
  };

  const updateTask = (task: { title: string; description?: string; status: string }) => {
    if (editingTask) {
      axios.put(`/tasks/${editingTask.id}`, task).then(() => {
        fetchTasks();
        setEditingTask(null);
      });
    }
    closeModal();
  };

  const deleteTask = (id: string) => {
    axios.delete(`/tasks/${id}`).then(() => {
      fetchTasks();
    });
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      openModal();
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      axios.put(`/tasks/${id}`, { ...task, status }).then(() => {
        fetchTasks();
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
      <Router>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">To-Do List</h1>
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />} />
              <Route path="/" element={isAuthenticated ? (
                  <>
                    <div className="flex justify-between mb-4">
                      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                        Add Task
                      </button>
                      <div>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg py-2 px-3 mr-2">
                          <option value="all">All</option>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded-lg py-2 px-3">
                          <option value="title">Sort by Title</option>
                          <option value="status">Sort by Status</option>
                          <option value="created_at">Sort by Date Created</option>
                        </select>
                        <button onClick={() => setViewMode('list')} className={`py-2 px-4 rounded-l ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-600 transition duration-300 ml-2`}>
                          List View
                        </button>
                        <button onClick={() => setViewMode('kanban')} className={`py-2 px-4 rounded-r ${viewMode === 'kanban' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-600 transition duration-300`}>
                          Kanban View
                        </button>
                      </div>
                    </div>

                    {viewMode === 'list' ? (
                        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} onStatusChange={handleStatusChange} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    ) : (
                        <KanbanBoard tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} onStatusChange={handleStatusChange} />
                    )}

                    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                      Logout
                    </button>

                    {/* Modal for Task Form */}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={editingTask ? "Edit Task" : "Add New Task"}
                        description=""
                    >
                      <TaskForm
                          onSave={editingTask ? updateTask : addTask}
                          task={editingTask || undefined}
                          isEditing={!!editingTask}
                      />
                    </Modal>
                  </>
              ) : (
                  <Navigate to="/login" />
              )} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
