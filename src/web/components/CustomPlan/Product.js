import React, { Component } from 'react'
// import Link from 'react-router/lib/Link'
import {getNormalizedDigit, } from '../../../utils/normalize'
import {clearFormGeneratorModal} from '../../../utils/form'
import FormGeneratorModal from '../general/FormGeneratorModal'
import Loading from '../general/Loading'
import ProductFeatures from './ProductFeatures'
import PFA from './PFA'
import PTable from './PTable'
import Buttons from './Buttons'
import { isUserInRole, getUserRole, ADMIN, } from '../../../utils/role'
import { language, ln, dir } from '../../../utils/language'

export default class Product extends Component {
  render() {
    const { product, deleteProductLoading, addEditProductLoading,
      selectDataProduct,
      addProductFeatureLoading,
      productfeatures, productfeaturesLoading,
      deleteProductFeatureLoading,
      PFAs, PFAsLoading,
      PCs, PCsLoading,
      QBs, QBsLoading,
      addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
      handlers,
      defaultProducts, userData,
    } = this.props
    const  {deletePFA, addEditPFA, addEditPC, deletePC, addEditQB, deleteQB,} = handlers

    const productFeaturesProps = {productfeaturesLoading, productfeatures, handlers,
      addProductFeatureLoading, deleteProductFeatureLoading, userData,
    }
    const selectDataPFA = {
      type: [{name: 'REQUIRED',}, {name: 'OPTIONAL'}, ],
      productfeatureId: productfeatures && productfeatures.map(item => ({name: item.name, value: item.id}))
    }

    const editProductProps = {
      defaultValues: {...product, priceInfo: product.priceInfo * 10000},
      selectData: selectDataProduct,
    }
    const addPFAProps = {
      defaultValues: {active: true, required: true, },
      selectData: selectDataPFA,
    }

    const buttonsHandlers = {delete: handlers.deleteProduct,
      addEdit: handlers.addEditProduct, subAddEdit: handlers.addEditPFA,
    }
    const buttonsProps = {
      deleteLoading: deleteProductLoading,
      addEditLoading: addEditProductLoading,
      addEditSubLoading: addEditPFALoading,
      action: 'Product', subAction: 'PFA',
      editProps: editProductProps, addProps: addPFAProps, category: product.category,
      titleName: product.name,
      title: 'Product', subTitle: 'ProductFeatureApplicability', id: product.id,
      handlers: buttonsHandlers,
      defaultProducts, userData,
    }
    console.log('PFAs:', PFAs)
    return (
      <div className="box-body">
        <div className="row">
          <div className="col-md-9">
            <PTable tableData={product} />
          </div>
          <div className="col-md-3 tree-show">
            {PFAsLoading || PCsLoading || QBsLoading?
              <Loading />
              :
              <ul>
                <li> {product.name} </li>
                <ul>
                  {PFAs && PFAs.map((pfa, i) => (
                    <li key={i}>
                      {pfa.productFeature.name}
                      <ul>
                        {PCs && PCs.filter(item => item.productFeatureApplicability. id == pfa.id).map((pc, j) => (
                          <li key={j}>
                            {pc.title}
                            <ul>
                              {QBs && QBs.filter(item => item.priceComponent.id == pc.id).map((qb, k) => (
                                <li key={k}>
                                  {qb.calculationType}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </ul>
            }
          </div>

        </div>
        <Buttons {...buttonsProps} />
        {isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
          <ProductFeatures {...productFeaturesProps} />
        }
        {
          // PFAsLoading?
          // <div className="col-md-2 col-sm-4 col-xs-6 loading">
          //   <i className="fa fa-spin fa-circle-o-notch" /> &nbsp;
          //   Loading ... &nbsp;
          // </div>
          // :
          PFAs && PFAs.map((item, index) => {
            // const PFAHandler = {loadPFAs: handlers.loadPFAs}
            const PFAHandler = {deletePFA, addEditPFA, addEditPC, deletePC, addEditQB, deleteQB,}
            const PFAProps = {PFA: item, PCs: PCs &&
              PCs.filter(PC => PC.productFeatureApplicability.id == item.id), QBs, key: index,
              addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
              selectDataPFA, PFAHandler, product, userData,
            }
            return <PFA {...PFAProps}  />
          })
        }



      </div>
    )

  }
}
