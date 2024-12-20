import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Add component
import Home from './MainComponent/Home/Home';
import SubmitResearch from './MainComponent/SubmitResearch/SubmitResearch';
import Header from "./Common/Header/Header"
import Dashboard from './MainComponent/Dashboard/Dashboard';
import MyWall from './MainComponent/MyWall/MyWall';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/register" component={Home}></Route>
          <Route path="/login" component={Home}></Route>
          <Route path="/profiles/my_wall/:username" component={MyWall}></Route>
          {/* <Route path="/profiles/user_wall/:xyz_name" component={UserWall}></Route> */}
          <Route path="/submit" component={SubmitResearch}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;
