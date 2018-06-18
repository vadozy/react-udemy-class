import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout/Layout';

class App extends Component {

  state = {
    portfolios: ['10sleeves', 'nimulti', '30sleeves', '50sleeves', '70sleeves', '100sleeves'], // portfolios drop-down values
    portfolio: 'nimulti', // portfolios drop-down currently selected value
    countries: ['East', 'West', 'Some very long contry name'], // countries drop-down values
    country: 'West', // countries drop-down currently selected value

  };

  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
