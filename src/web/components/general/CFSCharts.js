import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import Jalaali from 'jalaali-js'
// import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'
import 'react-datepicker2/dist/react-datepicker2.min.css'
import LineChart from './LineChart'
import {language, ln, dir, swip} from '../../../utils/language'
import {siteConfig} from '../../../utils/siteConfig'
import { isArrayOK } from '../../../utils/array'
import Loading from './Loading'

export default class CFSCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //   toValue: null,
      //   fromValue: null //moment()
    }
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
  isValid(mode, value) {
    this.setState({ [mode + 'Value']: value })
    if (value) {
      this.refs[mode+'Div'].classList.remove('has-error')
      return true
    } else {
      this.refs[mode+'Div'].classList.add('has-error')
      return false
    }
  }
  render() {
    const {title, chartData, chartKey, chartLoading, planId,
      handlers,
    } = this.props
    const isfa = language.key == 'fa'
    const dateLabels = chartData && chartData[chartKey].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(item => isfa? item.pdate: item.created_at
      // {
      // const date = new Date(item.created_at)
      // const dateShown = date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
      // + date.getDate() + ' ' + date.toTimeString().substr(0,5)
      // return dateShown
      // }
  )
    const mainData = chartData && chartData[chartKey].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(item => item.count)
    console.log('mainData', mainData, dateLabels);
    const dataForChartShown = {
      labels: dateLabels,
      datasets: [
        this.getChartData(title, mainData, 151, 187, 205),
      ]
    }
    return (
      <div className="row" style={{marginBottom: 20}}>
        <div className="col-md-4">
          <div className="box-body modal-content">
            <div className="form-group col-md-12 col-sm-12" >
              <label className="col-sm-4 control-label">
                {ln('from')}
              </label>
              <div className="col-sm-8" ref="fromDiv">
                <DatePicker isGregorian={!isfa}
                  //  onChange={fromValue => {console.log('fromValue', fromValue, this.state); this.setState({ fromValue })}}
                  value={this.state.fromValue}
                  className="form-control input-form" id="from" type="date" ref="from"
                  onChange={val => this.isValid('from', val)}
                  />
              </div>
            </div>
            <div className="form-group col-md-12 col-sm-12" >
              <label className="col-sm-4 control-label">
                {ln('to')}
              </label>
              <div className="col-sm-8" ref="toDiv">
                <DatePicker isGregorian={!isfa}
                  value={this.state.toValue}
                  className="form-control input-form" id="to" type="date" ref="to"
                  onChange={val => this.isValid('to', val)}
                  />
              </div>
            </div>
            <div>
              <button type="button" id="submitButton" className={`btn btn-primary`}
                onClick={() => !chartLoading
                  && this.isValid('from', this.state.fromValue) & this.isValid('to', this.state.toValue)
                  && handlers.loadCharts(this.state.fromValue, this.state.toValue, this.props.groupId)
                  // && handlers.loadCharts(this.state.fromValue, this.state.toValue)
                  // && handlers.loadCharts(this.refs.from.state.inputValue, this.refs.to.state.inputValue)
                }
                disabled={chartLoading}>
                {swip('chart', title.toLowerCase()) }
                &nbsp;
                {chartLoading?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className={`fa fa-cloud-${title.toLowerCase()}`} />
                }
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {
            chartLoading?
            <Loading />
            :

            chartLoading == false && chartData &&
            <div className="box">
              <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                <h3 className="box-title title-name" data-widget="collapse" style={{cursor: 'pointer'}}>
                  {ln(title.toLowerCase())}
                </h3>
                <div className={`box-tools pull-${dir('reverseAlign')}`}>
                  <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="box-body" style={{ background: 'white' }}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="chart">
                      {isArrayOK(mainData)?
                        <LineChart data={dataForChartShown}/>
                        :
                        <div className="nochart">{ln('noChartData')}</div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


          }
        </div>
      </div>
    )
  }
}
