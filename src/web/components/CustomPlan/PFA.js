import React, { Component } from 'react'
import PC from './PC'
import PTable from './PTable'
import Buttons from './Buttons'
import FormGeneratorModal from '../general/FormGeneratorModal'
import {loadBox} from '../../../utils/box'
import {clearFormGeneratorModal, } from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'

export default class PFA extends Component {
  render() {
    const {PFAHandler, PFA, PCs, QBs, selectDataPFA, userData,
      addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
      product,
    } = this.props
    const {deletePFA, addEditPFA, addEditPC, deletePC, addEditQB, deleteQB,} = PFAHandler
    console.log('PFA:', PFA);
    const selectDataPC = {priceType:[{name: 'BASE'}, {name: 'DISCOUNT'}, {name: 'SURCHARGE'}, ],
      frequencyMeasure: [{name: 'ONETIME'}, {name: 'RECURRING'}, {name: 'UTILIZATION'}, ],
      valueApplication: [{name: 'FIXED'}, {name: 'PERCENT'}, ],
      recurringPeriod: [{name: 'DAY'}, {name: 'MONTH'}, {name: 'TMONTH'},
      {name: 'SMONTH'}, {name: 'NMONTH'}, {name: 'YEAR'}, ],
      title: [{name: 'BASE'}, {name: 'DISCOUNT'}, {name: 'TAX'}, {name: 'SUPPORT'}, ],
    }
    const editPFAProps = {
      defaultValues: {productfeatureId: PFA.productFeature.id,
      type: PFA.featureType, required: PFA.required, active: PFA.activeNow
      },
      selectData: selectDataPFA,
    }
    const addPCProps = {
      defaultValues: {},
      selectData: selectDataPC,
    }

    const buttonsHandlers = {delete: deletePFA,
      addEdit: addEditPFA, subAddEdit: addEditPC,
    }
    const buttonsProps = {
      deleteLoading: deletePFALoading,
      addEditLoading: addEditPFALoading,
      addEditSubLoading: addEditPCLoading,
      action: 'PFA', subAction: 'PC',
      editProps: editPFAProps, addProps: addPCProps, category: product.category,
      titleName: PFA.productFeature.name,
      title: 'Product Feature Applicability', subTitle: 'Price Component',
      id: PFA.id, parentId: product.id, productId: product.id,
      handlers: buttonsHandlers, userData,
    }
    return (

      <div className="box collapsed-box">
        <div className="box-header with-border bg-PFA">
          <h3 className="box-title box-name-collapse no-content" data-widget="collapse"
            onClick={() => loadBox(this.refs, true)}
            style={{ cursor: 'pointer' }}>Product feature applicability: {PFA.productFeature.name} &nbsp;
          </h3>

          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <PTable tableData={PFA} />
          <Buttons {...buttonsProps} />
          {PCs && PCs.map((item, index) => {
            const PCHandler = {deletePC, addEditPC, deleteQB, addEditQB,}
            const PCProps = {PC: item, QBs: QBs && QBs.filter(QB => QB.priceComponent.id == item.id), key: index,
              selectDataPC,
              addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
              productCategory: product.category, PFAId: PFA.id,
              PCHandler, productId: product.id, userData,
            }
            return <PC {...PCProps} />
          })}
        </div>
      </div>

    )
  }
}
