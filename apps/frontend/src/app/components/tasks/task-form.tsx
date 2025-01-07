import { useState } from 'react';
import { Task } from '../../interfaces/task.interface';
import { Input } from '../inputs/input';
import { Textarea } from '../inputs/textarea';
import { Button } from '../buttons/button';

interface TaskFormProps {
  task?: Partial<Task>;
  onSubmit: (task: Partial<Task>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task = {}, onSubmit }) => {
  const [title, setTitle] = useState<string>(task.title || '');
  const [description, setDescription] = useState<string>(
    task.description || ''
  );
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      onSubmit({ title, description });
    }
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
      <div>
        <Input
          label="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <Textarea
          label="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <Button label={task.id ? 'Edit Task' : 'Create Task'} type="submit" />
    </form>
  );
};

export { TaskForm, TaskFormProps };
