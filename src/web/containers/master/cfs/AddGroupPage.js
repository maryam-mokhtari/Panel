import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {push} from 'react-router-redux'
import {
  loadGroupUser, loadGroupPlan, addGroup,
} from '../../../../actions'
import Loading from '../../../components/general/Loading'
import {getCategoryColor, } from '../../../../utils/color'
import {isValid, clear} from '../../../../utils/form'
import {baseRoute} from '../../../../utils/route'
import { siteConfig } from '../../../../utils/siteConfig'
import { isArrayOK } from '../../../../utils/array'
import {language, ln, dir} from '../../../../utils/language'

class AddGroupPage extends Component {
  search(itemText, itemId, loadData){
    itemText = itemText.trim()
    document.getElementById(itemId).onkeypress = (e) => {
      if (e.keyCode == '13' && itemText && itemText != '') {
        loadData(itemText)
      }
    }
  }
  addGroup() {
    this.refs.searchUserBtn.classList.remove('btn-search-error')
    this.refs.searchPlanBtn.classList.remove('btn-search-error')
    this.refs.selectUserDiv && this.refs.selectUserDiv.classList.remove('tr-error')
    this.refs.selectPlanDiv && this.refs.selectPlanDiv.classList.remove('tr-error')
    let isFieldsValid = false
    const isGroupName = isValid(this.refs, 'groupName')
    const isMemberCount = isValid(this.refs, 'memberCount')
    const isSearchUser = isValid(this.refs, 'searchUser')
    const isSearchPlan = isValid(this.refs, 'searchPlan')
    if (!isSearchUser) {
      this.refs.searchUserBtn.classList.add('btn-search-error')
    }
    if (!isSearchPlan) {
      this.refs.searchPlanBtn.classList.add('btn-search-error')
    }
    if (isGroupName && isMemberCount && isSearchUser && isSearchPlan) {
      isFieldsValid = true
      if (isSearchUser && !isValid(this.refs, 'selectUser')) {
        this.refs.selectUserDiv && this.refs.selectUserDiv.classList.add('tr-error')
        isFieldsValid = false
      }
      if (isSearchPlan && !isValid(this.refs, 'selectPlan')) {
        this.refs.selectPlanDiv && this.refs.selectPlanDiv.classList.add('tr-error')
        isFieldsValid = false
      }
    }
    if (isFieldsValid) {
      const groupName = this.refs.groupName.value
      const memberCount = this.refs.memberCount.value
      const userId = this.refs.selectUser.id
      const planId = Array.from(document.getElementsByName('selectPlan')).filter(item => item.checked)[0].id
      this.props.addGroup(groupName, memberCount, userId, planId, )
    }
  }
  componentDidUpdate() {
    if (this.props.isGroupAdded) {
      this.props.dispatch(push(`/${baseRoute.master}/groups`))
    }
  }
  render() {
    const {
      loadGroupUser, loadGroupPlan,
      userLoading, productLoading, user, product, addGroupLoading,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('group')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/groups`}>{ln('groups')}</Link></li>
            <li className="active">{ln('addGroup')}</li>

          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                  <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}>
                    {ln('addGroup')}
                  </h3>
                  <div className={`box-tools pull-${dir('reverseAlign')}`}>
                    <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  <div className="col-md-8">
                    <label className="col-sm-4"
                      htmlFor="groupName">{ln('groupName')}</label>
                    <div className="form-group col-sm-8" ref="groupNameDiv">
                      <input className="form-control input-form"
                        id="groupName" ref="groupName"
                        onChange={() => isValid(this.refs, 'groupName')}
                        />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <label className="col-sm-4"
                      htmlFor="memberCount">{ln('memberCount')}</label>
                    <div className="form-group col-sm-8" ref="memberCountDiv">
                      <input className="form-control input-form"
                        id="memberCount" ref="memberCount"
                        type="number"
                        onChange={() => isValid(this.refs, 'memberCount')}
                        />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <label className="col-sm-4"
                      htmlFor="adminUser">{ln('adminUser')}</label>
                    <div className="form-group col-sm-8">
                      <div className="input-group" ref="searchUserDiv">
                        <input className="form-control" placeholder={`${ln('searchUsernameOremail')}...`}
                          id="searchUser" ref="searchUser"
                          // onKeyPress={(e) => this.checkCharNum(e.target.value, 'userisTyping')}
                          onChange={(e) =>
                            {
                              if (isValid(this.refs, 'searchUser')) {
                                this.refs.searchUserBtn.classList.remove('btn-search-error')
                                this.search(e.target.value, 'searchUser', loadGroupUser)
                              } else {
                                this.refs.searchUserBtn.classList.add('btn-search-error')
                              }

                            }
                          }
                        />
                        <span className="input-group-btn">
                          <button className="btn btn-flat btn-search"
                            style={dir('align') == 'right'?{borderLeft: '1px solid #ccc'}:{}}
                            ref="searchUserBtn"
                            onClick={() => {
                              if (isValid(this.refs, 'searchUser')) {
                                this.refs.searchUserBtn.classList.remove('btn-search-error')
                                loadGroupUser(this.refs.searchUser.value.trim())
                                // this.search(e.target.value, 'searchUser', loadGroupUser)
                              } else {
                                this.refs.searchUserBtn.classList.add('btn-search-error')
                              }
                            }}>
                            <i className="fa fa-search" />
                          </button>
                        </span>
                      </div>

                    </div>
                  </div>
                  <div className="form-group col-md-12 search-box">
                    {userLoading?
                      <Loading />
                      :
                      isArrayOK(user)?
                      <table className={`table table-striped responsive-${language.key}-table`}>
                        <thead>
                          <tr role="row">
                            <th>{ln('select')}</th>
                            <th>{ln('username')}</th>
                            <th>{ln('email')}</th>
                            <th>{ln('verified')}</th>
                            <th>{ln('enabled')}</th>
                            <th>{ln('userType')}</th>
                            <th>{ln('customerType')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr role="row" ref="selectUserDiv" id="selectUserDiv">
                            <td data-title={ln('select')}>
                              <input type="radio" id={user[0].id} ref="selectUser"
                                name="selectUser"
                                onChange={() => {
                                  if (isValid(this.refs, 'selectUser')) {
                                    this.refs.selectUserDiv.classList.remove('tr-error')
                                  }
                                }
                              }
                              />
                          </td>
                          <td className="en-font" data-title={ln('username')}>{user[0].username}</td>
                          <td className="en-font" data-title={ln('email')}>
                            <Link to={`/${baseRoute.master}/user/${user[0].id}`} style={{cursor: 'pointer'}}>
                              {user[0].email}
                            </Link>
                          </td>
                          <td data-title={ln('verified')}>
                            <i className={`fa fa-${user[0].mobileVerified? 'check':'close'} text-${user[0].mobileVerified? 'green':'red'}`} />
                          </td>
                          <td data-title={ln('enabled')}>
                            <i className={`fa fa-${user[0].enabled? 'check':'close'} text-${user[0].enabled? 'green':'red'}`} />
                          </td>
                          <td data-title={ln('userType')} className="text-blue">
                            {user[0].groups.map(grp => grp.name).filter((item, index, inputArray) => inputArray.indexOf(item) == index ).join(', ')}
                          </td>
                          <td data-title={ln('customerType')} className="text-green">
                            {user[0].profile && user[0].profile.customerType || '-'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    : userLoading == false &&
                    <div className="no-search-result">
                      {ln('noUserWithThisInfo')}
                    </div>
                  }

                </div>



                <div className="col-md-8">
                  <label className="col-sm-4"
                    >{ln('planName')}</label>
                  <div className="form-group col-sm-8">
                    <div className="input-group" ref="searchPlanDiv">
                      <input className="form-control" placeholder={`${ln('searchPlanName')}...`}
                        id="searchPlan" ref="searchPlan"
                        onChange={(e) =>
                          {
                            if (isValid(this.refs, 'searchPlan')) {
                              this.refs.searchPlanBtn.classList.remove('btn-search-error')
                              this.search(e.target.value, 'searchPlan', loadGroupPlan)
                            } else {
                              this.refs.searchPlanBtn.classList.add('btn-search-error')
                            }

                          }}  />
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
                      {productLoading?
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
                              <td data-title={ln('default')}>{prd.defaultPlan?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
                              <td data-title={ln('uiVisible')}>{prd.uiVisible?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
                              <td data-title={ln('active')}>{prd.active?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      : productLoading == false &&
                      <div className="no-search-result">
                        {ln('noplanexistswiththisname')}
                      </div>
                    }

                  </div>



                  <div className="col-md-8">
                    <label className="col-sm-4"></label>
                    <div className="form-group col-sm-8">
                      <button className={`btn btn-${siteConfig.key == 'mtn'? 'warning': 'primary'}`}
                        disabled={addGroupLoading}
                        onClick={() => !addGroupLoading && this.addGroup()}
                        >{ln('addGroup')} &nbsp;
                        { addGroupLoading?
                          <i className="fa fa-circle-o-notch fa-spin" />
                          :
                          <i className="fa fa-plus" />
                        }
                      </button>
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
    userLoading, productLoading, user, product, isGroupAdded, addGroupLoading,
  } = state.masterEntities
  const {groupId} = ownProps.params
  return {
    groupId, isGroupAdded, addGroupLoading,
    userLoading, productLoading, user, product,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadGroupUser, loadGroupPlan, addGroup,
  }, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddGroupPage)
