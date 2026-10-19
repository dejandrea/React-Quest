import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import DashboardPage from "./pages/DashboardPage";
import MissionsPage from "./pages/MissionsPage";
import ProjectsPage from "./pages/ProjectsPage";
import EvolutionPage from "./pages/EvolutionPage";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

const initialMissions = [
  {
    id: 1,
    title: "Criar componente de perfil",
    description: "Monte um card com nome, codinome e área favorita.",
    technology: "React",
    difficulty: "Fácil",
    xp: 50,
    completed: true,
  },
  {
    id: 2,
    title: "Reutilizar um componente",
    description: "Use o mesmo componente para exibir dados diferentes.",
    technology: "React",
    difficulty: "Fácil",
    xp: 50,
    completed: true,
  },
  {
    id: 3,
    title: "Criar a Central de Missões",
    description: "Exiba uma lista de missões utilizando componentes.",
    technology: "React",
    difficulty: "Média",
    xp: 100,
    completed: false,
  },
  {
    id: 4,
    title: "Investigar um erro",
    description: "Encontre e corrija um problema de props ou estado.",
    technology: "Debug",
    difficulty: "Média",
    xp: 80,
    completed: true,
  },
];

const initialProjects = [
  {
    id: 1,
    title: "Desenho com Gestos",
    description:
      "Aplicação que permite desenhar utilizando movimentos das mãos.",
    technologies: ["Python", "OpenCV", "MediaPipe"],
    status: "Concluído",
    githubUrl:
      "https://github.com/profAndreaFranca/Aula-Python-Desenho-com-Gestos-parte-2---CodeMinds.git",
    deployUrl: "",
  },
  {
    id: 2,
    title: "Detector de Invasores",
    description: "Jogo desenvolvido em Python com detecção e interação.",
    technologies: ["Python", "Pygame"],
    status: "Concluído",
    githubUrl:
      "https://github.com/profAndreaFranca/Aula-Python---Detector-de-Invasores---Gabarito.git",
    deployUrl: "",
  },
  {
    id: 3,
    title: "Loja Virtual com IA",
    description:
      "Loja virtual que utiliza inteligência artificial para auxiliar o usuário.",
    technologies: ["Python", "Flask", "HTML", "CSS"],
    status: "Concluído",
    githubUrl: "https://github.com/seu-usuario/loja-virtual-com-ia",
    deployUrl: "https://loja-virtual-com-ia.netlify.app",
  },
  {
    id: 4,
    title: "React Quest",
    description:
      "Plataforma de aprendizado para devs em React com missões, projetos e gamificação.",
    technologies: ["Vite", "React", "HTML", "CSS", "JavaScript"],
    status: "Em andamento",
    githubUrl: "https://github.com/profAndreaFranca/React-Quest--Completo.git",
    deployUrl: "https://react-quest-completo.vercel.app/",
  },
];

function App() {
  const [missions, setMissions] = useState(initialMissions);
  const [editingMission, setEditingMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [technologyFilter, setTechnologyFilter] = useState("Todas");
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("Maior XP");
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState(null);

  // console.log(statusFilter);
  function toggleMission(missionId) {
    const updatedMissions = missions.map((mission) => {
      if (mission.id === missionId) {
        return {
          ...mission,
          completed: !mission.completed,
        };
      }
      return mission;
    });
    setMissions(updatedMissions);
  }

  function addMission(newMission) {
    setMissions([...missions, newMission]);
  }

  function deleteMission(missionId) {
    const updatedMissions = missions.filter(
      (mission) => mission.id !== missionId,
    );
    setMissions(updatedMissions);
  }

  function updateMission(updatedMission) {
    const updatedMissions = missions.map((mission) =>
      mission.id === updatedMission.id ? updatedMission : mission,
    );
    setMissions(updatedMissions);
    setEditingMission(null);
  }

  function addProject(newProject) {
    setProjects([...projects, newProject]);
  }

  function deleteProject(projectId) {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto?",
    );

    if (!shouldDelete) {
      return;
    }

    const updatedProjects = projects.filter(
      (project) => project.id !== projectId,
    );
    setProjects(updatedProjects);
  }

  function updateProject(updatedProject) {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project,
    );
    setProjects(updatedProjects);
    setEditingProject(null);
  }

  const completedMissions = missions.filter((mission) => mission.completed);

  const completedMissionsCount = completedMissions.length;

  const earnedXp = completedMissions.reduce(
    (total, mission) => total + mission.xp,
    0,
  );

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch = mission.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "Todas" ||
      (statusFilter === "Concluídas" && mission.completed) ||
      (statusFilter === "Pendentes" && !mission.completed);

    const matchesTechnology =
      technologyFilter === "Todas" || mission.technology === technologyFilter;

    const matchesDifficulty =
      difficultyFilter === "Todas" || mission.difficulty === difficultyFilter;

    return (
      matchesSearch && matchesStatus && matchesTechnology && matchesDifficulty
    );
  });

  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sortOrder === "Menor XP") {
      return a.xp - b.xp; //menor para o maior
    }

    return b.xp - a.xp; //maior para o menor
  });

  const technologiesCount = new Set(
    projects.flatMap((project) => project.technologies).filter(Boolean),
  ).size;

  const completedProjects = projects.filter(
    (project) => project.status === "Concluído",
  );

  const technologyXP = {};

  completedProjects.forEach((project) => {
    project.technologies.forEach((tech) => {
      technologyXP[tech] = (technologyXP[tech] || 0) + 50;
    });
  });

  const skills = Object.entries(technologyXP).map(([tech, xp]) => ({
    tech,
    xp,
  }));

  const hasSkillAchievement = skills.some((skill) => skill.xp >= 100);

  const summaryData = [
    {
      id: 1,
      title: "Missões",
      value: completedMissionsCount,
      description: `${missions.length} Missões Disponíveis`,
    },
    {
      id: 2,
      title: "Projetos",
      value: projects.length,
      description: "Projetos Cadastrados",
    },
    {
      id: 3,
      title: "Tecnologias",
      value: technologiesCount,
      description: "Tecnologias Praticadas",
    },
    {
      id: 4,
      title: "Objetivos",
      value: 6,
      description: "Objetivos Estabelecidos",
    },
    {
      id: 5,
      title: "XP",
      value: earnedXp,
      description: "Experiência Acumulada",
    },
  ];

  return (
    <main className="app">
      <Header />
      <Navigation />

      <div className="dashboard">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                summaryData={summaryData}
              />
            }
          />

          <Route
            path="/missions"
            element={
              <MissionsPage
                missions={missions}
                filteredMissions={filteredMissions}
                sortedMissions={sortedMissions}
                editingMission={editingMission}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                technologyFilter={technologyFilter}
                setTechnologyFilter={setTechnologyFilter}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                addMission={addMission}
                updateMission={updateMission}
                toggleMission={toggleMission}
                deleteMission={deleteMission}
                setEditingMission={setEditingMission}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={projects}
                editingProject={editingProject}
                addProject={addProject}
                updateProject={updateProject}
                deleteProject={deleteProject}
                setEditingProject={setEditingProject}
              />
            }
          />

          <Route
            path="/evolution"
            element={
              <EvolutionPage
                skills={skills}
                hasSkillAchievement={hasSkillAchievement}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
