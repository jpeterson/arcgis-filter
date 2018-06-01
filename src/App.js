import React, { Component } from 'react';

import ArcgisFilter from './ArcgisFilter';
import fieldsDefinition from './sample_incident_fields.json';

import logo from './esri.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null
    };
  }

  handleFilterChanged = filter => {
    this.setState({ filter });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ArcGIS Filter Component</h1>
        </header>
        <div className="component-showcase">
          <ArcgisFilter
            fields={fieldsDefinition}
            disableUnique={true}
            onChange={this.handleFilterChanged}
          />
        </div>
      </div>
    );
  }
}

export default App;
