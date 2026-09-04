import "./MissionSearch.css";

function MissionSearch({ searchTerm, onSearchChange }) {
  return (
    <section className="mission-search">
      <label htmlFor="mission-search">Buscar Missão</label>
      <input
        id="mission-search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Digite o nome da missão..."
      ></input>
      {searchTerm && (
        <button
          type="button"
          className="mission-search__clear"
          onClick={() => onSearchChange("")}
        >
          Limpar Pesquisa
        </button>
      )}
    </section>
  );
}

export default MissionSearch;
