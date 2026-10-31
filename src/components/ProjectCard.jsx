import { useId, useState } from "react";
import "./ProjectCard.css";

function ProjectCard({
  title,
  description,
  technologies,
  status,
  githubUrl,
  deployUrl,
  onDelete,
  onEdit,
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [areTechnologiesExpanded, setAreTechnologiesExpanded] = useState(false);
  const technologiesId = useId();
  const hasMoreTechnologies = technologies.length > 6;
  const visibleTechnologies = areTechnologiesExpanded
    ? technologies
    : technologies.slice(0, 6);
  const descriptionId = useId();
  const descriptionCharacters = Array.from(description || "");
  const hasLongDescription = descriptionCharacters.length > 100;
  const visibleDescription =
    hasLongDescription && !isDescriptionExpanded
      ? `${descriptionCharacters.slice(0, 100).join("")}…`
      : description;

  return (
    <article className="project-card">
      <span className="project-card__status">{status}</span>
      <h3>{title}</h3>
      <p id={descriptionId}>{visibleDescription}</p>
      {hasLongDescription && (
        <button
          type="button"
          className="project-card__description-toggle"
          aria-expanded={isDescriptionExpanded}
          aria-controls={descriptionId}
          onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
        >
          {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
      <div id={technologiesId} className="project-card__technologies">
        {visibleTechnologies.map((technology) => (
          <span key={technology} className="project-card__technology">
            {technology}
          </span>
        ))}
      </div>
      {hasMoreTechnologies && (
        <button
          type="button"
          className="project-card__description-toggle"
          aria-label={
            areTechnologiesExpanded
              ? "Ver menos tecnologias"
              : "Ver mais tecnologias"
          }
          aria-expanded={areTechnologiesExpanded}
          aria-controls={technologiesId}
          onClick={() => setAreTechnologiesExpanded((expanded) => !expanded)}
        >
          {areTechnologiesExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
      <div className="project-card__actions">
        {githubUrl && (
          <a
            className="project-card__link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}

        {deployUrl && (
          <a
            className="project-card__link"
            href={deployUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver projeto
          </a>
        )}
      </div>
      <div className="project-card__actions">
        <button className="project-card__edit" type="button" onClick={onEdit}>
          Editar
        </button>
        <button
          className="project-card__delete"
          type="button"
          onClick={onDelete}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
