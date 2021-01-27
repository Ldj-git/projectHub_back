import React from 'react';
import { Button,ButtonGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function LSbutton(props) {
    const Logout = () => {
        cookies.remove("user");
    }
    var status = null;
    if(cookies.get("user") === undefined){
        status =
        <span>

        <LinkContainer to="/login">    
            <Button variant="outline-light">
                Login
            </Button>   
        </LinkContainer>
        <LinkContainer to="/register">    
            <Button variant="outline-light">
                Sign up
            </Button>
        </LinkContainer>
        </span>
    }
    else {
        status = 
        <LinkContainer to="/">    
            <Button variant="outline-light" onClick={Logout}>
                Logout
            </Button>   
        </LinkContainer>
    }
    return (
        <ButtonGroup>
            {status}

        </ButtonGroup>       
    )
   
}