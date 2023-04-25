import Home from './components/Home'
import Sivu2 from './components/Sivu2'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import RestaurantPage from './components/RestaurantPage'
import Creators from './components/Creators'
import Map from './components/Map/Map'
import { Routes, Route } from 'react-router-dom'
import Profile from "./components/Profile"
import {useState} from "react"
import AddNewLogin from "./components/AddNewLogin";


/*
cd client/raflareviewer
npm start

toisessa terminaalissa:
cd server
npm run server reviewer <- käynnistää palvelimen

(reviewer = mongodb salasana, pitää lisätä komentoon loppuun)

http://localhost:3000 <- app
http://localhost:3001/restaurants <- palvelin

(muistakaa npm install)
*/

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (

    <div className="main-layout">
      <Navigation isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sivu2" element={<Sivu2 />} />
        <Route path="/RestaurantPage" element={<RestaurantPage />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Creators" element={<Creators />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
              path="/AddNewLogin"
              element={<AddNewLogin setIsLoggedIn={setIsLoggedIn} />}
          />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
