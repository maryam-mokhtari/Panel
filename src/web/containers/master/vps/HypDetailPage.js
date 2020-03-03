import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadHypsDetails, loadUsageHyps,
  runCommand,
  loadISO, uploadISO, deleteISO, getISOMd5, validateISO,
  hypUpdatePassword, deleteHyp, dequeue,
} from '../../../../actions'
import HypDetail from '../../../components/master/vps/HypDetail'
import Loading from '../../../components/general/Loading'
import {baseRoute} from '../../../../utils/route'
import { siteConfig, } from '../../../../utils/siteConfig'
import { language, ln, dir } from '../../../../utils/language'

class HypDetailPage extends Component {

  componentDidMount() {
    this.loadData()
  }
  loadData() {
    this.props.loadHypsDetails(this.props.hypId)
    this.props.loadUsageHyps()
  }
  componentDidUpdate(nextProps) {
    if (this.props.hypId != nextProps.hypId) {
      this.loadData()
    }
  }
  render() {
    const {currentUser,
      hypId,
      hypDetails, hypsDetailsLoading,
      commandLoading, isCommandSuccess,
      hypUsages, hypsUsageLoading,
      isoUploadLoading,
      validateLoading,
      updatepasswordLoading, deleteHypLoading,
      deleteISOLoading,
      isoLoading, isos, isomd5Loading, dequeueLoading,
      result, serviceAndType, md5Info,
      verifyData, dequeue,
      loadISO, uploadISO, deleteISO, getISOMd5, validateISO,
      runCommand, hypUpdatePassword, deleteHyp,
    } = this.props

    let hyp = hypDetails && hypDetails.hyps.filter(hyp=>hyp.id == hypId)[0]
    const handlers = {
      runCommand, hypUpdatePassword, deleteHyp, dequeue,
    }
    const isoHandlers = {
      loadISO, uploadISO, deleteISO, getISOMd5, validateISO,
    }
    const detailProps = {hyp, isSingle: true, commandLoading, isCommandSuccess, handlers, isoHandlers,
      isoLoading, isos, hypUsages, hypsUsageLoading, dequeueLoading,
      updatepasswordLoading, deleteHypLoading,
      isoUploadLoading, deleteISOLoading,
      validateLoading,
      md5Info,
      result, serviceAndType, verifyData,
      hypId, isomd5Loading,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('hypervisorDetails')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}`}>{ln('hypervisor')}</Link></li>
            <li className="active">{ln('hypervisorDetails')}</li>
          </ol>
        </section>
        <section className="content">
          {hypsDetailsLoading?
            <Loading />
            :
            hyp ?
            <HypDetail {...detailProps} />
            : <i/>
          }
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const {currentUser,
    hypDetails, hypsDetailsLoading,
    hypUsages, hypsUsageLoading,
    commandLoading, isCommandSuccess,
    updatepasswordLoading, deleteHypLoading,
    isoUploadLoading, deleteISOLoading,
    validateLoading,
    isoLoading, isos,
    isomd5Loading,
    result, serviceAndType, verifyData, md5Info,
    dequeueLoading,
    hypDetailsId,
  } = state.masterEntities

  const {hypId} = ownProps.params
  return {
    currentUser,
    hypId,
    isoLoading, isos,
    hypDetails, hypsDetailsLoading,
    hypUsages, hypsUsageLoading,
    isCommandSuccess, commandLoading, md5Info,
    updatepasswordLoading, deleteHypLoading,
    deleteISOLoading,
    validateLoading,
    isoUploadLoading,
    isomd5Loading, dequeueLoading,
    result, serviceAndType, verifyData,
    hypDetailsId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadHypsDetails, loadUsageHyps,
    runCommand,
    loadISO, deleteHyp, uploadISO, deleteISO, getISOMd5, validateISO,
    hypUpdatePassword, dequeue,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HypDetailPage)
