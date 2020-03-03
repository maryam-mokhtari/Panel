import ActionTypes from '../actions/ActionTypes'
import {getCount, getNewStateOnFailure} from '../utils/entities'
import { language, ln, dir } from '../utils/language'

export default masterEntities = (state = {}, action) => {
  let isCwsError = false
  let messageText = ''
  let messageType = ''
  // let serverError = 'A server error occurred. Please try again'
  let count = null
  let data = null
  let sentData = null
  // console.log('ActionType:', action.type);
  switch (action.type) {
    case ActionTypes.VMBILLS_REQUEST:
      return {...state, vmbillsLoading: true,
      }
    case ActionTypes.VMBILLS_SUCCESS:
      return {...state, data: action.payload.data, vmbillsLoading: false,
        count: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USERS_REQUEST:
      return {...state, usersLoading: true, }
    case ActionTypes.USERS_SUCCESS:
      return {...state, data: action.payload.data, usersLoading: false,
        count: getCount(action.payload.data, action.payload.range),
      }

    case ActionTypes.INVOICES_REQUEST:
      return {...state, invoicesLoading: true}
    case ActionTypes.INVOICES_SUCCESS:
      return {...state, data: action.payload.data, invoicesLoading: false,
        count: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.CFSINVOICES_REQUEST:
      return {...state, cfsInvoicesLoading: true,}
    case ActionTypes.CFSINVOICES_SUCCESS:
      return {...state, data: action.payload.data, cfsInvoicesLoading: false,
        count: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USER_REQUEST:
      return {...state, userLoading: true,}
    case ActionTypes.USER_SUCCESS:
      return {...state, userLoading: false, user: action.payload,}

    case ActionTypes.USERORDERS_REQUEST:
      return {...state, userOrdersLoading: true, }
    case ActionTypes.USERORDERS_SUCCESS:
      return {...state, userOrdersData: action.payload.data, userOrdersLoading: false,
        userOrdersCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USERIPHISTORIES_REQUEST:
      return {...state, userIPHistoriesLoading: true, }
    case ActionTypes.USERIPHISTORIES_SUCCESS:
      return {...state, userIPHistoriesData: action.payload.data, userIPHistoriesLoading: false,
        userIPHistoriesCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USERINVOICES_REQUEST:
      return {...state, userInvoicesLoading: true, }
    case ActionTypes.USERINVOICES_SUCCESS:
      // return {...state, userInvoicesLoading: false, userInvoices: action.payload}
      return {...state, userInvoicesData: action.payload.data, userInvoicesLoading: false,
        userInvoicesCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USERVMINVOICES_REQUEST:
      return {...state, userVmInvoicesLoading: true, }
    case ActionTypes.USERVMINVOICES_SUCCESS:
      return {...state, userVmInvoicesData: action.payload.data, userVmInvoicesLoading: false,
        userVmInvoicesCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.USERTRANSACTIONS_REQUEST:
      return {...state, userTransactionLoading: true,}
    case ActionTypes.USERTRANSACTIONS_SUCCESS:
      return {...state, userTransactionsData: action.payload.data, userTransactionLoading: false,
        userTransactionsCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.IPS_REQUEST:
      return {...state, ipsLoading: true}
    case ActionTypes.IPS_SUCCESS:
      return {...state, IPs: action.payload, ipsLoading: false,}

    case ActionTypes.IPHISTORY_REQUEST:
      return {...state, ipHistoryLoading: true,}
    case ActionTypes.IPHISTORY_SUCCESS:
      return {...state, data: action.payload, ipHistoryLoading: false, }

    case ActionTypes.HYPS_REQUEST:
      return {...state, hypsLoading: true}
    case ActionTypes.HYPS_SUCCESS:
      return {...state, hypResources: action.payload, hypsLoading: false, }

    case ActionTypes.ISO_REQUEST:
      return {...state, isoLoading: true}
    case ActionTypes.ISO_SUCCESS:
      return {...state, isos: action.payload, isoLoading: false,}

    case ActionTypes.LOCATION_REQUEST:
      return {...state, locationLoading: true}
    case ActionTypes.LOCATION_SUCCESS:
      return {...state, locations: action.payload, locationLoading: false,}

    case ActionTypes.HYPDETAIL_REQUEST:
      return {...state, hypsDetailsLoading: true}
    case ActionTypes.HYPDETAIL_SUCCESS:
      return {...state, hypDetails: action.payload, hypsDetailsLoading: false, }

    case ActionTypes.VMBILLSINGLE_REQUEST:
      return {...state, vmbillSingleLoading: true}
    case ActionTypes.VMBILLSINGLE_SUCCESS:
      return {...state, vmbillSingle: action.payload, vmbillSingleLoading: false, }

    case ActionTypes.HYPUSAGE_REQUEST:
      return {...state, hypsUsageLoading: true}
    case ActionTypes.HYPUSAGE_SUCCESS:
      return {...state, hypUsages: action.payload, hypsUsageLoading: false,}

    case ActionTypes.GETISOMD5_REQUEST:
      return {...state, isomd5Loading: true}
    case ActionTypes.GETISOMD5_SUCCESS:
      return {...state, md5Info: action.payload, isomd5Loading: false,}

    case ActionTypes.LISTBACKUP_REQUEST:
      return {...state, backupLoading: true}
    case ActionTypes.LISTBACKUP_SUCCESS:
      return {...state, backups: action.payload, backupLoading: false,}

    case ActionTypes.VMINVOICES_REQUEST:
      return {...state, vmInvoicesLoading: true,}
    case ActionTypes.VMINVOICES_SUCCESS:
      return {...state, vmInvoicesLoading: false, vmInvoices: action.payload,
    }

    case ActionTypes.OS_REQUEST:
      return {...state, osLoading: true,}
    case ActionTypes.OS_SUCCESS:
      return {...state, OSs: action.payload, osLoading: false,}

    case ActionTypes.DUMPXML_REQUEST:
      return {...state, xmlLoading: true}
    case ActionTypes.DUMPXML_SUCCESS:
      return {...state, dumpxmlData: action.payload, xmlLoading: false, }

    case ActionTypes.CFSINVOICE_REQUEST:
      return {...state, cfsInvoiceLoading: true}
    case ActionTypes.CFSINVOICE_SUCCESS:
      return {...state, invoiceData: action.payload, cfsInvoiceLoading: false, }

    case ActionTypes.CFSREJECTINVOICEPAY_REQUEST:
      return { ...state, rejectInvoicePaymentLoading: action.meta }
    case ActionTypes.CFSREJECTINVOICEPAY_SUCCESS:
      return { ...state, invoiceData: [action.payload], rejectInvoicePaymentLoading: false,
        messageText: 'productInvoiceRejection', messageType: 'success',
    }
    case ActionTypes.UPLOADCHART_REQUEST:
      return {...state, uploadChartLoading: true}
    case ActionTypes.UPLOADCHART_SUCCESS:
      return {...state, uploadChartData: action.payload, uploadChartLoading: false, }

    case ActionTypes.DOWNLOADCHART_REQUEST:
      return {...state, downloadChartLoading: true}
    case ActionTypes.DOWNLOADCHART_SUCCESS:
      return {...state, downloadChartData: action.payload, downloadChartLoading: false, }

    case ActionTypes.GROUP_REQUEST:
      return {...state, groupLoading: true}
    case ActionTypes.GROUP_SUCCESS:
      return {...state, groupData: action.payload, groupLoading: false}

    case ActionTypes.SYSTEMAUTH_REQUEST:
      return {...state, authorizeLoading: true}
    case ActionTypes.SYSTEMAUTH_SUCCESS:
      return {...state, authorizeLoading: false, authorizeData: action.payload,
      }

    case ActionTypes.USERAUTH_REQUEST:
      return {...state, userAuthorizationLoading: true}
    case ActionTypes.USERAUTH_SUCCESS:
      return { ...state, userAuthorizationLoading: false, userAuthorizationData: action.payload}

    case ActionTypes.GETDOCS_REQUEST:
      return {...state, documentsLoading: true}
    case ActionTypes.GETDOCS_SUCCESS:
      return {...state, documentsLoading: false, userDocuments: action.payload}

    case ActionTypes.GETDOCSTATUS_REQUEST:
      return {...state, authDocStatusLoading: true}
    case ActionTypes.GETDOCSTATUS_SUCCESS:
      return {...state, authDocStatusLoading: false, authDocStatusData: action.payload}

    case ActionTypes.USERPLAN_REQUEST:
      return {...state, userPlanLoading: true}
    case ActionTypes.USERPLAN_SUCCESS:
      return {...state, userPlanLoading: false, userPlanData: action.payload}

    case ActionTypes.USERUSERS_REQUEST:
      return {...state, userUsersLoading: true}
    case ActionTypes.USERUSERS_SUCCESS:
      return {...state, userUsersData: action.payload.data, userUsersLoading: false,
        userUsersCount: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.CHANGEPASS_REQUEST:
      return {...state, changePasswordLoading: true}
    case ActionTypes.CHANGEPASS_SUCCESS:
      return {...state, changePasswordLoading: false,
        messageText: 'changePasswordSuccess', messageType: 'success',
      }

    // ************************************************************************* Custom Plan
    case ActionTypes.PRODUCTS_REQUEST:
      return {...state, productsLoading: true}
    case ActionTypes.PRODUCTS_SUCCESS:
      return {...state, data: action.payload.data, productsLoading: false,
        count: getCount(action.payload.data, action.payload.range),}

    case ActionTypes.PRODUCT_REQUEST:
      return {...state, productLoading: true}
    case ActionTypes.PRODUCT_SUCCESS:
      return {...state, product: action.payload, productLoading: false,}

    case ActionTypes.PFAS_REQUEST:
      return {...state, PFAsLoading: true,}
    case ActionTypes.PFAS_SUCCESS:
      return {...state, PFAsLoading: false, PFAs: action.payload,}

    case ActionTypes.PCS_REQUEST:
      return {...state, PCsLoading: true,}
    case ActionTypes.PCS_SUCCESS:
      return {...state, PCsLoading: false, PCs: action.payload,}

    case ActionTypes.QBS_REQUEST:
      return {...state, QBsLoading: true,}
    case ActionTypes.QBS_SUCCESS:
      return {...state, QBsLoading: false, QBs: action.payload,}

    case ActionTypes.PRODUCTFEATURES_REQUEST:
      return {...state, productfeaturesLoading: true}
    case ActionTypes.PRODUCTFEATURES_SUCCESS:
      return {...state, productfeatures: action.payload, productfeaturesLoading: false,}

    case ActionTypes.DEFAULTPRODUCTS_REQUEST:
      return {...state, }
    case ActionTypes.DEFAULTPRODUCTS_SUCCESS:
      return {...state, defaultProducts: action.payload, }

    case ActionTypes.ADDEDITPRODUCT_REQUEST:
      return {...state, addEditProductLoading: true}
    case ActionTypes.ADDEDITPRODUCT_SUCCESS:
      sentData = action.meta
      return {...state, addEditProductLoading: false,
        messageText: sentData ? 'productUpdateSuccess' : 'productDefinitionSuccess',
        messageType: 'success',
        product:  sentData || action.payload,
      }

    case ActionTypes.ADDEDITPFA_REQUEST:
      return {...state, addEditPFALoading: action.meta || true}
    case ActionTypes.ADDEDITPFA_SUCCESS:
      let PFA = action.meta || action.payload
      const oldPFA = action.meta && state.PFAs.filter(item => item.id == PFA.id)[0]
      const index = state.PFAs.indexOf(oldPFA)
      const featureName = state.productfeatures.filter(item => item.id == PFA.productFeature.id)[0].name
      PFA = {...PFA, productFeature: {...PFA.productFeature, name: featureName}}
      return {...state, addEditPFALoading: false,
        messageText: action.meta ? 'featureApplicabilityUpdate'
          : 'featureApplicabilityDefinition',
        messageType: 'success',
        // PFAs:  action.meta? [...state.PFAs.slice(0,index), PFA, ...state.PFAs.slice(index+1)]: [...state.PFAs, PFA,],
      }

    case ActionTypes.ADDEDITPC_REQUEST:
      // console.log('action.meta:', action.meta, action.meta.id || action.meta.PFAId)
      return {...state, addEditPCLoading: action.meta.id || action.meta.PFAId}
    case ActionTypes.ADDEDITPC_SUCCESS:
      let PC = action.meta || action.payload
      const oldPC = action.meta && state.PCs.filter(item => item.id == PC.id)[0]
      const i = state.PCs.indexOf(oldPC)

      return {...state, addEditPCLoading: false,
        messageText: action.meta ? 'priceComponentUpdate'
          : 'priceComponentDefinition',
        messageType: 'success',
        // PCs:  action.meta? [...state.PCs.slice(0,i), PC, ...state.PCs.slice(i+1)]: [...state.PCs, PC,],
      }

    case ActionTypes.ADDEDITQB_REQUEST:
      // console.log('action.meta:', action.meta, action.meta.id || action.meta.PCId)
      return {...state, addEditQBLoading: action.meta.id || action.meta.PCId}
    case ActionTypes.ADDEDITQB_SUCCESS:
      let QB = action.meta || action.payload
      const oldQB = action.meta && state.QBs.filter(item => item.id == QB.id)[0]
      const j = state.QBs.indexOf(oldQB)

      return {...state, addEditQBLoading: false,
        messageText: action.meta ? 'quantityBreakUpdate'
          : 'quantityBreakDefinition',
        messageType: 'success',
        // QBs:  action.meta? [...state.QBs.slice(0,j), QB, ...state.QBs.slice(j+1)]: [...state.QBs, QB,],
      }

    case ActionTypes.ADDPRODUCTFEATURE_REQUEST:
      return {...state, addProductFeatureLoading: true}
    case ActionTypes.ADDPRODUCTFEATURE_SUCCESS:
      return {...state, addProductFeatureLoading: false,
        messageText: 'productFeatureDefinitionSuccess',
        messageType: 'success',
      }

    case ActionTypes.DELETEPFA_REQUEST:
      return {...state, deletePFALoading: action.meta}
    case ActionTypes.DELETEPFA_SUCCESS:
      // console.log('PFAs success', state.PFAs, action.meta, state.PFAs.filter(item => item.id != action.meta))
      return {...state, deletePFALoading: false,
        // PFAs: state.PFAs.filter(item => item.id != action.meta),
        messageText: 'productFeatureDeleteSuccess',
        messageType: 'success',
      }

    case ActionTypes.DELETEPC_REQUEST:
      return {...state, deletePCLoading: action.meta}
    case ActionTypes.DELETEPC_SUCCESS:
      // console.log('PCs success', state.PCs, action.meta, state.PCs.filter(item => item.id != action.meta))
      return {...state, deletePCLoading: false,
        // PCs: state.PCs.filter(item => item.id != action.meta),
        messageText: 'priceComponentDeleteSuccess',
        messageType: 'success',
      }

    case ActionTypes.DELETEQB_REQUEST:
      return {...state, deleteQBLoading: action.meta}
    case ActionTypes.DELETEQB_SUCCESS:
      // console.log('QBs success', state.QBs, action.meta, state.QBs.filter(item => item.id != action.meta))
      return {...state, deleteQBLoading: false,
        // QBs: state.QBs.filter(item => item.id != action.meta),
        messageText: 'quantityBreakDeletSuccess',
        messageType: 'success',
      }

    case ActionTypes.DELETEPRODUCT_REQUEST:
      return {...state, deleteProductLoading: true}
    case ActionTypes.DELETEPRODUCT_SUCCESS:
      return {...state, deleteProductLoading: false,
        product: null,
        productId: null,
        messageText: 'productDeleteSuccess',
        messageType: 'success',
      }

    case ActionTypes.DELETEPRODUCTFEATURE_REQUEST:
      return {...state, deleteProductFeatureLoading: action.meta}
    case ActionTypes.DELETEPRODUCTFEATURE_SUCCESS:
      // console.log('delete productfeatures', state.productfeatures, action.meta,
      // state.productfeatures.filter(item => item.id != action.meta));
      return {...state, deleteProductFeatureLoading: false,
        messageText: 'producFeatureDeleteSuccess',
        messageType: 'success',
        productfeatures: state.productfeatures.filter(item => item.id != action.meta)
      }



    // ************************************************************************* End Custom Plan

    case ActionTypes.SETDOCSTATUS_REQUEST:
      return {...state, setAuthDocStatusLoading: true, }
    case ActionTypes.SETDOCSTATUS_SUCCESS:
      return {...state, setAuthDocStatusLoading: false,
      authDocStatusData: {status: action.meta.status, description: action.meta.description},
      messageText: ln(action.meta.status.toLowerCase() + 'User') + ' ' + ln('doneSuccessfully'),
      messageType: action.meta.status == 'ACCEPTED'? 'success': 'error',
     }

    case ActionTypes.SYSTEMAUTHENABLE_REQUEST:
      return {...state, systemAuthEnableLoading: true}
    case ActionTypes.SYSTEMAUTHENABLE_SUCCESS:
      return {...state, systemAuthEnableLoading: false, authorizeData: {status: true},
        messageText: 'systemAuthorizationActivationSuccess', messageType: 'success',
      }

    case ActionTypes.SYSTEMAUTHDISABLE_REQUEST:
      return {...state, systemAuthDisableLoading: true}
    case ActionTypes.SYSTEMAUTHDISABLE_SUCCESS:
      return {...state, systemAuthDisableLoading: false, authorizeData: {status: false},
        messageText: 'systemAuthorizationDeactivationSuccess', messageType: 'success',
      }

    case ActionTypes.USERAUTHENABLE_REQUEST:
      return {...state, userAuthorizationEnableLoading: true}
    case ActionTypes.USERAUTHENABLE_SUCCESS:
      return {
        ...state, userAuthorizationEnableLoading: false, userAuthorizationData: {status: true},
        messageText: 'userActivationSuccess', messageType: 'success',
      }

    case ActionTypes.USERAUTHDISABLE_REQUEST:
      return { ...state, userAuthorizationDisableLoading: true }
    case ActionTypes.USERAUTHDISABLE_SUCCESS:
      return {
        ...state, userAuthorizationDisableLoading: false, userAuthorizationData: { status: false },
        messageText: 'userDeactivationSuccess', messageType: 'success',
      }

    case ActionTypes.ADDGROUP_REQUEST:
      return {...state, addGroupLoading: true}
    case ActionTypes.ADDGROUP_SUCCESS:
      return {...state, addGroupLoading: false, isGroupAdded: true,
        messageText: 'addNewGroupSuccess', messageType: 'success',
      }

    case ActionTypes.UPGRADEGROUP_REQUEST:
        return {...state, upgradeGroupLoading: true}
    case ActionTypes.UPGRADEGROUP_SUCCESS:
        return {...state, upgradeGroupLoading: false, isGroupUpgrated: true,
          messageText: 'upgradeGroupSuccess', messageType: 'success',
        }


    case ActionTypes.CFSPAYINVOICE_REQUEST:
      return {...state, payInvoiceLoading: action.meta}
    case ActionTypes.CFSPAYINVOICE_SUCCESS:
      return {...state, isProductInvoicePaid: true, invoiceData: [action.payload], payInvoiceLoading: false,
        messageText: 'productInvoicePaidSuccess', messageType: 'success',
        // invoiceData:[action.payload],
      }

    case ActionTypes.UPDATEBALANCE_REQUEST:
      return {...state, updateBalanceLoading: true}
    case ActionTypes.UPDATEBALANCE_SUCCESS:
      return {...state, isBalanceUpdated: true, updateBalanceLoading: false,
        messageText: 'updateUserBalanceSuccess', messageType: 'success',
      }

    case ActionTypes.DELETEVM_REQUEST:
      return {...state, deletevmLoading: true}
    case ActionTypes.DELETEVM_SUCCESS:
      return {...state,
        // isVmDeleted: true,
        deletevmLoading: false,
        messageText: 'deleteVMSuccess', messageType: 'success',
      }

    case ActionTypes.DEQUEUEVM_REQUEST:
      return {...state, dequeueLoading: action.meta}
    case ActionTypes.DEQUEUEVM_SUCCESS:
      return {...state, isDequeued: true, dequeueLoading: false,
        messageText: 'queueDeleteVMSuccess', messageType: 'success',
      }

    case ActionTypes.POWERVM_REQUEST:
      return {...state, powervmLoading: true,
        powerActionRequest: action.meta,
      }
    case ActionTypes.POWERVM_SUCCESS:
      return {...state, isVmPowered: true, powervmLoading: false,
        messageText: `VPS ${action.meta} ${ln('isDoneSuccessfully')}`, messageType: 'success',
        vmbillSingle: action.payload,
      }

    case ActionTypes.RENEWVM_REQUEST:
      return {...state, renewvmLoading: true}
    case ActionTypes.RENEWVM_SUCCESS:
      return {...state, isVmRenewed: true, renewvmLoading: false,
        messageText: 'renewVM', messageType: 'success',
      }

    case ActionTypes.RESETBRUSH_REQUEST:
      return {...state, resetBrushLoading: true}
    case ActionTypes.RESETBRUSH_SUCCESS:
      return {...state, isBrushReset: true, resetBrushLoading: false,
        messageText: 'removeVMBrushSuccess', messageType: 'success',
      }

    case ActionTypes.CREATEVM_REQUEST:
      return {...state, createLoading: true}
    case ActionTypes.CREATEVM_SUCCESS:
      return {...state, isVmCreated: true, vmbillSingle: action.payload, createLoading: false,
        messageText: 'vmCreationSuccess', messageType: 'success',
      }
    case ActionTypes.UPDATEPASS_REQUEST:
      return {...state, updatepasswordLoading: true}
    case ActionTypes.UPDATEPASS_SUCCESS:
      return {...state, isPasswordUpdated: true, updatepasswordLoading: false,
        messageText: 'updatePasswordSuccess', messageType: 'success',
      }

    case ActionTypes.VALIDATEISO_REQUEST:
      return {...state, validateLoading: action.meta}
    case ActionTypes.VALIDATEISO_SUCCESS:
      return {...state, validateLoading: false,
        messageText: 'isoVerificationSuccess', messageType: 'success',
      }

    case ActionTypes.ADDHYP_REQUEST:
      return {...state, addHypLoading: true}
    case ActionTypes.ADDHYP_SUCCESS:
      return {...state, addHypLoading: false,
        messageText: 'hypDefinitionSuccess', messageType: 'success',
      }

    case ActionTypes.DELETEHYP_REQUEST:
      return {...state, deleteHypLoading: true}
    case ActionTypes.DELETEHYP_SUCCESS:
      return {...state, deleteHypLoading: false,
        messageText: 'deleteHypSuccess', messageType: 'success',
      }

    case ActionTypes.DELETEISO_REQUEST:
      return {...state, deleteISOLoading: action.meta}
    case ActionTypes.DELETEISO_SUCCESS:
      return {...state, deleteISOLoading: false,
        messageText: 'deleteISOSuccess', messageType: 'success',
      }

    case ActionTypes.UPLOADISO_REQUEST:
      return {...state, isoUploadLoading: true}
    case ActionTypes.UPLOADISO_SUCCESS:
      return {...state, isoUploadLoading: false,
        messageType: 'success', messageText: 'uploadISOSuccess'
      }

    case ActionTypes.UPDATEINVOICE_REQUEST:
      return {...state, updateinvoiceLoading: true}
    case ActionTypes.UPDATEINVOICE_SUCCESS:
      return {...state, updateinvoiceLoading: false,
        messageType: 'success', messageText: 'updateInvoiceSuccess',
      }

    case ActionTypes.PIN_REQUEST:
      return {...state, pinLoading: true,}
    case ActionTypes.PIN_SUCCESS:
      return {...state,
        messageText: 'pinVMSuccess', messageType: 'success',
        pinLoading: false,
        isPinSucceed: true, isUnPinSucceed: false,
      }

    case ActionTypes.UNPIN_REQUEST:
      return {...state, unpinLoading: true,}
    case ActionTypes.UNPIN_SUCCESS:
      return {...state,
        messageText: 'unpinVMSuccess', messageType: 'success',
        unpinLoading: false,
        isUnPinSucceed: true, isPinSucceed: false,
      }

    case ActionTypes.MIGRATE_REQUEST:
      return {...state, migrateLoading: true, isMigrated: false,}
    case ActionTypes.MIGRATE_SUCCESS:
      return {...state,
        migrateLoading:false, isMigrated: true,
        messageText: 'startVMMigration', messageType: 'success',
      }

    case ActionTypes.FINALIZEMIGRATE_REQUEST:
      return {...state, finilizeMigrateLoading: true, isMigratedFinilized: false,}
    case ActionTypes.FINALIZEMIGRATE_SUCCESS:
      return {...state,
        finilizeMigrateLoading:false, isMigratedFinilized: true,
        messageText: 'finalizeVMMigration', messageType: 'success',
      }

    case ActionTypes.RETRYCREATE_REQUEST:
      return {...state, retryLoading: true, }
    case ActionTypes.RETRYCREATE_SUCCESS:
      return {...state, retryLoading: false,
        messageText: 'retryVMCreateSuccess', messageType: 'success',
      }

    case ActionTypes.MAKEBACKUP_REQUEST:
      return {...state, makeBackupLoading: true}
    case ActionTypes.MAKEBACKUP_SUCCESS:
      return {...state, makeBackupLoading: false,
        messageText: 'makeVMBackupSuccess', messageType: 'success',
      }

    case ActionTypes.DELETEBACKUP_REQUEST:
      return {...state, deleteBackupLoading: action.meta,}
    case ActionTypes.DELETEBACKUP_SUCCESS:
      return {...state, deleteBackupLoading: false,
        messageText: 'deleteVMBackupSuccess', messageType: 'success',
      }

    case ActionTypes.RESTOREBACKUP_REQUEST:
      return {...state, restoreBackupLoading: action.meta}
    case ActionTypes.RESTOREBACKUP_SUCCESS:
      return {...state, restoreBackupLoading: false,
        messageText: 'restoreVMBackupSuccess', messageType: 'success',
      }
    case ActionTypes.COMMAND_REQUEST:
      return {...state, commandLoading: action.meta}
    case ActionTypes.COMMAND_SUCCESS:
      let isCommandSuccess = false
      let result = null
      if (!action.payload || action.payload.result == 1) {
        messageText = `${action.meta[0]} ${action.meta[1]} ${ln('didNotExecuteCorrectly')}`
        messageType = 'error'
        isCommandSuccess = false
      } else {
        if (action.meta[1] != 'status') {
          messageType = 'success'
          messageText = `${action.meta[0]} ${isSuccessfully} ${ln(action.meta[1])} ${ln('ed')}`
        }
        isCommandSuccess = true
        result = action.payload.result
      }
      let type = action.meta[1] == 'stop'? 'OFF': action.meta[1] == 'status'? action.payload.result:'ON'
      let newServiceAndTypeObj = {}
      newServiceAndTypeObj[action.meta[0]] = type
      let newServiceAndType = []
      if (!state.serviceAndType) {
        newServiceAndType = [newServiceAndTypeObj]
      } else {
        newServiceAndType = [...state.serviceAndType]
        let serviceAndTypeObj = newServiceAndType.filter(item=>Object.keys(item).indexOf(action.meta[0])!=-1)
        if (serviceAndTypeObj.length) {
          serviceAndTypeObj[0][action.meta[0]] = type
        } else {
          newServiceAndType = [...newServiceAndType, newServiceAndTypeObj]
        }
      }

      return {...state, isCommandSuccess, commandLoading: false, result,
        serviceAndType: newServiceAndType,
        messageType, messageText}

    case ActionTypes.OS_FAILURE:
    case ActionTypes.IPS_FAILURE:
    case ActionTypes.HYPS_FAILURE:
    case ActionTypes.HYPDETAIL_FAILURE:
    case ActionTypes.HYPUSAGE_FAILURE:
    case ActionTypes.COMMAND_FAILURE:
    case ActionTypes.ISO_FAILURE:
    case ActionTypes.UPDATEPASS_FAILURE:
    case ActionTypes.DELETEHYP_FAILURE:
    case ActionTypes.DELETEISO_FAILURE:
    case ActionTypes.UPLOADISO_FAILURE:
    case ActionTypes.VMBILLS_FAILURE:
    case ActionTypes.ADDHYP_FAILURE:
    case ActionTypes.GETISOMD5_FAILURE:
    case ActionTypes.VALIDATEISO_FAILURE:
    case ActionTypes.VMBILLSINGLE_FAILURE:
    case ActionTypes.PIN_FAILURE:
    case ActionTypes.UNPIN_FAILURE:
    case ActionTypes.MIGRATE_FAILURE:
    case ActionTypes.RETRYCREATE_FAILURE:
    case ActionTypes.DUMPXML_FAILURE:
    case ActionTypes.LISTBACKUP_FAILURE:
    case ActionTypes.DELETEVM_FAILURE:
    case ActionTypes.POWERVM_FAILURE:
    case ActionTypes.RENEWVM_FAILURE:
    case ActionTypes.DEQUEUEVM_FAILURE:
    case ActionTypes.VMINVOICES_FAILURE:
    case ActionTypes.IPHISTORY_FAILURE:
    case ActionTypes.USERORDERS_FAILURE:
    case ActionTypes.USERIPHISTORIES_FAILURE:
    case ActionTypes.USERTRANSACTIONS_FAILURE:
    case ActionTypes.LOCATION_FAILURE:
    case ActionTypes.CREATEVM_FAILURE:
    case ActionTypes.INVOICES_FAILURE:
    case ActionTypes.MAKEBACKUP_FAILURE:
    case ActionTypes.DELETEBACKUP_FAILURE:
    case ActionTypes.RESTOREBACKUP_FAILURE:
    case ActionTypes.FINALIZEMIGRATE_FAILURE:
    case ActionTypes.RESETBRUSH_FAILURE:
      isCwsError = true
    case ActionTypes.UPDATEINVOICE_FAILURE:
    case ActionTypes.UPDATEBALANCE_FAILURE:
    case ActionTypes.USERS_FAILURE:
    case ActionTypes.USER_FAILURE:
    case ActionTypes.GROUPS_FAILURE:
    case ActionTypes.PRODUCTS_FAILURE:
    case ActionTypes.ADDEDITPRODUCT_FAILURE:
    case ActionTypes.DELETEPRODUCT_FAILURE:
    case ActionTypes.PRODUCTFEATURES_FAILURE:
    case ActionTypes.ADDPRODUCTFEATURE_FAILURE:
    case ActionTypes.DELETEPRODUCTFEATURE_FAILURE:
    case ActionTypes.ADDEDITPFA_FAILURE:
    case ActionTypes.ADDEDITPC_FAILURE:
    case ActionTypes.ADDEDITQB_FAILURE:
    case ActionTypes.PFAS_FAILURE:
    case ActionTypes.PCS_FAILURE:
    case ActionTypes.QBS_FAILURE:
    case ActionTypes.PRODUCT_FAILURE:
    case ActionTypes.DELETEPFA_FAILURE:
    case ActionTypes.DELETEPC_FAILURE:
    case ActionTypes.DELETEQB_FAILURE:
    case ActionTypes.CFSINVOICES_FAILURE:
    case ActionTypes.CFSINVOICE_FAILURE:
    case ActionTypes.CFSPAYINVOICE_FAILURE:
    case ActionTypes.ADDGROUP_FAILURE:
    case ActionTypes.UPLOADCHART_FAILURE:
    case ActionTypes.DOWNLOADCHART_FAILURE:
    case ActionTypes.USERINVOICES_FAILURE:
    case ActionTypes.USERVMINVOICES_FAILURE:
    case ActionTypes.GROUP_FAILURE:
    case ActionTypes.UPGRADEGROUP_FAILURE:
    case ActionTypes.SYSTEMAUTH_FAILURE:
    case ActionTypes.SYSTEMAUTHENABLE_FAILURE:
    case ActionTypes.SYSTEMAUTHDISABLE_FAILURE:
    case ActionTypes.USERAUTH_FAILURE:
    case ActionTypes.USERAUTHENABLE_FAILURE:
    case ActionTypes.USERAUTHDISABLE_FAILURE:
    case ActionTypes.CFSREJECTINVOICEPAY_FAILURE:
    case ActionTypes.GETDOCS_FAILURE:
    case ActionTypes.GETDOCSTATUS_FAILURE:
    case ActionTypes.SETDOCSTATUS_FAILURE:
    case ActionTypes.USERPLAN_FAILURE:
    case ActionTypes.USERUSERS_FAILURE:
    case ActionTypes.CHANGEPASS_FAILURE:

      const {newState, errorMessage} = getNewStateOnFailure(state, action.payload, isCwsError)
      return {...newState, messageText: errorMessage, messageType: 'error', loadingId: 0,
        ipsLoading: false, hypsLoading: false, hypsUsageLoading: false,
        deletevmLoading: false,
        hypsDetailsLoading: false, commandLoading: false, isoLoading: false,
        updatepasswordLoading: false, validateLoading: false, addHypLoading: false,
        deleteHypLoading: false, isoUploadLoading: false, deleteISOLoading: false,
        makeBackupLoading: false, deleteBackupLoading: false, restoreBackupLoading: false,
        vmbillsLoading: false, locationLoading: false,
        isomd5Loading: false, vmbillSingleLoading: false,
        backupLoading: false, vmInvoicesLoading: false,
        renewvmLoading: false, powervmLoading: false,
        pinLoading: false, unpinLoading: false, migrateLoading: false,
        retryLoading: false, createLoading: false, dequeueLoading: false,
        updateinvoiceLoading: false, ipHistoryLoading: false,
        userLoading: false, userOrdersLoading: false, userIPHistoriesLoading: false, userTransactionLoading: false,
        updateBalanceLoading: false, usersLoading: false,
        xmlLoading: false, invoicesLoading: false, osLoading: false,
        productsLoading: false, addProductLoading: false, resetBrushLoading: false,
        finilizeMigrateLoading: false,
        PFAsLoading: false, productLoading: false, PCsLoading: false, QBsLoading: false,
        cfsInvoicesLoading: false, cfsInvoiceLoading: false,
        payInvoiceLoading: false, addGroupLoading: false,
        uploadChartLoading: false, downloadChartLoading: false, userInvoicesLoading: false,
        userVmInvoicesLoading: false, groupLoading: false, upgradeGroupLoading: false, authorizeLoading: false,
        systemAuthEnableLoading: false, systemAuthDisableLoading: false, userAuthorizationLoading: false,
        userAuthorizationEnableLoading: false, userAuthorizationDisableLoading: false, rejectInvoicePaymentLoading: false,
        authDocStatusLoading: false, setAuthDocStatusLoading: false,
        documentsLoading: false, userPlanLoading: false, userUsersLoading: false,
        changePasswordLoading: false,

        deleteProductLoading: false, addEditProductLoading: false,
        productfeaturesLoading: false, addProductFeatureLoading: false,
        deleteProductFeatureLoading: false,
        groupsLoading: false,
        addEditPFALoading: false, deletePFALoading: false,
        addEditPCLoading: false, deletePCLoading: false,
        addEditQBLoading: false, deleteQBLoading: false,
      }

    case ActionTypes.GROUPS_REQUEST:
      return {...state, groupsLoading: true}
    case ActionTypes.GROUPS_SUCCESS:
      return {...state, groupsLoading: false, data: action.payload.data,
        count: getCount(action.payload.data, action.payload.range)}

    case '@@router/LOCATION_CHANGE':
      return {...state, vmbillSingle: null, user: null, data: null, count:null, product: null,
        productId: null, invoiceData: null, productLoading: null, userLoading: null,
        isGroupAdded: null, isGroupUpgrated: null,
        userTransactionsData: null, userTransactionsCount: null,
        userVmInvoicesData: null, userVmInvoicesCount: null,
        userInvoicesData: null, userInvoicesCount: null,
        userOrdersData: null, userOrdersCount: null,
        userIPHistoriesData: null, userIPHistoriesCount: null, userPlanData: null,
       }
    case 'SHOW_MESSAGE':
      console.log('SHOW_MESSAGE', { ...state, messageText: action.messageText, messageType: action.messageType});
      return { ...state, messageText: action.messageText, messageType: action.messageType}
    case 'MESSAGE_CLEAR':
      return { ...state, messageText: '', }

    case 'USER_CLEAR':
      return { ...state, userId: null, }
    case 'DATA_RESERVE':
      return { ...state, reservedData: state.data, reservedCount: state.count}
    case 'DATA_RESET':
      return { ...state, data: state.reservedData, count: state.reservedCount}
    case 'DEFAULT_EXISTS':
      return { ...state, messageType: 'error', messageText:
        `${ln('product')} ${action.name} ${ln(setDefaultCategory)} ${action.category}`}
    // case 'CHANGE_LANG':
    //   return { ...state, language: action.language}
    default:
      return state
  }
}
