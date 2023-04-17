import Home from './components/Home'
import Sivu2 from './components/Sivu2'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import RestaurantPage from './components/RestaurantPage'
import { Routes, Route } from 'react-router-dom'

/*
cd client/raflareviewer
npm start

toisessa terminaalissa:
cd server
npm run server <- käynnistää palvelimen

http://localhost:3000 <- app
http://localhost:3001/restaurants <- palvelin

(muistakaa npm install)
*/

function App() {

  return (
    <div className="main-layout">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sivu2" element={<Sivu2 />} />
        <Route path="/RestaurantPage" element={<RestaurantPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
