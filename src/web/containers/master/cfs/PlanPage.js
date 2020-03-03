import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {
  addEditProduct, deleteProduct, loadProductFeatures, addProductFeature, deleteProductFeature,
  loadPFAs, loadProduct, loadCurrentUser,
  addEditPFA, deletePFA, addEditPC, deletePC, addEditQB, deleteQB,
  loadDefaultProducts,
} from '../../../../actions'
import FormGeneratorModal from '../../../components/general/FormGeneratorModal'
import Product from '../../../components/CustomPlan/Product'
import Loading from '../../../components/general/Loading'
import { siteConfig } from '../../../../utils/siteConfig'
import {clearFormGeneratorModal, }  from '../../../../utils/form'
import {isUserInRole, getUserRole, ADMIN}  from '../../../../utils/role'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'

const category = 'cfs'
class PlanPage extends Component {
  componentDidMount() {
    this.loadData()
    //this.props.loadProductFeatures()
  }
  async loadData() {
    await this.props.loadCurrentUser()
    category = getUserRole(this.props.userData) == ADMIN.admincws? 'cws': 'cfs'
    this.props.loadDefaultProducts(category)
    this.loadProduct()
  }
  async loadProduct() {
    console.log('category>', category);
    if (this.props.productId) {
      this.props.loadProduct(this.props.productId, category)
    }
  }
  render() {
    const {
      addEditProductLoading, product,
      deleteProductLoading,
      productfeatures, productfeaturesLoading,
      addProductFeatureLoading,
      deleteProductFeatureLoading,
      PFAs, PFAsLoading, productLoading,
      PCs, PCsLoading,
      QBs, QBsLoading,
      addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
      addEditProduct, deleteProduct, addProductFeature, deleteProductFeature,
      addEditPFA, deletePFA, addEditPC, deletePC, addEditQB, deleteQB,
      userData, productId,
      defaultProducts,
    } = this.props
    // const product =
    // {
    //   active: false,
    //   category: "CWS",
    //   defaultPlan: false,
    //   featureInfo: "",
    //   id: 1051526160,
    //   jsonInfo: "66",
    //   name: "66",
    //   priceInfo: 0,
    //   uiVisible: false,
    // }
    //     const defaultProducts = [
    //   {
    //     "active": true,
    //     "category": "CFS",
    //     "defaultPlan": true,
    //     "featureInfo": "{\"نمایش تبلیغات\": true,\"۵۰۰ مگابایت سقف آپلود هر فایل\": true,\"۵۰ مگابایت سقف آپلود از URL\": true,\"لینک مستقیم: عکس، swf, js, html, css\":true}",
    //     "id": 3,
    //     "jsonInfo": "{\"quota\": 8589934592,\"maximumSize\": 524288000,\"urlMaximumSize\": 20971520,\"bandwidth\": 21474836480,\"faname\": \"رایگان\",\"plan_type\": \"MONTH\"}",
    //     "name": "FREE",
    //     "priceInfo": 0,
    //     "uiVisible": true
    //   },
    //   {
    //     "active": true,
    //     "category": "CWS",
    //     "defaultPlan": true,
    //     "featureInfo": "{}",
    //     "id": 20000,
    //     "jsonInfo": "{\"plan_type\":\"DAY\"}",
    //     "name": "HPC",
    //     "priceInfo": 0,
    //     "uiVisible": true
    //   }
    // ]
    let selectDataProduct = {category: []}
    if (isUserInRole(ADMIN.admincfs, userData)) {
      console.log('cfs user')
      selectDataProduct.category = [...selectDataProduct.category, {name: 'CFS'}, {name: 'CFS_BUSINESS'},]// {name: 'HOST'}, {name: 'DOMAIN'},]
    }
    if (isUserInRole(ADMIN.admincws, userData)) {
      console.log('cws user')
      selectDataProduct.category = [...selectDataProduct.category, {name: 'CWS'}, {name: 'CWS_HOST'},]
    }
    const addPlanProps = {
      defaultValues: {active: true,},
      selectData: selectDataProduct,
    }
    console.log('product>', product, );
    console.log('plan props', this.props, this.state)

    const productProps = {
      product, selectDataProduct,
      addEditProductLoading,
      deleteProductLoading,
      productfeatures, productfeaturesLoading,
      addProductFeatureLoading,
      deleteProductFeatureLoading,
      addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
      PFAs, PFAsLoading,
      PCs, PCsLoading,
      QBs, QBsLoading,
      handlers: {addEditProduct, deleteProduct, addProductFeature, deleteProductFeature, loadPFAs,
        addEditPFA, deletePFA, addEditPC, deletePC, addEditQB, deleteQB,
      },
      defaultProducts,
      userData,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('customPlan')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/plans`}>{ln('plans')}</Link></li>
            <li className="active">{ln('customPlan')}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box en-font">
                <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                  <h3 className="box-title title-name en-font" data-widget="collapse" style={{cursor: 'pointer'}}>{ln('product')}
                    {product && `: ${product.name}`}
                  </h3>

                  <div className={`box-tools pull-${dir('reverseAlign')}`}>
                    <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                {product?
                  <Product {...productProps}/>
                  :
                  productLoading || (productId && deleteProductLoading == null)?
                  <Loading />
                  :
                  isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
                    <div className="box-body">
                      <button type="button" className="btn  btn-primary"
                        data-toggle="modal" data-target={!addEditProductLoading && '.addProduct'}
                        // onClick={()=> clearFormGeneratorModal()}
                        disabled={addEditProductLoading}>
                        {ln('addNewProduct')}
                        &nbsp;
                        {addEditProductLoading?
                          <i className="fa fa-spin fa-circle-o-notch"></i>
                          :
                          <i className="fa fa-plus-circle"></i>
                        }
                      </button>

                    </div>

                }
                <FormGeneratorModal buttonText='modalTitleAddVM' iconName="plus" formId="addProduct" innerForm="addEditProduct"
                  submitAction={addEditProduct} params={[null, defaultProducts, null, category]}
                  {...addPlanProps}
                  />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    addEditProductLoading, product,
    deleteProductLoading,
    productfeatures, productfeaturesLoading,
    addProductFeatureLoading,
    deleteProductFeatureLoading,
    addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
    PFAs, PFAsLoading,
    PCs, PCsLoading,
    QBs, QBsLoading,
    productLoading,
    defaultProducts,
  } = state.masterEntities
  const {userData, userDataLoading} = state.generalEntities
  const {productId} = ownProps.params
  return {
    addEditProductLoading, product,
    deleteProductLoading,
    productfeatures, productfeaturesLoading,
    addProductFeatureLoading,
    deleteProductFeatureLoading,
    addEditPFALoading, deletePFALoading, addEditPCLoading, deletePCLoading, addEditQBLoading, deleteQBLoading,
    PFAs, PFAsLoading,
    PCs, PCsLoading,
    QBs, QBsLoading,
    productLoading,
    productId,
    userData,
    defaultProducts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    addEditProduct, deleteProduct, loadProductFeatures, addProductFeature, deleteProductFeature,
    loadPFAs, loadProduct, loadCurrentUser,
    addEditPFA, deletePFA, addEditPC, deletePC, addEditQB, deleteQB,
    loadDefaultProducts,
  }, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(PlanPage)
