import React, { Component } from 'react'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs'

export default class DoughnutChart extends Component {
  render() {
    const options = {
      responsive: true,
      // animation: false
    }
    const animation = {
      animateScale: true,
      duration: 0,
    }
    
    const data = {
      datasets: [{
        data: [10, 20]
      }],
      labels: [
        'Red',
        'Yellow'
      ]
    }

    return <Doughnut
            {...this.props}
            options={options}
            height="80"
            />
  }
}
