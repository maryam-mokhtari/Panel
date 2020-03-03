import React, {Component} from 'react'
import {language, dir, ln} from '../../../utils/language'

export default class Loading extends Component {
  render() {
    const {padding} = this.props
    return (
      <div className="loading" style={{padding: padding + 'px'}}>
        <i className="fa fa-spin fa-circle-o-notch" /> &nbsp;
        {ln('loading')}...
      </div>
    )
  }
}
