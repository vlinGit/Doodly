import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Canvas from './pages/Canvas';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/canvas" element={<Canvas height="1000" width="1000" />}/>
      </Routes>
    </Router>
  );
}

export default App;
