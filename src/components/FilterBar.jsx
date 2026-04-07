const filters = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Завершенные' },
];

export default function FilterBar({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={
            currentFilter === filter.value
              ? 'filter-btn filter-btn-active'
              : 'filter-btn'
          }
          onClick={() => onChangeFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}