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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignup = () => {
    const body = {
      "username": username,
      "email": email,
      "password": password
    };

    if (username && password && email){
      axios.post("http://localhost:5000/signup", body)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      
      navigate("/");
    }
  }

  return (
    <div className="mainContainer">
      <div id="signupContainer">
          <h1>Signup</h1>
          <InputBox change={setEmail} src={sidebarList.email} name={"email"} type={"text"} placeholder={"Email"}/>
          <InputBox change={setUsername} src={sidebarList.account} name={"name"} type={"text"} placeholder={"Username"}/>
          <InputBox change={setPassword} src={sidebarList.padlock} name={"password"} type={"password"} placeholder={"Password"}/>
          <div id="buttonPair">
              <MenuButton clicked={() => postSignup()} id="buttonLeft" title="Create Account"/>
              <MenuButton clicked={() => navigate("/")} title="Cancel"/>
          </div>
          <div id="errorMessage"></div>
          <div id="login"><p style={{fontWeight: 'bolder', textAlign: 'center'}}>Have an account?</p> <MenuButton title="Login"/></div>
      </div>
    </div>
  )
}

export default AccountSignUp