import React, { Component } from 'react'
import {getDate, } from '../../../utils/date'
import {getNormalizedDigit, } from '../../../utils/normalize'
import {clearFormGeneratorModal} from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'

export default class PTable extends Component {
  render() {
    const {tableData} = this.props
    console.log('tableData:', tableData);
    return (
      <table className="table table-bordered" style={{marginBottom: 20}}>
        <tbody>
          {Object.keys(tableData).map((key, index) => typeof(tableData[key]) != 'object' &&
            key != 'id' &&
            <tr key={index}>
              <td>{key}</td>
              <td>
                {
                  ['priceInfo', 'value', 'value2'].includes(key)? getNormalizedDigit(tableData[key], true) + '  IRR'
                  :
                  key == 'from' || key == 'to'? getDate(tableData[key])
                  :
                  typeof(tableData[key]) == 'boolean'?
                  <i className={`fa fa-${tableData[key]?'check':'times'}
                    text-${tableData[key]?'green':'red'}`} />:tableData[key]
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
