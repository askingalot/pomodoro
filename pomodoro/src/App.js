import React, { Component } from 'react';
import './App.css';

class Clock {
  constructor(onTick, startingTime = 25 * 60) {
    this.startingTime = startingTime;
    this.timeInSeconds = 0;
    this._onTick = onTick;
  }
  start() {
    this.timeInSeconds = this.startingTime;

    this._intervalToken = setInterval(() => {
      this.timeInSeconds--;

      this._onTick(this.timeInSeconds);

      if (this.timeInSeconds <= 0) {
        this.stop();
      }
    }, 1000);
  }
  stop() {
    this.timeInSeconds = 0;
    clearInterval(this._intervalToken);
  }
}

function formatTime(timeInSeconds) {
  const min = Math.floor(timeInSeconds / 60);
  const seconds = (`0${Math.floor(timeInSeconds % 60)}`).slice(-2);
  return `${min}:${seconds}`;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.clock = new Clock(
      timeInSeconds => 
        this.setState({ 
          timeRemaining: formatTime(timeInSeconds)}),
      12
    );

    this.state = {
      timeRemaining: ''
    }
  }

  render() {
    const { timeRemaining } = this.state;
    return (
      <div id="page">
        <nav id="nav">
        </nav>
        <div id="content">
          <header>
            Writing an Article
          </header>
          <div id="main">
            <div id="clock">
              { timeRemaining }
            </div>
            <div id="actions">
              <button onClick={() => this.clock.start()}
                      id="start-button" className="primary">
                Start
              </button>
              <button id="stop-button">Stop</button>
              <button id="pause-button">Pause</button>
              <button id="reset-button">Reset</button>
            </div>
          </div>
          <footer>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
