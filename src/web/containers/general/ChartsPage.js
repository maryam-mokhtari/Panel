import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadCFSUploadsCharts, loadCFSDownloadsCharts,
  loadBCFSUploadsCharts, loadBCFSDownloadsCharts,
} from '../../../actions'
import CFSCharts from '../../components/general/CFSCharts'
import Loading from '../../components/general/Loading'
import {baseRoute} from '../../../utils/route'
import {language, ln, dir} from '../../../utils/language'
import { siteConfig, } from '../../../utils/siteConfig'
import { isArrayOK } from '../../../utils/array'

class ChartsPage extends Component {
  render() {
    console.log('ChartsPage', this.props);
    const {
      loadCFSUploadsCharts, loadCFSDownloadsCharts,
      loadBCFSUploadsCharts, loadBCFSDownloadsCharts,
      uploadChartLoading, downloadChartLoading,
      uploadChartData, downloadChartData,
      planGroupLoading, planGroupData,
    } = this.props

    const showLanguage = language.key == 'fa'? 'EN': 'FA'
    const isfa = language.key == 'fa'

    const groupId = isArrayOK(planGroupData)? planGroupData[0].id: 0
    const loadUploadsCharts = groupId? loadBCFSUploadsCharts : loadCFSUploadsCharts
    const loadDownloadsCharts = groupId? loadBCFSDownloadsCharts : loadCFSDownloadsCharts

    const uploadProps = {
      title: 'Upload', chartKey: 'uploadCount',
      chartData: uploadChartData, handlers: {loadCharts: loadUploadsCharts}, chartLoading: uploadChartLoading,
      groupId,
    }
    const downloadProps = {
      title: 'Download', chartKey: 'downloadCount',
      chartData: downloadChartData,
      handlers: {loadCharts: loadDownloadsCharts}, chartLoading: downloadChartLoading,
      groupId,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('uploadDownloadCharts')} &nbsp; <small>{ln('usersCount')}</small>
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.active}`}>{ln('home')}</Link></li>
            <li className="active">{ln('charts')}</li>
          </ol>
        </section>
        {baseRoute.isBusiness && planGroupLoading?
          <Loading />
          :
          (!baseRoute.isBusiness || isArrayOK(planGroupData)) &&
          <section className="content">
            <CFSCharts {...uploadProps} />
            <CFSCharts {...downloadProps} />
          </section>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const entities = baseRoute.isBusiness? state.businessEntities: state.masterEntities
  const {
    uploadChartLoading, downloadChartLoading, uploadChartData, downloadChartData,
    planGroupLoading, planGroupData,
  } = entities
  return {
    baseRoute,
    uploadChartLoading, downloadChartLoading, uploadChartData, downloadChartData,
    planGroupLoading, planGroupData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadCFSUploadsCharts, loadCFSDownloadsCharts,
    loadBCFSUploadsCharts, loadBCFSDownloadsCharts,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartsPage)
