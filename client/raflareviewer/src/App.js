import Home from './components/Home'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import RestaurantPage from './components/RestaurantPage'
import Creators from './components/Creators'
import Map from './components/Map/Map'
import {Routes, Route, Navigate} from 'react-router-dom'
import Profile from "./components/Profile"
import {useState, useEffect} from "react"
import AddNewLogin from "./components/AddNewLogin";
import './components/Darkmode/darkmode.css'
import DarkMode from './components/Darkmode/DarkMode'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

  return (
    <div className="main-layout">
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
        <Route path="/RestaurantPage" element={<RestaurantPage isLoggedIn={isLoggedIn}/>} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Creators" element={<Creators />} />
          <Route path="/profile" element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
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