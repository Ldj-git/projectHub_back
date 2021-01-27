import React, {useState} from 'react'
import "./LoginForm.css"
import MainNavBar from "../../Parts/NavBar/MainNavBar"
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import LoginForm from "./LoginForm";
import { ThemeProvider } from 'react-bootstrap';
 
const cookies = new Cookies();

function LoginPage(props) {

    const onSuccessHandler = () => {
      props.history.push("/");
    }

    return (
      <div>
        <MainNavBar />
        <LoginForm onSuccess={onSuccessHandler} />
      </div>
    )
}

export default withRouter(LoginPage);
