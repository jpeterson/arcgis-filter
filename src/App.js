import React, { Component } from 'react';

import ArcgisFilter from './ArcgisFilter';
import fieldsDefinition from './sample_incident_fields.json';

import logo from './esri.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      filterState: null
    };
  }

  handleFilterChanged = (filter, filterState) => {
    this.setState({ filter, filterState });
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
            filterState={sql}
            fields={fieldsDefinition}
            disableUnique={true}
            onChange={this.handleFilterChanged}
          />
        </div>
      </div>
    );
  }
}

const sql = {
  mustMatchAll: true,
  sets: {
    '17e77100-65e5-11e8-bc5a-876600b4d750': {
      mustMatchAll: true,
      expressions: {
        '17e77101-65e5-11e8-bc5a-876600b4d750': {
          field: {
            alias: 'ABCD Misc',
            editable: true,
            length: 4,
            name: 'ABCDMisc',
            nullable: true,
            type: 'esriFieldTypeString'
          },
          operator: {
            alias: 'ends with',
            operator: 'LIKE',
            prefix: '%'
          },
          value: {
            name: 'test',
            code: 'test'
          },
          valueType: 'value',
          id: '17e77101-65e5-11e8-bc5a-876600b4d750'
        },
        '20597590-65e5-11e8-bc5a-876600b4d750': {
          field: {
            alias: 'Critical Resource Needs',
            editable: true,
            length: 255,
            name: 'CriticalResourceNeeds',
            nullable: true,
            type: 'esriFieldTypeString'
          },
          operator: {
            alias: 'contains',
            operator: 'LIKE',
            prefix: '%',
            suffix: '%'
          },
          value: {
            name: 'colorado',
            code: 'colorado'
          },
          valueType: 'value',
          id: '20597590-65e5-11e8-bc5a-876600b4d750'
        }
      }
    },
    '270dc490-65e5-11e8-bc5a-876600b4d750': {
      mustMatchAll: true,
      expressions: {
        '270dc491-65e5-11e8-bc5a-876600b4d750': {
          field: {
            alias: 'Additional Fuel Model',
            domain: {
              name: 'NFFL_Fuel_Model',
              type: 'codedValue',
              codedValues: [
                {
                  name: 'Short Grass (1 foot)',
                  code: 'Short Grass (1 foot)'
                },
                {
                  name: 'Timber (Grass and Understory)',
                  code: 'Timber (Grass and Understory)'
                },
                {
                  name: 'Tall Grass (2.5 feet)',
                  code: 'Tall Grass (2.5 feet)'
                },
                {
                  name: 'Chaparral (6 feet)',
                  code: 'Chaparral (6 feet)'
                },
                {
                  name: 'Brush (2 feet)',
                  code: 'Brush (2 feet)'
                },
                {
                  name: 'Dormant Brush, Hardwood Slash',
                  code: 'Dormant Brush, Hardwood Slash'
                },
                {
                  name: 'Southern Rough',
                  code: 'Southern Rough'
                },
                {
                  name: 'Closed Timber Litter',
                  code: 'Closed Timber Litter'
                },
                {
                  name: 'Hardwood Litter',
                  code: 'Hardwood Litter'
                },
                {
                  name: 'Timber (Litter and Understory)',
                  code: 'Timber (Litter and Understory)'
                },
                {
                  name: 'Light Logging Slash',
                  code: 'Light Logging Slash'
                },
                {
                  name: 'Medium Logging Slash',
                  code: 'Medium Logging Slash'
                },
                {
                  name: 'Heavy Logging Slash',
                  code: 'Heavy Logging Slash'
                }
              ]
            },
            editable: true,
            length: 30,
            name: 'AdditionalFuelModel',
            nullable: true,
            type: 'esriFieldTypeString'
          },
          operator: {
            alias: 'is',
            operator: '='
          },
          value: {
            name: 'Brush (2 feet)',
            code: 'Brush (2 feet)'
          },
          valueType: 'value',
          id: '270dc491-65e5-11e8-bc5a-876600b4d750'
        },
        '3ff56880-f40d-11e8-8cd4-7bb9ee449bb2': {
          field: {
            alias: 'Containment Date Time',
            editable: true,
            length: 8,
            name: 'ContainmentDateTime',
            nullable: true,
            type: 'esriFieldTypeDate'
          },
          operator: {
            alias: 'in the last',
            operator: 'BETWEEN',
            relativeDate: true
          },
          value: { timeSizeValue: 3, timeSpanValue: 'months' },
          valueType: 'value',
          id: '3ff56880-f40d-11e8-8cd4-7bb9ee449bb2'
        }
      }
    }
  }
};

export default App;
