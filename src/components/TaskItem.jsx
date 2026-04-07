export default function TaskItem({ task }) {
  return (
    <div className="task-item card">
      <label className="task-content">
        <input type="checkbox" checked={task.completed} readOnly />
        <span className={task.completed ? 'done' : ''}>{task.title}</span>
      </label>
      <button className="danger-btn">Удалить</button>
    </div>
  );
}