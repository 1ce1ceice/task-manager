export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div className={task.completed ? 'task-item card task-item-completed' : 'task-item card'}>
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id, task.completed)}
        />

        <div className="task-text-block">
          <span className={task.completed ? 'done task-title' : 'task-title'}>
            {task.title}
          </span>
          <span className="task-status">
            {task.completed ? 'Задача завершена' : 'Активная задача'}
          </span>
        </div>
      </label>

      <button
        className="danger-btn"
        onClick={() => {
          const confirmed = window.confirm('Удалить эту задачу?');
          if (confirmed) {
            onDeleteTask(task.id);
          }
        }}
      >
        Удалить
      </button>
    </div>
  );
}