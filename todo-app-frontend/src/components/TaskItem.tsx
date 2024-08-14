import React, { useState } from 'react';
import Modal from './ConfirmationModal';

interface TaskItemProps {
    id: string;
    title: string;
    description?: string;
    status: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, status, onEdit, onDelete, onStatusChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        onDelete(id);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-4 transform transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                        {description && <p className="text-gray-600 mt-2">{description}</p>}
                    </div>
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(id, e.target.value)}
                        className="border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4 text-sm"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4 space-x-3">
                    <button onClick={() => onEdit(id)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Edit
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                        Delete
                    </button>
                </div>
            </div>

            {/* Modal for confirming deletion */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description={`Are you sure you want to delete the task "${title}"? This action cannot be undone.`}
            />
        </>
    );
};

export default TaskItem;
