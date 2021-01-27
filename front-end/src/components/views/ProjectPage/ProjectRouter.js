import React, { Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import List from "./List"
import PostDetail from "./PostDetail"
import NewPost from "./NewPost"
import PostModify from "./PostModify"


class ProjectRouter extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/project/" component={List} />
                <Route exact path="/project/read/:idx" component={PostDetail} />
                <Route exact path="/project/write" component={NewPost} />
                <Route exact path="/project/update/:idx" component={PostModify} />
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default ProjectRouter;