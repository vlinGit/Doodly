import { React, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import InputBox from '../components/InputBox';
import '../css/App.css';
import '../css/AccountSignup.css';
import '../css/AccountPage.css';

const sidebarContext = require.context("../../public/sidebarIcons", true);
const sidebarList = Object.fromEntries(sidebarContext.keys().map(icon => [icon.split(".")[1].substring(1), sidebarContext(icon)]));

function AccountPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // change this to a server request
  const checkAuthToken = () => {
    if (!Cookies.get("authToken")){
      navigate('/signup');
    }
  }

  return (
    <div onLoad={() => checkAuthToken()} className="mainContainer">
      <div id="signupContainer">
        <div id="pfpImage">
          <img src={sidebarList.defaultPFP}/>
        </div>
        <MenuButton title="Doodles"/>
        <MenuButton title="Account Settings"/>
        <MenuButton clicked={() => navigate("/")} title="Close"/>
      </div>
    </div>
  )
}

export default AccountPage