import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Movies from './components/movies';
import favourites from './components/favourites';
import Favourites from './components/favourites';
import {BrowserRouter as Router,Switch,Route,BrowserRouter,Routes} from 'react-router-dom' 


function App() {
  return (
    
    <Router>
    <Navbar/>
    {/* <Banner/> */}
      <Routes>
      <Route path="/" element={<Movies/>}/>
      
      <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
      

    
    
    {/* <Movies/>
    <Favourites/> */}
    </Router>
    
  );
}

export default App;
