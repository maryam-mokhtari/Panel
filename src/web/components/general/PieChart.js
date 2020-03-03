import React, { Component } from 'react'
import Chart from 'chart.js'
import { Pie } from 'react-chartjs'

export default class PieChart extends Component {
  render() {
    const options = {
      responsive: true,
      // animation: false
    }
    const animation = {
      animateScale: true,
      duration: 0,
    }

    return <Pie
            {...this.props}
            options={options}
            height="85"
            />
  }
}
