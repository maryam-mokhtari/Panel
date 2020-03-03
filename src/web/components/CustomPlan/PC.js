import React, { Component } from 'react'
import PTable from './PTable'
import Buttons from './Buttons'
import QB from './QB'
import FormGeneratorModal from '../general/FormGeneratorModal'
import {loadBox,} from '../../../utils/box'
import {getNormalizedObject,} from '../../../utils/normalize'
import {getDate, } from '../../../utils/date'
import {clearFormGeneratorModal, } from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'

export default class PC extends Component {
  render() {
    const {PC, QBs,
      selectDataPC,
      addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
      productCategory, PFAId,
      PCHandler, productId, userData,
    } = this.props
    const {deletePC, addEditPC, addEditQB, deleteQB, } = PCHandler
    console.log('PC:', PC);
    const selectDataQB = {
      calculationType: [{name: 'FIXED',}, {name: 'LINEAR'}]
    }
    const editPCProps = {
      defaultValues: {...getNormalizedObject(PC), from: getDate(PC.from), to: getDate(PC.to)},
      selectData: selectDataPC,
    }
    const addQBProps = {
      defaultValues: {lowerBound: 0, upperBound: 99999999999999},
      selectData: selectDataQB,
    }

    const buttonsHandlers = {delete: deletePC,
      addEdit: addEditPC, subAddEdit: addEditQB,
    }
    const buttonsProps = {
      deleteLoading: deletePCLoading,
      addEditLoading: addEditPCLoading,
      addEditSubLoading: addEditQBLoading,
      action: 'PC', subAction: 'QB',
      editProps: editPCProps, addProps: addQBProps, category: productCategory,
      titleName: PC.title, productId,
      title: 'Price Component', subTitle: 'Quantity Break',
      id: PC.id, parentId: PFAId,
      handlers: buttonsHandlers, userData,
    }
    return (

      <div className="box collapsed-box">
        <div className="box-header with-border bg-PC">
          <h3 className="box-title box-name-collapse no-content" data-widget="collapse"
            onClick={() => loadBox(this.refs, true)}
            style={{ cursor: 'pointer' }}>Price component: {PC.title} &nbsp;
          </h3>

          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <PTable tableData={PC} />
          <Buttons {...buttonsProps} />
          {QBs && QBs.map((item, index) => {
            const QBHandler = {deleteQB, addEditQB,}
            const QBProps = {QB: item, key: index,
              selectDataQB, QBHandler, productCategory, PCId: PC.id,
              deleteQBLoading, addEditQBLoading, productId, userData,
            }
            return <QB {...QBProps} />
          })}
        </div>
      </div>

    )
  }
}
