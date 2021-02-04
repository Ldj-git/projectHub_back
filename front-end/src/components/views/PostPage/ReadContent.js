import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import store from '../store';


export default class ReadContent extends Component {
    state = {
      contentId : Number(this.props.match.params.contentId),
    }
    constructor(props)
    {
      super(props);
      store.dispatch({type:'ReadContent', selected_id:Number(this.props.match.params.contentId)})
    }
  
    getReadContent(){
      var i=0;
        while(i < store.getState().contents.length){
          var data = store.getState().contents[i];
          if(data.id === Number(store.getState().selected_content_id)){
            return data;
          }
          i++;
        }
    }
  
    render(){
      return(
        <div>
          <Link to="/readToc"><button style={{fontSize:40}}>Back</button></Link>
          <Link to="/updateContent"><button style={{fontSize:40}}>Update</button></Link>
          <Link to="/readToc"><button style={{fontSize:40}} onClick={function(){
            var i=0;
            var newMaxContentId = store.getState().max_content_id - 1;
            var contents = Array.from(store.getState().contents);
            while(i < contents.length){
              if(contents[i].id === Number(store.getState().selected_content_id)){
                contents.splice(i,1);
                break;
              }
              i++;
            } 
            store.dispatch({type:'DeleteContent', contents, newMaxContentId})
          }}>Delete</button></Link>
  
           <p><input id='title_txt' type="text" readOnly value={this.getReadContent().title}></input></p>
           <ReactMarkdown source={this.getReadContent().desc} className='Readmarkdown'/>
        </div>
      )
    }
  }