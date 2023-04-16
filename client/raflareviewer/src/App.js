import Home from './components/Home'
import Sivu2 from './components/Sivu2'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

function App() {

  // ei toimi vielä
  return (
    <div className="main-layout">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sivu2" element={<Sivu2 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
