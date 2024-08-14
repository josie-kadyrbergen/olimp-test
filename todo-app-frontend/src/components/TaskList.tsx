import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    created_at: string;
}

interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onStatusChange, currentPage, totalPages, setCurrentPage }) => {

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-8">
                <p>Your task list is empty. Add a new task to get started!</p>
            </div>
        );
    }
    return (
        <div>
            {tasks && tasks.map(task => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`py-2 px-4 mx-1 rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                        } hover:bg-blue-600 transition duration-300`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
