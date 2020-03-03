import React, { Component } from 'react'
import {language, ln, dir, swip, } from '../../../utils/language'

export default class UserInfo extends Component {
  render() {
    let {label, text, textClass, condition, } = this.props
    if (condition == null) condition = text != null && text != '' && text != 0
    if (condition) {
      return (
        <div className="col-md-6 col-sm-12 col-xs-12 trim">
          <label className="col-xs-4 trim-side">{ln(label)}: </label>
          <div className={`col-xs-8 trim-${dir('reverseAlign')} space-${dir('align')} ${textClass}`}>
            {ln(text)}
          </div>
        </div>
      )
    }
    return <div/>
  }
}
