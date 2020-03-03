import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit, } from '../../../../utils/normalize'
import {getCategoryColor,} from '../../../../utils/color'
import {getPDate} from '../../../../utils/date'
import {baseRoute} from '../../../../utils/route'
import {language, ln, dir} from '../../../../utils/language'

export default class TrProduct extends Component {

  render() {
    const {item, pageNumber, pageSize, index, dispatch, } = this.props
    const product = item
    if (!product) {
      return <tr/>
    }
    const {id, name, category, defaultPlan, uiVisible, active, } = product

    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('thname')}><Link className="en-font" to={`/${baseRoute.master}/plan/${id}`}>{name || '-'}</Link></td>
        <td data-title={ln('thcategory')} className={`text-${getCategoryColor(category)}`}>{category || '-'}</td>
        <td data-title={ln('thdefault')}>{defaultPlan?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thuiVisible')}>{uiVisible?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thactive')}>{active?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
      </tr>
    )
  }
}
