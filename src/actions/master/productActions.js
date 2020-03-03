import {fetch, loadInfo} from '../dynamicAction'
import {defaultExists} from './generalActions'
import {ADMIN} from '../../utils/role'

export const loadProducts = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams) => {
  const {role} = lastParams
  const prefix = role == ADMIN.admincws? '': '/cfs/rest/'
  let endpoint = `${prefix}products?sort=${isAscending?'+':'-'}${sortColumn}`
  /*
  if (role == ADMIN.admincfs) {
    searchParams = [{type: 'category', name: 'CFS'}]
    // endpoint += '&where=[{"category":{"$eq":"CFS"}},{"category":{"$eq":"CFS_BUSINESS"}}]&match=OR'
  }
  if (role == ADMIN.admincws) {
    searchParams = [{type: 'category', name: 'CWS'}]
    // endpoint += '&where=[{"category":{"$eq":"CWS"}},{"category":{"$eq":"CWS_HOST"}}]&match=OR'
  }
  */
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'PRODUCTS')
}

function getPrefix(category) {
  return `/${category && category.toLowerCase().includes('cws')? 'cws': 'cfs'}/rest/`
}

export const loadProduct = (productId, category) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}products/${productId}`, 'PRODUCT'))
    .then(dispatch(fetch(`${getPrefix(category)}productFeatures?sort=+name`, 'PRODUCTFEATURES',)))
    .then(dispatch(fetch(`${getPrefix(category)}productFeatureApplicabilities?where=%7B%22product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+productFeature.name`, 'PFAS')))
    .then(dispatch(fetch(`${getPrefix(category)}priceComponents?where=%7B%22productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+title`, 'PCS')))
    .then(dispatch(fetch(`${getPrefix(category)}quantityBreaks?where=%7B%22priceComponent.productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D`, 'QBS')))
  }
}

export const addEditProduct = (id, secondParam, productId, category1, name, category, priceInfo, jsonInfo, featureInfo, defaultPlan, active, uiVisible) => {
  if (secondParam && typeof(secondParam) != "number" && defaultPlan) {
    const defaultProducts = secondParam
    // if (defaultProducts.filter(item => item.category == category).length) {
    //   return defaultExists(category, defaultProducts.filter(item => item.category == category)[0].name)
    // }
  }
  priceInfo = Number(priceInfo) / 10000
  const body = {id, name, category, priceInfo, jsonInfo, featureInfo, defaultPlan, active, uiVisible, }
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}products/` + (id || ''), 'ADDEDITPRODUCT', id? 'PUT': 'POST',
    body, null, id?body:null, ))
    .then(dispatch(fetch(`${getPrefix(category)}productFeatures?sort=+name`, 'PRODUCTFEATURES',)))
    // .then(() => dispatch(fetch('products/'+ id, )))
  }
}

export const deleteProduct = (id, productId, category) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}products/` + id, 'DELETEPRODUCT', 'DELETE',))
  }
}

export function loadProductFeatures(category) {
  return (dispatch, getState) => {
    // return dispatch(fetch('productFeatures?sort=+name', 'PRODUCTFEATURES',))
    dispatch(fetch(`${getPrefix(category)}productFeatures?sort=+name`, 'PRODUCTFEATURES',))
  }
}

export const addProductFeature = (category, name) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}productFeatures`, 'ADDPRODUCTFEATURE', 'POST', {name},  ))
    .then(() => dispatch(fetch(`${getPrefix(category)}productFeatures?sort=+name`, 'PRODUCTFEATURES',)))
  }
}

export const deleteProductFeature = (id, category) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}productFeatures/${id}`, 'DELETEPRODUCTFEATURE', 'DELETE', null, id, id, ))
    // .then(() => dispatch(fetch('productFeatures?sort=+name', 'PRODUCTFEATURES',)))
  }
}

// export function loadPFAs(productId) {
//   return (dispatch, getState) => {
//     return dispatch(fetch(`/cfs/rest/productFeatureApplicabilities?where={%22product.id%22:{%22$eq%22:%22${productId}%22}}&sort=+productFeature.name`), 'PFA')
//   }
// }

export const addEditPFA = (id, productId, productId2, category, productfeatureId, featureType, required, activeNow,) => {
  const body = {id, product:{id:Number(productId)}, productFeature:{id: Number(productfeatureId)}, featureType, required, activeNow, }
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}productFeatureApplicabilities/` + (id || ''), 'ADDEDITPFA', id? 'PUT': 'POST',
    body, id, id?body:null, ))
    .then(dispatch(fetch(`${getPrefix(category)}productFeatureApplicabilities?where=%7B%22product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+productFeature.name`, 'PFAS')))
  }
}

export const deletePFA = (id, productId, category,) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}productFeatureApplicabilities/${id}`, 'DELETEPFA', 'DELETE', null, id, id))
    .then(dispatch(fetch(`${getPrefix(category)}productFeatureApplicabilities?where=%7B%22product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+productFeature.name`, 'PFAS')))
  }
}

export const addEditPC = (id, PFAId, productId, category, componentOrder, from, to, priceType, frequencyMeasure, valueApplication, recurringPeriod, title,) => {
  const body = {id, productFeatureApplicability:{id:Number(PFAId)}, componentOrder, from, to, priceType, frequencyMeasure, valueApplication, recurringPeriod, title,}
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}priceComponents/` + (id || ''), 'ADDEDITPC', id? 'PUT': 'POST',
    body, {PFAId, id}, id?body:null, ))
    .then(dispatch(fetch(`${getPrefix(category)}priceComponents?where=%7B%22productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+title`, 'PCS')))
  }
}

export const deletePC = (id, productId, category) => {
  return (dispatch, getState) => {
    return dispatch(fetch('priceComponents/' + id, 'DELETEPC', 'DELETE', null, id, id))
    .then(dispatch(fetch(`${getPrefix(category)}priceComponents?where=%7B%22productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D&sort=+title`, 'PCS')))
  }
}

export const addEditQB = (id, PCId, productId, category, calculationType, lowerBound, upperBound, value, value2,) => {
  value = Number(value) / 10000
  value2 = Number(value2) / 10000
  const body = {id, priceComponent:{id:Number(PCId)}, measureUnit:{id: 1}, calculationType, lowerBound, upperBound, value, value2, }
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}quantityBreaks/` + (id || ''), 'ADDEDITQB', id? 'PUT': 'POST',
      body, {PCId, id}, id?body:null, ))
    .then(dispatch(fetch(`${getPrefix(category)}quantityBreaks?where=%7B%22priceComponent.productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D`, 'QBS')))
  }
}

export const deleteQB = (id, productId, category) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}quantityBreaks/${id}`, 'DELETEQB', 'DELETE', null, id, id))
    .then(dispatch(fetch(`${getPrefix(category)}quantityBreaks?where=%7B%22priceComponent.productFeatureApplicability.product.id%22:%7B%22$eq%22:%22${productId}%22%7D%7D`, 'QBS')))
  }
}

export const loadDefaultProducts = (category) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`${getPrefix(category)}products?where=%7B"defaultPlan":%7B"$eq":true%7D%7D`, 'DEFAULTPRODUCTS'))
  }
}
