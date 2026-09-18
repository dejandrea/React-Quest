import "./MissionFilters.css";

function MissionFilters({
  statusFilter,
  onStatusChange,
  technologyFilter,
  onTechnologyChange,
  difficultyFilter,
  onDifficultyChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <section className="mission-filters">
      <div className="mission-filters__group">
        {/* Status */}
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Pendentes">Pendentes</option>
          <option value="Concluídas">Concluídas</option>
        </select>
      </div>
      <div className="mission-filters__group">
        {/* Tecnologia */}
        <label htmlFor="technology-filter">Tecnologia</label>
        <select
          id="technology-filter"
          value={technologyFilter}
          onChange={(e) => onTechnologyChange(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Git">Git</option>
          <option value="IA">IA</option>
          <option value="Debug">Debug</option>
        </select>
      </div>
      <div className="mission-filters__group">
        {/* Dificuldade */}
        <label htmlFor="difficulty-filter">Dificuldade</label>
        <select
          id="difficulty-filter"
          value={difficultyFilter}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Fácil">Fácil</option>
          <option value="Média">Média</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <div className="mission-filters__group">
        {/* XP */}
        <label htmlFor="sort-order">Ordenar</label>

        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
        >
          <option value="Maior XP">Maior XP</option>

          <option value="Menor XP">Menor XP</option>
        </select>
      </div>
    </section>
  );
}

export default MissionFilters;
