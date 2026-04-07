import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    await onAddTask(trimmedTitle);
    setTitle('');
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новая задача"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

