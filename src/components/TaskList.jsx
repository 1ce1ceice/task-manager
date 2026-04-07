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
