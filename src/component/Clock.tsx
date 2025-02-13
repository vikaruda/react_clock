import React from 'react';

type ClockProps = {
  clockName: string;
  clock: string;
};

export class Clock extends React.Component<ClockProps> {
  render() {
    const { clockName, clock } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>
        {' time is '}
        <span className="Clock__time">{clock}</span>
      </div>
    );
  }
}
