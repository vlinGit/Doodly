import React from 'react'
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="mainContainer">    
        <Header />
        <div id="choice">
          <MenuButton clicked={() => {navigate("/canvas")}} title="New Canvas"/>
          <MenuButton title="Load Canvas"/>
        </div>
      </div>
    </div>
  )
}

export default Home;