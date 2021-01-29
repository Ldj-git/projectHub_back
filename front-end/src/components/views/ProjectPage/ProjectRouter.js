import React, { Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ProjectMainPage from "./ProjectMainPage"
import ProjectDetail from "./ProjectDetail"
import NewProject from "./NewProject"
import ProjectModify from "./ProjectModify"


class ProjectRouter extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/project/" component={ProjectMainPage} />
                <Route exact path="/project/read/:idx" component={ProjectDetail} />
                <Route exact path="/project/write" component={NewProject} />
                <Route exact path="/project/update/:idx" component={ProjectModify} />
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default ProjectRouter;