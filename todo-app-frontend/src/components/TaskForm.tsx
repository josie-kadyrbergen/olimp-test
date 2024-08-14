import React, { useState } from 'react';

interface TaskFormProps {
    onSave: (task: { title: string; description?: string; status: string }) => void;
    task?: { title: string; description?: string; status: string };
    isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, task = { title: '', description: '', status: 'pending' }, isEditing = false }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, description, status });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-bold mb-4 text-center">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600 transition duration-300">
                {isEditing ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
