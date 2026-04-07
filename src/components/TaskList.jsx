import TaskItem from './TaskItem';

const demoTasks = [
  { id: 1, title: 'Сделать регистрацию', completed: false },
  { id: 2, title: 'Сделать список задач', completed: true },
];

export default function TaskList() {
  return (
    <div className="task-list">
      {demoTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}