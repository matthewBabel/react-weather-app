import React, { Component } from 'react';
import './App.css';
import WeatherForcastContainer from './Containers/WeatherForcastContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherForcastContainer />
      </div>
    );
  }
}

export default App;