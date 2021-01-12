import './App.css';
import React,{Component} from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LandingPage from "./components/views/LandingPage/LandingPage";


class App extends Component{
  render(){
      return(
         <BrowserRouter>
         <div>
           <Switch>
             <Route exact  path="/" component={LandingPage} />
             <Route exact  path="/login" component={LoginPage} />
             <Route exact path="/register" component={RegisterPage} />
           </Switch>
         </div>
       </BrowserRouter>
        
      );
  }
}

export default App;
