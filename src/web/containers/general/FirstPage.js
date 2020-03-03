import React, { Component } from 'react'
import {push} from 'react-router-redux'
import { baseRoute } from '../../../utils/route'

export default class FirstPage extends Component {
  componentDidMount() {
    dispatch(push(baseRoute.active))
  }
  render() { return <div /> }
}
