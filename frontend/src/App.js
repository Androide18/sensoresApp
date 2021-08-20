import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SensorList from './components/SensorList';
import SensorEdit from './components/SensorEdit';
import Report from './components/Report';
import Graphic from './components/Graphic';

class App extends Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/sensors' exact={true} component={SensorList}/>
          <Route path='/sensors/:id' component={SensorEdit}/>
          <Route path='/report' exact={true} component={Report}/>
          <Route path='/graphic' exact={true} component={Graphic}/>
        </Switch>
      </Router>
    )
  }
  }


export default App;
