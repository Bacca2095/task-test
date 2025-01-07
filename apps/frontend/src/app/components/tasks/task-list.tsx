import { Task } from '../../interfaces/task.interface';
import { TaskCard } from './task-card';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-y-auto max-h-[80vh] p-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export { TaskList, TaskListProps };
