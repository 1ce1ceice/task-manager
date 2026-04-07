import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function DashboardPage() {
  return (
    <div className="page">
      <Header />
      <main className="container">
        <h1>Мои задачи</h1>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}