import React, {Component} from 'react';
import SearchForm from './SearchForm';
import { Container,Row,Col } from 'react-bootstrap';
import './SearchFrame.css';

class SearchFrame extends Component {
    render(){
        return(
            <div className="searchframe">
               <Container fluid>
                   <Row>
                       <Col>
                            <div className="mainframe">
                                <h1>
                                    ProjectHub
                                </h1>
                                <br></br>
                                <h3>
                                    The Best Way to Collaborate
                                </h3>
                            </div>
                           
                       </Col>
                       <Col>
                            <SearchForm/>
                       </Col>
                   </Row>   
               </Container>
            </div>
        )
    }
}
export default SearchFrame;