import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import AuthPanel from './components/AuthPanel'

function App() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <>
      <Header onSignIn={() => setShowAuth(true)} />
      <main>
        <Hero />
        <About />
        <Menu onSignIn={() => setShowAuth(true)} />
        <Reservation />
      </main>
      <Footer />
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} />}
    </>
  )
}

export default App
