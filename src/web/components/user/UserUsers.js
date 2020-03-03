import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import {isArrayOK} from '../../../utils/array'
import {language, ln, dir} from '../../../utils/language'
import {getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import {getPDate, } from '../../../utils/date'
import {getDoughnutData, } from '../../../utils/doughnut'
import Loading from '../../components/general/Loading'
import DoughnutChart from '../../components/general/DoughnutChart'
import GeneralList from '../../components/list/GeneralList'
import {cfs} from '../../../utils/path'

export default class UserUsers extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.isLoginAsClientSuccess != nextProps.isLoginAsClientSuccess
      && this.props.isLoginAsClientSuccess) {
        location.assign(`/${cfs}`)
    }
  }
  render() {
    const {
      userUsersLoading, userUsersData, userUsersCount,
      loginAsClientLoading, loginAsClient,
      count,
      userId,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      listHandlers,
    } = this.props
    const tableHeaders = ['email', 'quota', 'active', 'registered', ' ',]
    const sortColumns = ['email', 'quota', 'active', ]
    const generalListProps = {
      isLoading: userUsersLoading,
      data: userUsersData, count: userUsersCount,
      tableHeaders, listType: 'vadminGroupUsers', listHandlers,
      dispatch,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      isSidebarCollapsed: false,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,

      trHandlers: {loginAsClient,  },
      trLoadings: {loginAsClientLoading, },
      lastParams: {userId},
    }
    console.log(' User Users props', this.props);

    return (
      <div id="UserUsers" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div className="box-body" style={{display: ''}}>
            <GeneralList {...generalListProps} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
