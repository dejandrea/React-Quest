import { useState } from "react";
import "./GitHubExplorer.css";
import GitHubRepoCard from "./GitHubRepoCard";

function GitHubExplorer({projects, onImportRepository}) {
  const [repositories, setRepositories] = useState([]);
  const [username, setUsername] = useState("profAndreaFranca");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  async function searchRepositories(loadMore = false) {
    if (loading) return;
    setHasSearched(true);
    const user = loadMore ? searchedUsername : username.trim();
    const nextPage = loadMore ? page + 1 : 1;

    if (!user) {
      setError("Por favor, insira um nome de usuário válido.");
      setRepositories([]);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);
    if (!loadMore) {
      setRepositories([]);
      setHasMore(false);
      setPage(0);
      setSearchedUsername(user);
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=30&page=${nextPage}`,
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

      setRepositories((previous) => {
        if (!loadMore) return data;
        const existingIds = new Set(previous.map((repository) => repository.id));
        return [...previous, ...data.filter((repository) => !existingIds.has(repository.id))];
      });
      setPage(nextPage);
      setHasMore(/<[^>]+>;\s*rel="next"/.test(response.headers.get("Link") || ""));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleImport(repository) {
    const imported = onImportRepository(repository);

    if (!imported) {
      window.alert("Este repositório já existe no portfólio.");
      return;
    }

    window.alert("Este repositório foi importado com sucesso.");
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

        <button type="button" onClick={() => searchRepositories()} disabled={loading}>
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

      {repositories.length > 0 && (
        <div className="github-repositories">
          {repositories.map((repository) => {
            const normalizeUrl = (url) =>
              (url || "")
                .trim()
                .replace(/\/+$/, "")
                .replace(/\.git$/i, "")
                .toLowerCase();

            const isImported = projects.some(
              (project) =>
                normalizeUrl(project.githubUrl) ===
                normalizeUrl(repository.html_url),
            );

            return (
              <GitHubRepoCard
                key={repository.id}
                repository={repository}
                onImportRepository={handleImport}
                isImported={isImported}
              />
            );
          })}
        </div>
      )}
      {hasMore && (
        <button
          type="button"
          className="github-explorer__load-more"
          onClick={() => searchRepositories(true)}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Ver mais"}
        </button>
      )}
    </section>
  );
}
export default GitHubExplorer;
