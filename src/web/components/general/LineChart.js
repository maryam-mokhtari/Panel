import React, { Component } from 'react'
import Chart from 'chart.js'
import { Line } from 'react-chartjs'

export default class LineChart extends Component {
  render() {
    const options = {
      responsive: true,
      // animation: false
    }
    const animation = {
      animateScale: true,
      duration: 0,
    }
    return <Line
            {...this.props}
            options={options}
            height="85"
            />
  }
}
