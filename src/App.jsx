import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import GamePage from './Main/GamePage'
import Footer from './Components/Footer'
import Home from './Main/Home'
 

function App() {
  return (
    <>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='gamepage' element={<GamePage />} />
    </Routes>
      <Footer />
    </>
  )
}

export default App
