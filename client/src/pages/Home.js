import React from 'react'
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import Header from '../components/Header';
import AccountSignUp from './AccountSignup';
import "../css/Home.css"

const sidebarContext = require.context("../../public/sidebarIcons", true);
const sidebarList = Object.fromEntries(sidebarContext.keys().map(icon => [icon.split(".")[1].substring(1), sidebarContext(icon)]));

const imageConstraint = {
  width: "58px",
}

// change to a request to server, if server finds this authtoken then direct to account page, otherwise signup page
const signupPage = (navigate) => {
  console.log(Cookie.get("authToken"))
  if (Cookie.get("authToken")){
    navigate("/accountPage");
  }else{
    navigate("/signup");
  }
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="mainContainer">    
        <div id="homeContainer" style={{marginTop:"-100px"}}>
          <div id="title">
            <h1>Doodly</h1>
            <img onClick={() => signupPage(navigate)} src={sidebarList.account} style={imageConstraint}/>
          </div>
          <div id="choice">
            <MenuButton clicked={() => {navigate("/canvas")}} title="New Canvas"/>
            <MenuButton title="Load Canvas"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;