import {fetch} from '../dynamicAction'


export const loadPlanGroup = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/planGroups', 'B_PLANGROUP'))
  }
}

export const loadPlans = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/products/user/products?category=CFS', 'B_PLANS'))
  }
}

export const buyPlan = (groupName, adminUserId, planId) => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/planGroups', 'B_BUYPLAN', 'POST', {
        groupName,
        // memberCount,
        adminUser: {id: adminUserId},
        plan:{id: planId},
      },
      planId,
    ))
    .then(()=>dispatch(fetch(`/cfs/rest/invoices?where=%5B%7B"product.category":%7B"$eq":"CFS"%7D%7D,%7B"dueDate":%7B"$gt":${new Date().getTime()}%7D,"paid":%7B"$eq":true%7D%7D%5D&match=AND&matchInner=OR&sort=+paid,-createdAt`, 'B_INVOICES')))
  }
}

export const upgradePlan = (adminUserId, planId) => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/planGroups/upgrade', 'B_UPGRADEPLAN', 'PUT', {
        // memberCount,
        adminUser: {id: adminUserId},
        plan:{id: planId},
      },
      planId,
    ))
    .then(()=>dispatch(fetch(`/cfs/rest/invoices?where=%5B%7B"product.category":%7B"$eq":"CFS"%7D%7D,%7B"dueDate":%7B"$gt":${new Date().getTime()}%7D,"paid":%7B"$eq":true%7D%7D%5D&match=AND&matchInner=OR&sort=+paid,-createdAt`, 'B_INVOICES')))
  }
}
