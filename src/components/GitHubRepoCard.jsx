import { useId, useState } from "react";
import "./GitHubRepoCard.css";

function GitHubRepoCard({ repository, onImportRepository, isImported}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionId = useId();
  const description = repository.description || "Sem descrição disponível.";
  const descriptionCharacters = Array.from(description);
  const hasLongDescription = descriptionCharacters.length > 100;
  const visibleDescription = hasLongDescription && !isDescriptionExpanded
    ? `${descriptionCharacters.slice(0, 100).join("")}…`
    : description;

  return (
    <article className="github-repo-card">
      <h3>{repository.name}</h3>

      <p id={descriptionId}>{visibleDescription}</p>
      {hasLongDescription && (
        <button
          type="button"
          className="github-repo-card__description-toggle"
          aria-expanded={isDescriptionExpanded}
          aria-controls={descriptionId}
          onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
        >
          {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}

      <div className="github-repo-card__details">
        <span>Linguagem: {repository.language +" " + repository.topics?.join(", ") || "Não especificada"}</span>

        <span>⭐ {repository.stargazers_count}</span>
      </div>
      <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
        Ver no GitHub
      </a>

      <button
        type="button"
        onClick={() => onImportRepository(repository)}
        disabled={isImported}
        className ="github-repo-card__import"
      >
        {isImported ? "Importado" : "Importar"}
      </button>
    </article>
  );
}

export default GitHubRepoCard;
