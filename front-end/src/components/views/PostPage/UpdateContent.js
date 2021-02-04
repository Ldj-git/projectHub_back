import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import store from '../store';

export default class UpdateContent extends Component {
    state = {
      id:store.getState().contents[store.getState().selected_content_id-1].id,
      _content:store.getState().contents[store.getState().selected_content_id-1],
      title:store.getState().contents[store.getState().selected_content_id-1].title,
      desc:store.getState().contents[store.getState().selected_content_id-1].desc,
    }
    render(){
      var _contents = Array.from(store.getState().contents);
      return(
        <div>
          <article>
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
               <input 
                  id='title_txt' 
                  type="text" 
                  name="title" 
                  value={this.state.title} 
                  onChange={function(e){
                    this.setState({
                      [e.target.name]:e.target.value
                    })
                  }.bind(this)}>
                </input>
            </p>
            <div className="Write">
              <textarea 
                className='textarea' 
                name="desc" 
                value={this.state.desc}
                onChange={function(e){
                  this.setState({
                    [e.target.name]:e.target.value
                  })
                }.bind(this)}/>
             <ReactMarkdown source={this.state.desc} className='markdown'/>
            </div>
          <Link to="/readToc"><button style={{fontSize:40}}onClick={function(){
            _contents[store.getState().selected_content_id-1].title = this.state.title;
            _contents[store.getState().selected_content_id-1].desc = this.state.desc;
            store.dispatch({type:'UpdateContent', _contents});
          }.bind(this)}>UPDATE</button></Link>
        </article>
        </div>
      )
    }
  }