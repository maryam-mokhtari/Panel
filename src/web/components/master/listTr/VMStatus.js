import React, { Component } from 'react'
import {language, dir, ln} from '../../../../utils/language'

export default class VMStatus extends Component {
  render() {

    const { from, to, paid } = this.props

    return(
      <div>
        <span className="text-green">{from < Date.now() && Date.now() < to && paid && ln('active')}</span>
        <span className="text-blue">{from < Date.now() && Date.now() < to && !paid && ln('renew')}</span>
        <span className="text-teal">{Date.now() < from && paid && ln('activePrepid')}</span>
        <span className="text-orange">{Date.now() < from && !paid && ln('pendingRenew')}</span>
        <span className="text-red">{to < Date.now() && paid && ln('expired')}</span>
        <span className="text-yellow">{to < Date.now() && !paid && ln('draft')}</span>
      </div>
    )
  }
}
