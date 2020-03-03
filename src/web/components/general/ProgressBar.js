import React, { Component } from 'react'
import {getNormedBytes, } from '../../../utils/normalize'
import {percentColor, } from '../../../utils/color'
import { language, ln, dir } from '../../../utils/language'
import {siteConfig} from '../../../utils/siteConfig'

export default class ProgressBar extends Component {
  showPercent(num) {
    num *= 100
    divider = num < 1? 100: 10
    return Math.round(num * divider) / divider
  }
  render() {
    const {usedQuota, baseQuota} = this.props
    return (
      <span>
        <span className="progress-number">{getNormedBytes(usedQuota)}/{getNormedBytes(baseQuota)}</span>
        <div style={{minWidth: 120}}>
          <div className={`text-${siteConfig[siteConfig.key].baseColor} pull-${dir('reverseAlign')}`} style={{margin: '-5px 5px 0px 5px', width: 30}} >
            {this.showPercent(usedQuota / baseQuota)}%
          </div>
          <div className="progress sm">
            <div className={`progress-bar progress-bar-${percentColor(usedQuota, baseQuota)}`}
              style={{ width: Math.round((usedQuota / baseQuota) * 100) + '%' }}></div>
          </div>
        </div>
      </span>
    )
  }
}
