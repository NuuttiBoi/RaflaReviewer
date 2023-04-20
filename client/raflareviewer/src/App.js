import Home from './components/Home'
import Sivu2 from './components/Sivu2'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import RestaurantPage from './components/RestaurantPage'
import Creators from './components/Creators'
import Map from './components/Map'
import { Routes, Route } from 'react-router-dom'
import {useEffect} from 'react';
import useScript from './hooks/useScript';
import useLink from './hooks/useLink';

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
  useScript('https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js');
  useLink('https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css','stylesheet');
  return (

    <div className="main-layout">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sivu2" element={<Sivu2 />} />
        <Route path="/RestaurantPage" element={<RestaurantPage />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Creators" element={<Creators />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
