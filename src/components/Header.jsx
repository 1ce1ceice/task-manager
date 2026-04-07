import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-row">
        <div className="logo">Task Manager</div>
        <button className="secondary-btn" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
}