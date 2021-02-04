import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';

export default class CreateContent extends Component {
    constructor(props){
      super(props);
      this.state = {
        title:null,
        desc:null,
      }
    }
  
  handleChangeTITLE = (e) => {
    this.setState({title:e.target.value})
  }
  
    handleChangeDESC = (e) => {
      this.setState({desc:e.target.value})
    }
  
    render(){  
      return (
        <article>
          <stlyle>
            
          </stlyle>
            <p><input id='title_txt' type="text" name="title" placeholder="title 입력" onChange={this.handleChangeTITLE}></input></p>
            <div className="Write">
              <textarea 
                autoFocus 
                className='textarea' 
                name="desc" 
                placeholder="desc 입력" 
                onChange={this.handleChangeDESC}/>
            
            <ReactMarkdown source={this.state.desc} className='markdown'/>
            </div>
            <Link to="/readToc">
              <button 
              style={{fontSize:40}} 
              onClick={function(){ 
                this.props.onClick(this.state.title, this.state.desc);
              }.bind(this)}
              >만들기</button>
            </Link> 
        </article>
      )
    }
  }