import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store from '../store';


export default class Toc extends Component {
    state = {
      storeState:store.getState(),
    }
  
    render(){
      
      var lists = [];
      var contents = this.state.storeState.contents;
      var i=0;
      while(i<contents.length){
        lists.push(<li key={contents[i].id} id='TocContents'>
                     <Link to={'/readContent/' + contents[i].id}>열기</Link>
                     <p>제목: {contents[i].title}</p>
                     <p>작성자: 전성표</p>
                    </li>)
        i++;
      }
      return(
        <nav id="gridRight">     
            {lists}
        </nav>
      )
    }
  }