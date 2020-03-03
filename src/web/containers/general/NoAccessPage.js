import React, { Component } from 'react'
import {push} from 'react-router-redux'
import { baseRoute } from '../../../utils/route'
import {language, ln, dir} from '../../../utils/language'

export default class NoAccessPage extends Component {
  render() { return <div style={{padding: 50}}>{ln('noaccess')}.</div> }
}
