import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { push } from 'react-router-redux'
import {
  loadGroupPlan, upgradeGroup
} from '../../../../actions'
import Loading from '../../../components/general/Loading'
import { getCategoryColor,  } from '../../../../utils/color'
import { isValid, clear } from '../../../../utils/form'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import {isArrayOK} from '../../../../utils/array'
import {language, ln, dir} from '../../../../utils/language'

class UpgradeGroupPage extends Component {
  search(itemText, itemId, loadData) {
    itemText = itemText.trim()
    document.getElementById(itemId).onkeypress = (e) => {
      if (e.keyCode == '13' && itemText && itemText != '') {
        loadData(itemText)
      }
    }
  }
  upgradeGroup() {
    this.refs.searchPlanBtn.classList.remove('btn-search-error')
    this.refs.selectPlanDiv && this.refs.selectPlanDiv.classList.remove('tr-error')
    let isFieldsValid = false
    const isSearchPlan = isValid(this.refs, 'searchPlan')

    if (!isSearchPlan) {
      this.refs.searchPlanBtn.classList.add('btn-search-error')
    }
    if (isSearchPlan) {
      isFieldsValid = true

      if (isSearchPlan && !isValid(this.refs, 'selectPlan')) {
        this.refs.selectPlanDiv && this.refs.selectPlanDiv.classList.add('tr-error')
        isFieldsValid = false
      }
    }
    if (isFieldsValid) {
      const planId = Array.from(document.getElementsByName('selectPlan')).filter(item => item.checked)[0].id
      const recurringPeriod = this.refs.recurringPeriod.value;
      const groupId = this.props.groupId
      this.props.upgradeGroup(groupId, planId, recurringPeriod)
    }
  }
  componentDidUpdate() {
    if (this.props.isGroupUpgrated) {
      this.props.dispatch(push(`/${baseRoute.master}/groups`))
    }
  }

  render() {
    const {
      upgradeGroupLoading, loadGroupPlan, productLoading, product, addGroupLoading, groupId,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('group')}
            <small>
              {ln('controlPanel')}
            </small>
          </h1>
          <ol className="breadcrumb">
            <li><i className="fa fa-dashboard"></i> <Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/group/${groupId}`}>{ln('group')}</Link></li>
            <li className="active">{ln('upgrade')}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                  <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}> {ln('upgradeGroup')} </h3>
                  <div className={`box-tools pull-${dir('reverseAlign')}`}>
                    <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-md-8">
                      <label className="col-sm-4">{ln('planName')}</label>
                      <div className="form-group col-sm-8">
                        <div className="input-group" ref="searchPlanDiv">
                          <input className="form-control" placeholder={`${ln('searchPlanName')}...`}
                            id="searchPlan" ref="searchPlan"
                            onChange={(e) => {
                              if (isValid(this.refs, 'searchPlan')) {
                                this.refs.searchPlanBtn.classList.remove('btn-search-error')
                                this.search(e.target.value, 'searchPlan', loadGroupPlan)
                              } else {
                                this.refs.searchPlanBtn.classList.add('btn-search-error')
                              }

                            }} />
                          <span className="input-group-btn">
                            <button className="btn btn-flat btn-search"
                              style={dir('align') == 'right'?{borderLeft: '1px solid #ccc'}:{}}
                              ref="searchPlanBtn"
                              onClick={() => {
                                if (isValid(this.refs, 'searchPlan')) {
                                  this.refs.searchPlanBtn.classList.remove('btn-search-error')
                                  loadGroupPlan(this.refs.searchPlan.value.trim())
                                  // this.search(e.target.value, 'searchPlan', loadGroupPlan)
                                } else {
                                  this.refs.searchPlanBtn.classList.add('btn-search-error')
                                }
                              }}>
                              <i className="fa fa-search" />
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12 search-box">
                      {productLoading ?
                        <Loading />
                        :
                        isArrayOK(product)?
                          <table className={`table table-striped responsive-${language.key}-table`}>
                            <thead>
                              <tr role="row">
                                <th>{ln('select')}</th>
                                <th>{ln('name')}</th>
                                <th>{ln('category')}</th>
                                <th>{ln('default')}</th>
                                <th>{ln('uiVisible')}</th>
                                <th>{ln('active')}</th>
                              </tr>
                            </thead>
                            <tbody ref="selectPlanDiv" id="selectPlanDiv">
                              {product.map(prd =>
                                <tr key={prd.id} role="row">
                                  <td data-title={ln('select')}>
                                    <input type="radio" id={prd.id} ref={`selectPlan${prd.id}`}
                                      name="selectPlan"
                                      onChange={() => {
                                        if (isValid(this.refs, 'selectPlan')) {
                                          this.refs.selectPlanDiv.classList.remove('tr-error')
                                        }
                                      }
                                    }
                                    />
                                  </td>
                                  <td className="en-font" data-title={ln('name')}><Link to={`/${baseRoute.master}/plan/${prd.id}`}>{prd.name || '-'}</Link></td>
                                  <td className="en-font" data-title={ln('category')} className={`text-${getCategoryColor(prd.category)}`}>{prd.category || '-'}</td>
                                  <td data-title={ln('default')}>{prd.defaultPlan ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>
                                  <td data-title={ln('uiVisible')}>{prd.uiVisible ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>
                                  <td data-title={ln('active')}>{prd.active ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        : productLoading == false &&
                        <div className="no-search-result"> {ln('noplanexistswiththisname')}</div>
                      }
                    </div>
                    <div className="col-md-8">
                      <label className="col-sm-4"
                        >{ln('recurringPeriod')}</label>
                      <div className="form-group col-sm-8" ref="recurringPeriodDiv">
                        <select className="form-control input-form" defaultValue="MONTH" name="recurringPeriodDropDown" ref="recurringPeriod" id="recurringPeriod">
                          <option value="DAY">{ln('day')}</option>
                          <option value="MONTH" >{ln('month')}</option>
                          <option value="TMONTH">{ln('tmonth')}</option>
                          <option value="SMONTH">{ln('smonth')}</option>
                          <option value="NMONTH">{ln('nmonth')}</option>
                          <option value="YEAR">{ln('year')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <label className="col-sm-4"></label>
                      <div className="form-group col-sm-8">
                        <button className={`btn btn-${siteConfig.key == 'mtn'? 'warning': 'primary'}`}
                          disabled={upgradeGroupLoading}
                          onClick={() => !upgradeGroupLoading && this.upgradeGroup()}
                          >{ln('upgradeGroup')} &nbsp;
                          {upgradeGroupLoading ?
                            <i className="fa fa-circle-o-notch fa-spin" />
                            :
                            <i className="fa fa-caret-square-o-up"></i>
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
    upgradeGroupLoading, productLoading, product, addGroupLoading, isGroupUpgrated
  } = state.masterEntities
  const { groupId } = ownProps.params
  // console.log('isGroupUpgrated is : ', isGroupUpgrated)
  return {
    groupId, upgradeGroupLoading, productLoading, product, addGroupLoading, isGroupUpgrated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadGroupPlan, upgradeGroup
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeGroupPage)
