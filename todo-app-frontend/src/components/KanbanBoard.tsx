import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
}

interface KanbanBoardProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
    const statuses = ['pending', 'in-progress', 'completed'];

    return (
        <div className="flex space-x-4">
            {statuses.map(status => (
                <div key={status} className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-center mb-4 capitalize">{status.replace('-', ' ')}</h2>
                    {tasks.filter(task => task.status === status).map(task => (
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
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
