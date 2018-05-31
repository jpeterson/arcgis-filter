import React, { Component } from 'react';

import ArcgisFilter from './ArcgisFilter';
import fieldsDefinition from './sample_incident_fields.json';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="component-showcase">
          <ArcgisFilter fields={fieldsDefinition} />
        </div>
      </div>
    );
  }
}

export default App;
