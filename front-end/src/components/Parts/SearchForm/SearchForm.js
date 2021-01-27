import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class SearchForm extends Component{
    render(){
        return(
            <Form>
                {/* <Form.Label htmlFor="inlineFormSearch">
                </Form.Label> */}
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Search Projects" />
                    </Col>
                    <Col>
                        <Button variant="outline-light" className="mb-2">
                            Search
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        )
    }
}
export default SearchForm;