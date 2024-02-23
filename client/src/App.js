import './css//App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Canvas from './pages/Canvas';
import AccountSignUp from './pages/AccountSignup';
import AccountLogin from './pages/AccountLogin';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/canvas" element={<Canvas height="900" width="900" />}/>
        <Route path="/signup" element={<AccountSignUp />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/accountPage" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
