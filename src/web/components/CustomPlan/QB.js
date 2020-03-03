import React, { Component } from 'react'
import PTable from './PTable'
import Buttons from './Buttons'
import FormGeneratorModal from '../general/FormGeneratorModal'
import { getNormalizedObject,} from '../../../utils/normalize'
import { loadBox, } from '../../../utils/box'
import {getDate, } from '../../../utils/date'
import {clearFormGeneratorModal, } from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'

export default class QB extends Component {
  render() {
    const {QB, selectDataQB, QBHandler, productCategory, PCId,
      deleteQBLoading, addEditQBLoading, productId, userData,
    } = this.props
    const {deleteQB, addEditQB,} = QBHandler
    const editQBProps = {
      defaultValues: {...getNormalizedObject(QB), value: QB.value * 10000, value2: QB.value2 * 10000, },
      selectData: selectDataQB,
    }
    const buttonsHandlers = {delete: deleteQB,
      addEdit: addEditQB,
    }
    const buttonsProps = {
      deleteLoading: deleteQBLoading,
      addEditLoading: addEditQBLoading,
      action: 'QB', productId,
      editProps: editQBProps, category: productCategory,
      titleName: QB.calculationType,
      title: 'Quantity Break',
      id: QB.id, parentId: PCId, userData,
      handlers: buttonsHandlers}
    return (

      <div className="box collapsed-box">
        <div className="box-header with-border">
          <h3 className="box-title box-name-collapse no-content" data-widget="collapse"
            onClick={() => loadBox(this.refs, true)}
            style={{ cursor: 'pointer' }}>Quantity break: {QB.calculationType} &nbsp;
          </h3>
          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <PTable tableData={QB} />
          <Buttons {...buttonsProps} />
        </div>
      </div>

    )
  }
}
