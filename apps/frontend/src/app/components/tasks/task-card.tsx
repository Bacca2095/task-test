import React, { useState } from 'react';
import { Task } from '../../interfaces/task.interface';
import useTaskApi from '../../hooks/useTaskApi';
import { IconButton } from '../buttons/icon-button';
import { IconPencil } from '../icons/icon-pencil';
import { IconTrash } from '../icons/icon-trash';
import { Modal } from '../modals/modal';
import { Button } from '../buttons/button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask } = useTaskApi();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task.id);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between h-full">
      <div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white truncate">
          {task.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <IconButton
          icon={<IconPencil size={20} className=" text-blue-600" />}
          onClick={handleEdit}
        />
        <IconButton
          icon={<IconTrash size={20} className=" text-red-600" />}
          onClick={openDeleteModal}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Delete"
        footer={
          <>
            <Button
              label="Cancel"
              variant="secondary"
              onClick={closeDeleteModal}
              type="button"
            />
            <Button label="Confirm" onClick={handleDelete} type="button" />
          </>
        }
      >
        <p className="text-gray-900 dark:text-white">
          Are you sure you want to delete the task "{task.title}"?
        </p>
      </Modal>
    </div>
  );
};

export { TaskCard, TaskCardProps };
