import React, { Component } from 'react';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Button from '@material-ui/core/es/Button/Button';
import { IMPORTANCE } from '../constants';


export default class Header extends Component {
  render() {
    return (
      <header>
        <AppBar position="static" color="default">

          <div style={{ display: 'inline' }}>
            <Button
              variant="text"
              onClick={() => this.props.updateFilter(null)}
            >
              ALL
            </Button>
            {
                IMPORTANCE.map(importance => (
                  <Button
                    variant="text"
                    key={importance}
                    onClick={() => this.props.updateFilter(importance)}
                  >
                    {importance}
                  </Button>
                ))
              }
          </div>
        </AppBar>
      </header>
    );
  }
}
