import Manager from './component/Manager'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className=" bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
