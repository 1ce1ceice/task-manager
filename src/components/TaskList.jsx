import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (!tasks.length) {
    return <p className="empty-state">Задач пока нет.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

if (!tasks.length) {
  return (
    <div className="empty-state card">
      <h3>Пока нет задач</h3>
      <p>Добавь первую задачу, чтобы начать работу.</p>
    </div>
  );
}