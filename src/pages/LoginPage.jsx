import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="page auth-page">
      <div className="card">
        <h1>Вход</h1>
        <form className="form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button type="submit">Войти</button>
        </form>
        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}