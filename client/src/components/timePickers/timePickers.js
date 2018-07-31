import React, { Component } from 'react';
import 'flatpickr/dist/themes/material_green.css';
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
      <Flatpickr data-enable-time
        value={date}
        onChange={date => { this.setState({date}) }} />
    )
  }
}

export default TimePickers;
