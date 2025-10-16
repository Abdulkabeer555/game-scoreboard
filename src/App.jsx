import Navbar from './Components/navbar'
import Footer from './Components/footer'
import System from './Main/system'
import { Route, Routes } from 'react-router-dom'
import GamePage from './Main/GamePage'
 

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
    <Routes>
      <Route path='/' element={<System />} />
      <Route path='gamepage' element={<GamePage />} />
    </Routes>
      <Footer />
    </>
  )
}

export default App
