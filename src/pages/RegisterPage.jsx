import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="page auth-page">
      <div className="card">
        <h1>Регистрация</h1>
        <form className="form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button type="submit">Создать аккаунт</button>
        </form>
        <p>
          Уже есть аккаунт? <Link to="/">Войти</Link>
        </p>
      </div>
    </div>
  );
}