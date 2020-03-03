import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {clearFormGeneratorModal}  from '../../../../utils/form'
import { loadHyps, loadUsageHyps, loadAddHyp, loadLocations,
  hypUpdatePassword, deleteHyp, addHyp,
} from '../../../../actions'
import HypDetail from '../../../components/master/vps/HypDetail'
import FormGeneratorModal from '../../../components/general/FormGeneratorModal'
import Loading from '../../../components/general/Loading'
import { language, ln, dir } from '../../../../utils/language'
import { siteConfig } from '../../../../utils/siteConfig'

class HypsPage extends Component {
  componentDidMount() {
    this.props.loadLocations()
    // this.props.loadHyps()
    this.props.loadUsageHyps()
  }
  render() {
    const {currentUser,
      hypResources, hypsLoading,
      hypUsages, hypsUsageLoading,
      updatepasswordLoading,
      deleteHypLoading,
      addHypLoading,
      locations, locationLoading,
      hypUpdatePassword, deleteHyp, addHyp,
    } = this.props
    const handlers = { hypUpdatePassword, deleteHyp, addHyp, }
    const addHypProps = {selectData:{location: locations}, selectLoading:{location: locationLoading}}
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('dashboard')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li className="active">{ln('home')}</li>
            <li className="active">{ln('hypervisor')}</li>
          </ol>
        </section>

        <section className="content">
          <section>
            <div className="row">
              <div className="col-md-6">
                <button type="button" className="btn btn-default white-button"
                  data-toggle="modal" data-target={!addHypLoading && '.addHyp'}
                  onClick={()=> clearFormGeneratorModal()}
                  disabled={addHypLoading}
                  >
                  <span>{ln('addHypervisor')} &nbsp;</span>
                  {addHypLoading?
                    <i className="fa fa-spin fa-circle-o-notch"></i>
                    :
                    <i className="fa fa-plus-circle"></i>
                  }
                </button>
              </div>
              <div className="col-md-6">
              </div>
            </div>

            <FormGeneratorModal buttonText='modalTitleAddHypervisor' iconName="plus" innerForm="addHyp"
              submitAction={this.props.addHyp}
              {...addHypProps}
              />
          </section>
          {
            hypsLoading?
            <Loading padding="30" />
            :
            hypResources ?
            hypResources.hyps.sort((a, b) => a.name > b.name).map(hyp => {

              const detailProps = {hyp, isSingle: false, handlers,
                hypUsages, hypsUsageLoading,
                updatepasswordLoading,
                deleteHypLoading,
              }
              return (
                <HypDetail {...detailProps} key={hyp.id}/>
              )
            })
            :
            <i />
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {currentUser,
    hypResources, hypsLoading,
    hypUsages, hypsUsageLoading,
    locations, locationLoading,
    updatepasswordLoading,
    addHypLoading,
    deleteHypLoading,
  } = state.masterEntities
  return {
    currentUser, hypResources, hypsLoading, hypUsages, hypsUsageLoading,
    updatepasswordLoading,
    deleteHypLoading, addHypLoading,
    locations, locationLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadHyps, loadUsageHyps, loadAddHyp, loadLocations,
    hypUpdatePassword, deleteHyp, addHyp,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HypsPage)
