import { useState } from "react";
import "./ProjectForm.css";

function ProjectForm({ onAddProject }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [status, setStatus] = useState("Em andamento");

    function handleSubmit(event) {
        event.preventDefault();

        if(!title || !description || !technologies) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        const newProject = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            technologies: technologies.split(",").map((tech)=> tech.trim() ),
            status: status,
        };

        onAddProject(newProject);

        setTitle("");
        setDescription("");
        setTechnologies("");
        setStatus("Em andamento");
    }

    return (
        <section className="project-form-section">
            <div className="project-form-heading">
                <p>Novo Projeto</p>
                <h2>Crie seu próximo projeto</h2>
            </div>
            <form className="project-form" onSubmit={handleSubmit}>
                <div className="project-form__group">
                    <label htmlFor="project-title">Título</label>
                    <input
                        id="project-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="project-form__group">
                    <label htmlFor="project-description">Descrição</label>
                    <textarea
                        id="project-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className="project-form__group">
                    <label htmlFor="project-technologies">Tecnologias</label>
                    <input
                        id="project-technologies"
                        type="text"
                        value={technologies}
                        onChange={(event) => setTechnologies(event.target.value)}
                        placeholder="Insira as tecnologias separadas por vírgula"
                    />
                </div>
                <div className="project-form__group">
                    <label htmlFor="project-status">Status</label>
                    <select
                        id="project-status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </div>
                <button className="project-form__button" type="submit">
                    Adicionar Projeto
                </button>
            </form>
        </section>
    );
}

export default ProjectForm;
