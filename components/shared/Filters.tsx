export function Filters({filters, activeFilter, setActiveFilter}) {
  return (
    <div className="filters">
      {filters.map((filter, key) => (filter?.items?.length > 0 &&
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