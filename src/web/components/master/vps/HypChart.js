import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import Jalaali from 'jalaali-js'
import LineChart from '../../general/LineChart'
import Loading from '../../general/Loading'
import { language, ln, dir } from '../../../../utils/language'
import { getPDate } from '../../../../utils/date'

export default class HypChart extends Component {
  componentWillMount() {
    this.setState({'tab': 'CPU'})
  }
  getChartData(label, data, r, g, b) {
    return {
      label,
      data,
      fillColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
      strokeColor: `rgba(${r}, ${g}, ${b}, 1)`,
      pointColor: `rgba(${r}, ${g}, ${b}, 1)`,
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: `rgba(${r}, ${g}, ${b}, 1)`,

      borderWidth: 1
    }
  }
  render() {
    let {hypUsages, hypsUsageLoading, hypId} = this.props
    let hypUsage = hypUsages && hypUsages.filter(item => item.hyp == hypId)
    && hypUsages.filter(item => item.hyp == hypId)[0]
    const r = 151
    const g = 187
    const b = 205

    let cpuData = {}
    let memoryData = {}
    if (hypUsage) {
      const usages = hypUsage.usage.filter(usage => usage.created_at > new Date().getTime() - 2 * 30 * 24 * 60 * 60 * 1000).sort(function (a, b) {
        return a.created_at - b.created_at
      })
      const dateLabels = usages.map(usage => {
        const date = new Date(usage.created_at)
        const dateShown =
        language.key == 'fa'? getPDate(usage.created_at)
        :
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() //+ ' ' + date.toTimeString().substr(0,5)
        return dateShown
      })
      cpuData = {
        labels: dateLabels,
        datasets: [
          this.getChartData('cpu_usage', usages.map(usage => usage.cpu_usage), 151, 187, 205),
        ]
      }
      memoryData = {
        labels: dateLabels,
        datasets: [
          this.getChartData('used_memory', usages.map(usage => usage.used_memory), 182, 192, 120),
        ]
      }
    }

    return (
      <div className="nav-tabs-custom" style={{minHeight: 200}}>
        <ul className="nav nav-tabs">
          <li className={this.state['tab'] == 'CPU'? 'active': ''}><a data-toggle="tab" aria-expanded="true" onClick={() => this.setState({'tab': 'CPU'})}>{ln('cpu')}</a></li>
          <li className={this.state['tab'] == 'Memory' ? 'active' : ''}><a data-toggle="tab" aria-expanded="false" onClick={() => this.setState({ 'tab': 'Memory' })}>{ln('memory')}</a></li>
        </ul>


        {!hypsUsageLoading?
          hypUsages && (
            this.state['tab'] == 'CPU'?
            Object.keys(cpuData).length?
            <LineChart data={cpuData}/>
            :
            <div className="nochart">{ln('noChartData')}</div>
            :
            Object.keys(memoryData).length?
            <LineChart data={memoryData}/>
            :
            <div className="nochart">{ln('noChartData')}</div>
          )
          :
          <Loading />
        }
      </div>
    )
  }
}
