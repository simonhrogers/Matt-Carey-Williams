export function Filters({filters, activeFilter, setActiveFilter}) {
  return (
    <div className="filters">
      {filters.map((filter, key) => (
        <div 
          key={key} 
          className={`filter ${filter.value === activeFilter.value ? 'active' : ''}`}
        >
          <button
            onClick={() => setActiveFilter(filter)}
          >
            {filter.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Filters