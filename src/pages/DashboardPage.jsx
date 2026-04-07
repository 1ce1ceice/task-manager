import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { auth, db } from '../lib/firebase';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let unsubscribeTasks = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setTasks([]);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(true);
      setError('');

      const tasksRef = collection(db, 'tasks');
      const tasksQuery = query(
        tasksRef,
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      unsubscribeTasks = onSnapshot(
        tasksQuery,
        (snapshot) => {
          const nextTasks = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }));

          setTasks(nextTasks);
          setLoading(false);
        },
        (err) => {
          console.error('Firestore error:', err);
          setError('Не удалось загрузить задачи.');
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeTasks) unsubscribeTasks();
    };
  }, []);

  const handleAddTask = async (title) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Add task error:', err);
      setError('Не удалось добавить задачу.');
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);

      await updateDoc(taskRef, {
        completed: !completed,
      });
    } catch (err) {
      console.error('Toggle task error:', err);
      setError('Не удалось обновить задачу.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (err) {
      console.error('Delete task error:', err);
      setError('Не удалось удалить задачу.');
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="page">
      <Header />
      <main className="container">
        <h1 className="page-title">Мои задачи</h1>

        <p className="page-subtitle">
          Управляй своими задачами, отслеживай прогресс и держи всё под контролем.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Всего</span>
            <strong className="stat-value">{totalTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Активные</span>
            <strong className="stat-value">{activeTasks}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Завершенные</span>
            <strong className="stat-value">{completedTasks}</strong>
          </div>
        </div>

        <TaskForm onAddTask={handleAddTask} />
        <FilterBar currentFilter={filter} onChangeFilter={setFilter} />

        {loading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <TaskList
            tasks={filteredTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}