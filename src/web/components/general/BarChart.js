import React, { Component } from 'react'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'

export default class BarChart extends Component {
  render() {
    const options = {
      responsive: true,
      // animation: false
    }
    const animation = {
      animateScale: true,
      duration: 0,
    }

    return <Bar
            {...this.props}
            options={options}
            height="85"
            />
  }
}
