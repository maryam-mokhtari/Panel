import ActionTypes from '../actions/ActionTypes'
import {getCount, getNewStateOnFailure} from '../utils/entities'
import {setCookie} from '../utils/cookie'
import {siteConfig} from '../utils/siteConfig'
import {isArrayOK} from '../utils/array'
import { language, ln, dir } from '../utils/language'

export default function businessEntities(state = { toggledPage: false} , action) {
  let messageText = ''
  let messageType = ''
  let count = null
  let data = null
  // console.log('ActionType:', action.type);
  switch (action.type) {

    case ActionTypes.LOCATION_REQUEST:
      return {...state, locationLoading: true}
    case ActionTypes.LOCATION_SUCCESS:
      return {...state, locations: action.payload, locationLoading: false,}

    case ActionTypes.B_USERS_REQUEST:
      return {...state, usersGroupLoading: true}
    case ActionTypes.B_USERS_SUCCESS:
      return {...state, data: action.payload.data, usersGroupLoading: false,
        count: getCount(action.payload.data, action.payload.range),
      }

    case ActionTypes.B_UPLOADCHART_REQUEST:
      return {...state, uploadChartLoading: true}
    case ActionTypes.B_UPLOADCHART_SUCCESS:
      return {...state, uploadChartData: action.payload, uploadChartLoading: false, }

    case ActionTypes.B_DOWNLOADCHART_REQUEST:
      return {...state, downloadChartLoading: true}
    case ActionTypes.B_DOWNLOADCHART_SUCCESS:
      return {...state, downloadChartData: action.payload, downloadChartLoading: false, }

    case ActionTypes.B_PLANGROUP_REQUEST:
      return {...state, planGroupLoading: true}
    case ActionTypes.B_PLANGROUP_SUCCESS:
      return {...state, planGroupData: action.payload, planGroupLoading: false, }

    case ActionTypes.B_PLANS_REQUEST:
      return {...state, plansLoading: true}
    case ActionTypes.B_PLANS_SUCCESS:
      return {...state, plansData: action.payload, plansLoading: false, }

    case ActionTypes.B_INVOICE_REQUEST:
      return {...state, invoiceLoading: true}
    case ActionTypes.B_INVOICE_SUCCESS:
      return {...state, invoiceData: action.payload, invoiceLoading: false, }

    case ActionTypes.B_PAYIDENTIFIER_REQUEST:
      return {...state, invoiceDetailLoading: true}
    case ActionTypes.B_PAYIDENTIFIER_SUCCESS:
      return {...state, payIdentifier: action.payload.payIdentifier, invoiceDetailLoading: false, }

    case ActionTypes.B_PAYMENTBANK_REQUEST:
      return {...state, invoiceDetailLoading: true}
    case ActionTypes.B_PAYMENTBANK_SUCCESS:
      return {...state, paymentBank: action.payload.bank, invoiceDetailLoading: false, }

    case ActionTypes.B_INVOICES_REQUEST:
      return {...state, billingLoading: true}
    case ActionTypes.B_INVOICES_SUCCESS:
      return {...state, billingData: action.payload, billingLoading: false, }

    case ActionTypes.B_ISADMININGROUP_REQUEST:
      return {...state, }
    case ActionTypes.B_ISADMININGROUP_SUCCESS:
      //console.log('B_ISADMININGROUP_SUCCESS', action.payload, isArrayOK(action.payload))
      return {...state, isAdminInGroup: isArrayOK(action.payload)}

    case ActionTypes.B_USERSCOUNT_REQUEST:
      return {...state, usersCountLoading: true, }
    case ActionTypes.B_USERSCOUNT_SUCCESS:
      return {...state,
        usersCount: Number(getCount(action.payload.data, action.payload.range)),
        usersCountLoading: false,
      }

    case ActionTypes.B_OFFLINEPAYMENT_REQUEST:
      return {...state, offlinePaymentLoading: true}
    case ActionTypes.B_OFFLINEPAYMENT_SUCCESS:
      return {...state,
        //billingData: [action.payload],
        offlinePaymentLoading: false,
        messageType: 'success', messageText: 'sendConfirmRequestSuccess',
        offlinePaymentSuccess: true, 
      }

    case ActionTypes.B_RESEND_REQUEST:
      return {...state, resendLoading: action.meta}
    case ActionTypes.B_RESEND_SUCCESS:
      return {...state, resendLoading: false,
        messageType: 'success',
        messageText: 'sendInvitationEmailSuccess',
      }
    case ActionTypes.B_DELETEUSER_REQUEST:
      return {...state, deleteUserLoading: action.meta}
    case ActionTypes.B_DELETEUSER_SUCCESS:
      return {...state, deleteUserLoading: false,
        messageType: 'success',
        messageText: 'deleteUserSuccess',
      }

    case ActionTypes.B_LOGINASCLIENT_REQUEST:
      return {...state, loginAsClientLoading: action.meta, isLoginAsClientSuccess: false,}
    case ActionTypes.B_LOGINASCLIENT_SUCCESS:
      if (action.payload.clienToken) {
        localStorage.setItem('client_csrf_token', action.payload.clienToken)
        // setCookie('clienToken', action.payload.clienToken, 1)
      }
      return {...state, loginAsClientLoading: false,
        isLoginAsClientSuccess: true,
        messageType: 'success',
        messageText: 'transferToUserAccountSuccess',
      }

    case ActionTypes.B_CHANGEQUOTA_REQUEST:
      return {...state, changeUserQuotaLoading: action.meta}
    case ActionTypes.B_CHANGEQUOTA_SUCCESS:
      return {...state, changeUserQuotaLoading: false,
        messageType: 'success',
        messageText: 'changeUserQuotaSuccess',
      }

    case ActionTypes.B_ACTIVATE_REQUEST:
      return {...state, activateUserLoading: action.meta}
    case ActionTypes.B_ACTIVATE_SUCCESS:
      return {...state, activateUserLoading: false,
        messageType: 'success',
        messageText: 'userEnabledSuccess',
      }

    case ActionTypes.B_DEACTIVATE_REQUEST:
      return {...state, deactivateUserLoading: action.meta}
    case ActionTypes.B_DEACTIVATE_SUCCESS:
      return {...state, deactivateUserLoading: false,
        messageType: 'success',
        messageText: 'userDisableSuccess',
      }

    case ActionTypes.B_ADDADMINTOGROUP_REQUEST:
      return {...state, addAdminLoading: true}
    case ActionTypes.B_ADDADMINTOGROUP_SUCCESS:
      return {...state, addAdminLoading: false, isAdminInGroup: true,
        messageType: 'success',
        messageText: 'addAdminToGroupSuccess',
      }

    case ActionTypes.B_BUYPLAN_REQUEST:
      return {...state, buyPlanLoading: action.meta, isPlanSuccess: false,}
    case ActionTypes.B_BUYPLAN_SUCCESS:
      return {...state, buyPlanLoading: false,
        isPlanSuccess: true,
        //messageType: 'success',
      }

    case ActionTypes.B_UPGRADEPLAN_REQUEST:
      return {...state, buyPlanLoading: action.meta, isPlanSuccess: false,}
    case ActionTypes.B_UPGRADEPLAN_SUCCESS:
      return {...state, buyPlanLoading: false,
        isPlanSuccess: true,
        //messageType: 'success',
      }

    case ActionTypes.B_NEWUSER_REQUEST:
      return { ...state, inviteUserLoading: true, inviteUserSuccess: false, }
    case ActionTypes.B_NEWUSER_SUCCESS:
      return { ...state, inviteUserLoading: false,
        inviteUserSuccess: true,
        messageText: 'sendUsersInvitationSuccess',
        messageType: 'success',
      }

    case ActionTypes.CHANGEPASS_REQUEST:
      return {...state, changePasswordLoading: true}
    case ActionTypes.CHANGEPASS_SUCCESS:
      return {...state, changePasswordLoading: false,
        messageText: 'changePasswordSuccess', messageType: 'success',
      }

    case ActionTypes.B_NEWUSER_FAILURE:
    case ActionTypes.LOCATION_FAILURE:
    case ActionTypes.B_PLANGROUP_FAILURE:
    case ActionTypes.B_UPLOADCHART_FAILURE:
    case ActionTypes.B_DOWNLOADCHART_FAILURE:
    case ActionTypes.B_PLANS_FAILURE:
    case ActionTypes.B_BUYPLAN_FAILURE:
    case ActionTypes.B_UPGRADEPLAN_FAILURE:
    case ActionTypes.B_USERS_FAILURE:
    case ActionTypes.B_RESEND_FAILURE:
    case ActionTypes.B_DELETEUSER_FAILURE:
    case ActionTypes.B_LOGINASCLIENT_FAILURE:
    case ActionTypes.B_CHANGEQUOTA_FAILURE:
    case ActionTypes.B_ACTIVATE_FAILURE:
    case ActionTypes.B_DEACTIVATE_FAILURE:
    case ActionTypes.B_ADDADMINTOGROUP_FAILURE:
    case ActionTypes.B_ISADMININGROUP_FAILURE:
    case ActionTypes.B_USERSCOUNT_FAILURE:
    case ActionTypes.B_INVOICES_FAILURE:
    case ActionTypes.B_OFFLINEPAYMENT_FAILURE:
    case ActionTypes.B_INVOICE_FAILURE:
    case ActionTypes.B_PAYIDENTIFIER_FAILURE:
    case ActionTypes.B_PAYMENTBANK_FAILURE:
    case ActionTypes.CHANGEPASS_FAILURE:
      const {newState, errorMessage, erronousEmails} = getNewStateOnFailure(state, action.payload)

      return {...newState, messageText: errorMessage, messageType: 'error',
        isLoginAsClientSuccess: false,
        locationLoading: false,
        uploadChartLoading: false, downloadChartLoading: false,
        planGroupLoading: false, inviteUserLoading: false,
        plansLoading: false, buyPlanLoading: false,
        usersGroupLoading: false,
        resendLoading: false, deleteUserLoading: false, loginAsClientLoading: false,
        changeUserQuotaLoading: false, activateUserLoading: false, deactivateUserLoading: false,
        addAdminLoading: false, billingLoading: false, offlinePaymentLoading: false,
        invoiceLoading: false, invoiceDetailLoading: false,
        inviteUserSuccess: false,
        changePasswordLoading: false,
        usersCountLoading: false,
        //
        erronousEmails,
      }

    case '@@router/LOCATION_CHANGE':
      return {...state, user: null, data: null, count:null, isPlanSuccess: null,
        isLoginAsClientSuccess: false, billingData: null,
       }
    case 'SHOW_MESSAGE':
      console.log('SHOW_MESSAGE', { ...state, messageText: action.messageText, messageType: action.messageType});
      return { ...state, messageText: action.messageText, messageType: action.messageType}
    case 'MESSAGE_CLEAR':
      return { ...state, messageText: '', }

    case 'DATA_RESERVE':
      return { ...state, reservedData: state.data, reservedCount: state.count}
    case 'DATA_RESET':
      return { ...state, data: state.reservedData, count: state.reservedCount}
    case 'CHANGE_LANG':
      return { ...state, language: action.language}
    case 'TOGGLE_PAGE':
      console.log('reducer TOGGLE_PAGE ', state.toggledPage, !state.toggledPage)
      return { ...state, toggledPage: !state.toggledPage}
      // return { toggledPage: !state.toggledPage }    
    default:
      return state
  }
}
