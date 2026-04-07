export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div className="task-item card">
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id, task.completed)}
        />
        <span className={task.completed ? 'done' : ''}>{task.title}</span>
      </label>

      <button
        className="danger-btn"
        onClick={() => onDeleteTask(task.id)}
      >
        Удалить
      </button>
    </div>
  );
}