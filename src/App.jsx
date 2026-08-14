import './App.css'
import Header from './components/Header'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import ProfileCard from './components/ProfileCard'
import SummaryCard from './components/SummaryCard'
import MissionCard from './components/MissionCard'

const summaryData = [
  {
    id:1,
    title: "Missões",
    value: 5,
    description: "Desafios Disponíveis"
  },
  {
    id:2,
    title: "Projetos",
    value: 3,
    description: "Projetos Cadastrados"
  },
  {
    id:3,
    title: "Tecnologias",
    value: 7,
    description: "Tecnologias Praticadas"
  },
  {
    id:4,
    title: "Objetivos",
    value: 6,
    description: "Objetivos Estabelecidos"
  },
  {
    id:5,
    title: "XP",
    value: 1500,
    description: "Experiência Acumulada"
  }
]

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
    completed: false,
  },
]

function App(){
  return(
    <main className="app">
      <Header />
      <div className="dashboard">
        <ProfileCard
          name="Andréa"
          codename="CodeMaster"
          favoriteArea="Desenvolvimento Web"
          level="Aprendiz React"
        />

        <section className="summary-section">
          <h2>Resumo da Jornada</h2>
          <div className="summary-grid">
            {summaryData.map((item) => (
              <SummaryCard
                key={item.id}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <Welcome />
      </div>
      <Footer />
    </main>
  )
}

export default App