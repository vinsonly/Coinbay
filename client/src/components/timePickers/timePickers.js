import React, { Component } from 'react';
import 'flatpickr/dist/themes/material_green.css';
import './timePickers.css';
import Flatpickr from 'react-flatpickr';
 
class TimePickers extends React.Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }
  render() {
    const { date } = this.state;
    return (
      <div className="dates-times">
        <Flatpickr data-enable-time
          value={date}
          onChange={date => { this.setState({date}) }} />
      </div>
    )
  }
}

export default TimePickers;
