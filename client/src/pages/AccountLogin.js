import { React, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import InputBox from '../components/InputBox';
import '../css/App.css';
import '../css/AccountSignup.css';

const sidebarContext = require.context("../../public/sidebarIcons", true);
const sidebarList = Object.fromEntries(sidebarContext.keys().map(icon => [icon.split(".")[1].substring(1), sidebarContext(icon)]));

function AccountSignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postLogin = () => {
    const body = {
      "username": username,
      "password": password
    };
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:5000/login", body)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="mainContainer">
      <div id="signupContainer">
          <h1>Login</h1>
          <InputBox change={setUsername} src={sidebarList.account} name={"name"} type={"text"} placeholder={"Username"}/>
          <InputBox change={setPassword} src={sidebarList.padlock} name={"password"} type={"password"} placeholder={"Password"}/>
          <div id="buttonPair">
              <MenuButton clicked={() => postLogin()} id="buttonLeft" title="Login"/>
              <MenuButton clicked={() => navigate("/")} title="Cancel"/>
          </div>
          <div id="errorMessage"></div>
          <div id="signup"><p style={{fontWeight: 'bolder', textAlign: 'center'}}>Don't have an account?</p> <MenuButton clicked={() => navigate("/signup")} title="Signup"/></div>
      </div>
    </div>
  )
}

export default AccountSignUp