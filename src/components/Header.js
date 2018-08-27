import React, { Component } from 'react';
import Button from '@material-ui/core/es/Button/Button';
import { IMPORTANCE } from '../constants';


export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="btn-box">
          <Button
            onClick={() => this.props.updateFilter(null)}
          >
            ALL
          </Button>
          {
            IMPORTANCE.map(importance => (
              <Button
                key={importance}
                onClick={() => this.props.updateFilter(importance)}
              >
                {importance}
              </Button>
            ))
          }
        </div>
      </header>
    );
  }
}
