import './App.css'
import Header from './components/Header'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import ProfileCard from './components/ProfileCard'

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
        <Welcome />
      </div>
      <Footer />
    </main>
  )
}

export default App