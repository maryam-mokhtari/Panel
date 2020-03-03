import React, { Component } from 'react'
import {clearFormGeneratorModal} from '../../../utils/form'
import FormGeneratorModal from '../general/FormGeneratorModal'
import Loading from '../general/Loading'
import { language, ln, dir } from '../../../utils/language'

export default class Product extends Component {
  render() {
    const {productfeaturesLoading, productfeatures, handlers, category,
      addProductFeatureLoading, addProductFeature, deleteProductFeatureLoading,
    } = this.props
    return (
      <div className="box-body">
        {
          productfeaturesLoading?
          <Loading />
          :
          productfeatures && productfeatures.map((item, index) =>
          <div className="col-md-2 col-sm-4 col-xs-6 feature" key={index}>
            {item.name}
            <a role="button"
              data-toggle="modal" data-target={!deleteProductFeatureLoading && `.deleteProductFeature${item.id}`}
              >

              {deleteProductFeatureLoading == item.id?
                <i className={`fa fa-spin fa-circle-o-notch pull-${dir('reverseAlign')}`} style={{padding: 3}} />
                :
                <i className={`fa fa-times-circle text-red pull-${dir('reverseAlign')}`} style={{padding: 3}} />
              }
            </a>

            <FormGeneratorModal buttonText='modalTitleDeleteProductFeature'
              iconName="times" innerForm={`deleteProductFeature${item.id}`}
              innerText={`${ln('sureToDeleteProducFeature')} ${item.name}${ln('questionMark')}`}
              submitAction={handlers.deleteProductFeature} params={[item.id, category]}
              />
          </div>
        )}
        <div className="col-md-2 col-sm-4 col-xs-6 btn-primary feature"
          data-toggle="modal" data-target={!addProductFeatureLoading && '.addProductFeature'}
          style={{cursor: 'pointer'}}
          onClick={()=> clearFormGeneratorModal()}
          disabled={addProductFeatureLoading}>
          {ln('add')} product feature
          &nbsp;
          {addProductFeatureLoading?
            <i className="fa fa-spin fa-circle-o-notch"></i>
            :
            <i className="fa fa-plus-circle"></i>
          }

        </div>
        <FormGeneratorModal buttonText='modalTitleAddProductFeature' iconName="plus" innerForm="addProductFeature"
          submitAction={handlers.addProductFeature} params={[category]}
          />
      </div>
    )
  }
}
