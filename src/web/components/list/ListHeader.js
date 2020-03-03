import React, { Component } from 'react'
import FormGeneratorModal from '../general/FormGeneratorModal'
import {language, ln, dir} from '../../../utils/language'
import { siteConfig } from '../../../utils/siteConfig'

export default class ListHeader extends Component {
  async clear() {
    // this.refs.simpleSearchClose.style.display = 'none'
    // this.refs.simpleSearchEnter.style.display = 'none'

    if (document.getElementById('simpleSearchInput')) {
      document.getElementById('simpleSearchInput').value = ''
    }

    await this.props.listHandlers.clearSearchParams()
    const { listHandlers, pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams, } = this.props
    listHandlers.loadData(pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams)
  }

  async changePageSize() {
    if (this.refs.showEntriesSelect) {
      await this.props.listHandlers.changePageSize(1, Number(this.refs.showEntriesSelect.value))

      if (document.getElementById('simpleSearchInput')) {
        document.getElementById('simpleSearchInput').value = ''
      }
      const { listHandlers, pageNumber, pageSize, sortColumn, isAscending, setSearchParams, clearSearchParams, searchParams, lastParams, } = this.props
      await listHandlers.loadData(pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams, )
    }
  }
  simpleSearch(name) {
    name = name.trim()
    if (name && name != '') {
      document.getElementById('simpleSearchInput').onkeypress = (e) => {
        // this.refs.simpleSearchClose.style.display = 'inline-block'
        // this.refs.simpleSearchEnter.style.display = 'inline-block'
        if (e.keyCode == '13') {
          this.doSimpleSearch(name)
        }
      }

    } else {
      this.clear()
    }
  }

  async doSimpleSearch(name) {
    name = name.trim()
    if (name && name != '') {
      const searchParams = [{ type: this.props.searchItemType, value: name }]
      await this.props.listHandlers.setSearchParams(searchParams)
      const { listHandlers, pageNumber, pageSize, sortColumn, isAscending, lastParams, } = this.props
      listHandlers.loadData(pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams, )
    }
  }

  render() {
    const { listHandlers, pageSize, searchItemDisplayName, searchInnerForm, lastParams,
      pageNumber, sortColumn, isAscending, isLoading, searchSelectData, searchSelectLoading,
    } = this.props
    console.log('placeholder is  : ', searchItemDisplayName.toLowerCase())
    const formProps = {
      buttonText: ln('search'),
      innerForm: searchInnerForm, submitAction: searchInnerForm, iconName: 'search',
      isAlarm: false, isSearchForm: true, isSearchLoading: isLoading,
      setSearchParams: this.props.listHandlers.setSearchParams,
      loadData: listHandlers.loadData, pageNumber, pageSize, sortColumn, isAscending,
      selectData: searchSelectData,
      selectLoading: searchSelectLoading, lastParams,
    }
    return (
      <div className="box collapsed-box" style={{ border: 'none', boxShadow: 'none', marginBottom: 2, }}>
        <div className="box-header">
          <div className="row">
            <div className="col-sm-6">
              <div className="dataTables_length">
                <label>{ln('show')}&nbsp;
                  <select ref="showEntriesSelect"
                    onChange={() => this.changePageSize()}
                    className="form-control input-sm"
                    value={pageSize}
                    >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  &nbsp;{ln('entries')}
                </label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="dataTables_filter" style={{textAlign: dir('reverseAlign')}}>
                <label style={{textAlign: dir('align')}}>
                  {/*<span className="search-label" style={{ [dir('reverseAlign')]: 135,}}>{ln('search')}:&nbsp;</span>*/}
                  <input ref="simpleSearchInput" id="simpleSearchInput" type="search"
                    style={{ [dir('reverseAlign')]: 0, border: `1px solid ${siteConfig[siteConfig.key].lightColor}` }}
                    onChange={(e) => this.simpleSearch(e.target.value)}
                    className="form-control input-sm search-input search-field" placeholder={ln(searchItemDisplayName)} />
                  {/*
                    <i className="fa fa-times text-gray search-close-enter" id="simpleSearchClose" ref="simpleSearchClose"
                    onClick={() => this.clear()}
                    style={{ [dir('reverseAlign')]: 10 }} />
                  */}
                  <i className={`fa fa-search text-gray search-btn bg-light-${siteConfig[siteConfig.key].baseColor}`} id="simpleSearchEnter" ref="simpleSearchEnter"
                    onClick={() => this.doSimpleSearch(this.refs.simpleSearchInput.value)}
                    style={{ [dir('reverseAlign')]: -10}} />

                </label>
              </div>
            </div>

          </div>

          <div className="box-tools advanced-search">
            <button type="button" className="btn btn-box-tool no-content"
              data-widget="collapse">
              {ln('advancedSearch')}
            </button>
          </div>
        </div>
        <div className="box-body" >

          <FormGeneratorModal {...formProps} />
        </div>
      </div>
    )
  }
}
