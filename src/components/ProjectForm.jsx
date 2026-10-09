import { useState, useEffect } from "react";
import "./ProjectForm.css";

function ProjectForm({ onAddProject, editingProject, onUpdateProject }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [status, setStatus] = useState("Em andamento");
    const [githubUrl, setGithubUrl] = useState("");
    const [deployUrl, setDeployUrl] = useState("");

    useEffect(() => {
        if (editingProject) {
            setTitle(editingProject.title);
            setDescription(editingProject.description);
            setTechnologies(editingProject.technologies.join(", "));
            setStatus(editingProject.status);
            setGithubUrl(editingProject.githubUrl || "");
            setDeployUrl(editingProject.deployUrl || "");
        }
    }, [editingProject]);

    function handleSubmit(event) {
        event.preventDefault();

        if(!title || !description || !technologies) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if((githubUrl && !githubUrl.startsWith("http://") && !githubUrl.startsWith("https://")) ||
         (deployUrl && !deployUrl.startsWith("http://") && !deployUrl.startsWith("https://"))) {
            alert("Por favor, insira um link válido. Os links devem começar com http:// ou https://");
            return;
        }
        
        const newProject = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            technologies: technologies.split(",").map((tech)=> tech.trim() ),
            status: status,
            githubUrl: githubUrl,
            deployUrl: deployUrl,
        };

        if (editingProject) {
            onUpdateProject({
                ...newProject,
                id: editingProject.id,
            });
        } else {
            onAddProject(newProject);
        }

        setTitle("");
        setDescription("");
        setTechnologies("");
        setStatus("Em andamento");
        setGithubUrl("");
        setDeployUrl("");
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
                <div className="project-form__group">
                    <label htmlFor="project-github-url">URL do GitHub</label>
                    <input
                        id="project-github-url"
                        type="text"
                        value={githubUrl}
                        onChange={(event) => setGithubUrl(event.target.value)}
                    />
                </div>
                <div className="project-form__group">
                    <label htmlFor="project-deploy-url">URL do deploy</label>
                    <input
                        id="project-deploy-url"
                        type="text"
                        value={deployUrl}
                        onChange={(event) => setDeployUrl(event.target.value)}
                    />
                </div>
                <button className="project-form__button" type="submit">
                    {editingProject ? "Salvar Alterações" : "Adicionar Projeto"}
                </button>
            </form>
        </section>
    );
}

export default ProjectForm;
