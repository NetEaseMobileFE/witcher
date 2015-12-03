import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import App from './components/App.jsx';

let Main = (props) => (
  <div className="g-container">
    {props.children}
  </div>
)

let routes = (
  <Route component={Main}>
    <Route path="/" component={App}></Route>
  </Route>
);


ReactDOM.render(
  <Router>{routes}</Router>,
  document.body.appendChild(document.createElement('div'))
);
