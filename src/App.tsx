import React from 'react';
import './App.scss';
import { Clock } from './component/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clock: string;
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  state = {
    clock: new Date().toUTCString().slice(-12, -4),
    hasClock: true,
    clockName: 'Clock-0',
  };

  timerId = 0;

  timerIdClock = 0;

  handleRemoveClock = (event: MouseEvent) => {
    event.preventDefault();
    if (event.button === 2) {
      this.setState({ hasClock: false });
    }
  };

  handleAddClock = (event: MouseEvent) => {
    event.preventDefault();
    if (event.button === 0) {
      this.setState({ hasClock: true });
    }
  };

  componentDidMount(): void {
    // Ensure the clock shows actual time immediately when it first mounts
    const updatedTime = new Date().toUTCString().slice(-12, -4);

    this.setState({ clock: updatedTime });

    // Update clock every second
    this.timerId = window.setInterval(() => {
      if (this.state.hasClock) {
        const updatedTimeNew = new Date().toUTCString().slice(-12, -4);

        this.setState({ clock: updatedTimeNew });
        // eslint-disable-next-line no-console
        console.log(updatedTimeNew); // Will print updated time every second
      }
    }, 1000);

    // Update clock name every 3.3 seconds
    this.timerIdClock = window.setInterval(() => {
      if (this.state.hasClock) {
        const newClockName = getRandomName();

        this.setState({ clockName: newClockName });
      }
    }, 3300);

    document.addEventListener('click', this.handleAddClock);
    document.addEventListener('contextmenu', this.handleRemoveClock);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
    window.clearInterval(this.timerIdClock);

    document.removeEventListener('contextmenu', this.handleAddClock);
    document.removeEventListener('click', this.handleRemoveClock);
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    // Log if clockName has changed and if clock is visible
    if (prevState.clockName !== this.state.clockName && this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  render() {
    const { clock, hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock clockName={clockName} clock={clock} />}
      </div>
    );
  }
}
