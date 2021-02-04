import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class CreatePanel extends Component {
    render(){
      return(
        <div id="CreatePanel">
          <Link to="/create">
            <button style={{fontSize:40}}>
              Create
            </button>
          </Link>
        </div>
      )
    }
  } 