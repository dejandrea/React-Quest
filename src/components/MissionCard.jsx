import "./MissionCard.css";
function MissionCard({title,description,technology,difficulty,xp,completed,onToggle}){
    return(
        <article className={`mission-card ${completed ? "mission-card--completed" : ""}`}>
            <div className="mission-card__header">
                <span className="mission-card__technology">{technology}</span>
                <span className="mission-card__difficulty">{difficulty}</span>
            </div>

            <h3>{title}</h3>

            <p className="mission-card__description">{description}</p>

            <div className="mission-card__footer">
                <strong>{xp} XP</strong>
                <button type="button" onClick={onToggle} className="mission-card__button">
                    {completed ? "Reabrir Missão" : "Concluir Missão"}
                </button>
            </div>
        </article>
    )
}
export default MissionCard;