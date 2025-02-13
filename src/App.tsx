import React from 'react';
import './App.scss';
import { Clock } from './component/Clock';

function getRandomName(): string {
  return `Clock-${Date.now().toString().slice(-4)}`;
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
    if (event.button === 0 && !this.state.hasClock) {
      const updatedTime = new Date().toUTCString().slice(-12, -4);

      this.setState({ hasClock: true, clock: updatedTime }, () => {
        // Перезапускаємо інтервал оновлення часу
        this.timerId = window.setInterval(() => {
          if (this.state.hasClock) {
            const updatedTimeNew = new Date().toUTCString().slice(-12, -4);

            this.setState({ clock: updatedTimeNew });
            // eslint-disable-next-line no-console
            console.log(updatedTimeNew);
          }
        }, 1000);
      });
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
        const oldName = this.state.clockName;
        const newClockName = getRandomName();

        this.setState({ clockName: newClockName }, () => {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${oldName} to ${newClockName}`);
        });
      }
    }, 3300);

    document.addEventListener('click', this.handleAddClock);
    document.addEventListener('contextmenu', this.handleRemoveClock);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
    window.clearInterval(this.timerIdClock);

    document.removeEventListener('click', this.handleAddClock);
    document.removeEventListener('contextmenu', this.handleRemoveClock);
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
