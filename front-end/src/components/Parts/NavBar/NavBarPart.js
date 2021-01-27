import React, {Component} from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class NavBarPart extends Component {
    render(){
        return(
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
                        <LinkContainer to="/projects">
                            <Nav.Link>
                                Projects
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link>
                                About Us
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
            </Navbar>
        )
    }
}
export default NavBarPart;