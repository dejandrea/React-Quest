import { useState } from "react";
import "./GitHubExplorer.css";
import GitHubRepoCard from "./GitHubRepoCard";

function GitHubExplorer() {
  const [repositories, setRepositories] = useState([]);
  const [username, setUsername] = useState("profAndreaFranca");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchRepositories() {
    setHasSearched(true);
    const user = username.trim();

    if (!user) {
      setError("Por favor, insira um nome de usuário válido.");
      setRepositories([]);
      return;
    }

    setLoading(true);
    setError(null);
    setRepositories([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username.trim())}/repos`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Usuário não encontrado.");
        }
        if (response.status === 403 || response.status === 429) {
          throw new Error(
            "Limite de requisições atingido. Tente novamente mais tarde.",
          );
        }
        throw new Error("Erro ao buscar repositórios.");
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Resposta inesperada da API.");
      }

      setRepositories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="github-explorer">
      <h2>Explorador GitHub</h2>

      <div className="github-explorer__form">
        <label htmlFor="github-username">Usuário do GitHub</label>

        <input
          id="github-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Digite um usuário"
        />
      

      <button type="button" onClick={searchRepositories} disabled={loading}>
        {loading ? "Carregando..." : "Buscar repositórios"}
      </button>
      </div>
      <p>{repositories.length} repositórios recebidos</p>

      {hasSearched && !loading && !error && repositories.length === 0 && (
        <p>Nenhum repositório público encontrado.</p>
      )}

      {loading && <p role="status">Consultando o GitHub...</p>}
      {error && (
        <p role="alert" className="github-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="github-repositories">
          {repositories.map((repository) => (
            <GitHubRepoCard key={repository.id} repository={repository} />
          ))}
        </div>
      )}
    </section>
  );
}
export default GitHubExplorer;
