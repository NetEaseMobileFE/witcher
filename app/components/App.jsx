import React from 'react';

require('./App.less');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello World, and <span className="hello">hello</span></h1>
    );
  }
}
