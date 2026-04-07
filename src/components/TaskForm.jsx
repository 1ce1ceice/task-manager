export default function TaskForm() {
  return (
    <form className="task-form card">
      <input type="text" placeholder="Новая задача" />
      <button type="submit">Добавить</button>
    </form>
  );
}