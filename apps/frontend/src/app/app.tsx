import { useState } from 'react';
import { IconButton } from './components/buttons/icon-button';
import { IconPlus } from './components/icons/icon-plus';
import { TaskList } from './components/tasks/task-list';
import useTaskApi from './hooks/useTaskApi';
import { Task } from './interfaces/task.interface';
import { Modal } from './components/modals/modal';
import { TaskForm } from './components/tasks/task-form';

const App: React.FC = () => {
  const { tasks, createTask, updateTask } = useTaskApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task?: Task) => {
    setSelectedTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (task: Partial<Task>) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, task);
    } else {
      const newTask: Omit<Task, 'id'> = {
        title: task.title || '',
        description: task.description || '',
      };
      await createTask(newTask);
    }

    closeModal();
  };

  return (
    <main className="w-screen h-screen mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center my-4">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Task Manager
          </h1>

          <div className="justify-end">
            <IconButton
              icon={<IconPlus />}
              onClick={() => openModal()}
            ></IconButton>
          </div>
        </div>

        <TaskList tasks={tasks || []} onEdit={openModal} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedTask ? 'Edit Task' : 'Create Task'}
      >
        <TaskForm
          task={selectedTask || { title: '', description: '' }}
          onSubmit={handleSubmit}
        />
      </Modal>
    </main>
  );
};

export { App };
