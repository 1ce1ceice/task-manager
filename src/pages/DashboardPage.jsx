import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { auth, db } from '../lib/firebase';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubscribeTasks = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
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
          setError(err.message);
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeTasks) unsubscribeTasks();
    };
  }, [navigate]);

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

  return (
    <div className="page">
      <Header />
      <main className="container">
        <h1>Мои задачи</h1>
        <TaskForm onAddTask={handleAddTask} />

        {loading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}