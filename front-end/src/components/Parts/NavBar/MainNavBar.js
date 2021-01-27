import React,{Component} from 'react';
import { Navbar,Button,Nav,ButtonGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import LSButton from './LSButton';

class NavBar extends Component{
    constructor(props){
        super(props);
    }

    //includes login,signup buttons
    render(){
        return(
            <div>
                <Navbar className = "Nav" bg="dark" variant="dark">
                        {/* Navbar 사용을 위해서 <LinkContainer>로 묶어줌 */}
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <div className="ProjectHubText">
                                    ProjectHub
                                </div>
                            </Navbar.Brand>
                        </LinkContainer>
                    <Nav className="mr-auto">
                        <LinkContainer to="/project">
                            <Nav.Link>
                                Projects
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link>
                                About Us
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <LSButton />
                    
                </Navbar>
            </div>
        )
    }
}

export default NavBar;