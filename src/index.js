import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/home';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import User from './pages/user/User';
import Header from './components/header/header';

const routing = (
    <Router>
      <div>
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Route path="/user" component={User} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
