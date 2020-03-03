import React, { Component } from 'react'
import DatePicker from 'react-datepicker2'
import 'react-datepicker2/dist/react-datepicker2.min.css'
import {getNormalizedDigit, } from '../../../utils/normalize'
import {isValid, clear} from '../../../utils/form'
import {baseRoute} from '../../../utils/route'
import {siteConfig} from '../../../utils/siteConfig'
import {formFields as masterFormFields} from '../../../utils/master/formFields'
import {formFields as businessFormFields} from '../../../utils/business/formFields'
import Loading from './Loading'
const formFields = baseRoute.isMaster? masterFormFields : businessFormFields
import { language, ln, dir } from '../../../utils/language'

export default class FormGeneratorModal extends Component {
  constructor(props) {
    super(props)
    this.state = {isEyeOpened: false}
  }
  checkBalance(val, defaultVal) {
    this.refs.defaultBalance.innerText =  getNormalizedDigit(Number(val) + Number(defaultVal)) + ' ' + ln('irr')
  }
  isDateValid(value, inputname) {

    if (value) {
      this.refs[inputname+'Div'].classList.remove('has-error')
      return true
    } else {
      this.refs[inputname+'Div'].classList.add('has-error')
      return false
    }
  }

  async doAdvancedSearch(submitParams) {
    const {innerForm, setSearchParams} = this.props
    const searchParams = formFields[innerForm].map((item, index) => ({
      type: item.searchParam, value: submitParams[index],
    }))
    if (submitParams) {
      await setSearchParams(searchParams)
    }
    const  {loadData, pageNumber, pageSize, sortColumn, isAscending, lastParams, } = this.props
    loadData(pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams, )
  }
  render() {
    const {buttonText, innerText, innerForm, formId, submitAction, iconName, params,
      selectData, selectLoading, isAlarm, defaultValues, isSearchForm, isSearchLoading,
    } = this.props

    return (
      <div className={!isSearchForm && `modal fade modal-div ${formId || innerForm}`}
        tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog modal-lg" role="document" style={isSearchForm && {marginTop: 0}}>
          <div className="modal-content">
            {!isSearchForm &&
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">{ln(buttonText)}</h4>
              </div>
            }
            <div className="modal-body" style={isSearchForm && {padding: 0}}>
              {innerText?
                <p>{ln(innerText)}</p>
                :
                <form role="form" className="form-horizontal">

                  {formFields[innerForm] &&
                    <div className="box-body">
                      { formFields[innerForm].map((field, index) => {
                        return (
                          <div key={index} className={`form-group ${isSearchForm && 'col-md-6 col-sm-12'}`}
                            style={isSearchForm && {marginBottom: 10}}
                            ref={`${field.name}Div`}>
                            <label className={`${isSearchForm?'col-sm-4':'col-md-2 col-sm-4'} control-label`}
                              htmlFor={field.name}>{ln(field.displayName)}
                            </label>
                            <div className={isSearchForm?'col-sm-8':'col-md-10 col-sm-8'}>
                              {
                                field.type == 'select' &&
                                (
                                  selectLoading && selectLoading[field.name]?
                                  <Loading />
                                  :
                                  <select className="form-control input-form"  ref={field.name}
                                    defaultValue={defaultValues && defaultValues[field.name]}
                                    onChange={() => field.isRequired && isValid(this.refs, field.name)}
                                    // disabled={field.readOnlyOnEdit && defaultValues && defaultValues[field.name]}
                                    >
                                    {field.isNullRequired &&
                                      <option value=''>---</option>
                                    }
                                    {selectData && selectData[field.name] && selectData[field.name].map((item, index) =>
                                      <option key={index} value={item.value == null? item.name: item.value}>{ln(item.name)}</option>
                                    )}
                                  </select>
                                )
                              }
                              {field.type == 'checkbox' &&
                                <input type="checkbox" className="input-form" style={{marginTop: 10}}
                                   ref={field.name}
                                  defaultChecked={defaultValues && defaultValues[field.name]}
                                  />
                              }
                              {field.type == 'label' &&
                                <div className="text-light-blue"
                                  style={{marginTop: 10}}
                                   ref={field.name}>
                                  {defaultValues && getNormalizedDigit(defaultValues[field.name]) + '  IRR'}
                                </div>
                              }
                              {field.type == 'textarea' &&
                                <textarea
                                  className="form-control input-form search-field" rows="3"
                                   ref={field.name}
                                  defaultValue={defaultValues && defaultValues[field.name]}
                                  placeholder={field.placeholder}
                                  onChange={()=>field.isRequired && isValid(this.refs, field.name)}
                                  />
                              }
                              {(field.type == 'text' || field.type == 'password' || field.type == 'number' || !field.type)
                                &&
                                <span>
                                  <input className="form-control input-form search-field"
                                     ref={field.name}
                                    defaultValue={defaultValues && defaultValues[field.name]}
                                    type={field.type? field.type == 'password'?
                                      this.state.isEyeOpened? `text` :`password`: field.type: 'text'}
                                    placeholder={field.placeholder}
                                    onChange={(e)=>
                                      field.name == 'balance'?
                                      this.checkBalance(e.target.value, defaultValues && defaultValues['defaultBalance'])
                                      : field.isRequired && isValid(this.refs, field.name)}
                                  />

                                  {field.type == 'password' &&
                                    <span className={`fa fa-eye eye ${!this.state.isEyeOpened && 'text-gray'}`}
                                      style={{[dir('reverseAlign')]: 25}}
                                      onClick={() => {
                                        this.setState({isEyeOpened: !this.state.isEyeOpened})
                                      }}>
                                    </span>
                                  }
                                </span>
                              }
                              {
                                field.type == 'date' &&
                                <DatePicker isGregorian={language.key != 'fa'}
                                  value={this.state[field.name]}
                                   ref={field.name}
                                  className="form-control input-form"
                                  onChange={val => {
                                    this.setState({ [field.name]: val })
                                    if (field.isRequired) this.isDateValid(val, field.name)
                                  }}
                                  />
                              }
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  }
                </form>

              }
            </div>
            <div className={!isSearchForm && 'modal-footer'}>
              {!isSearchForm &&
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">{ln('close')}</button>
              }
              {!isAlarm &&
                <button type="button" id="submitButton" className={`btn btn-${siteConfig.key == 'mtn'? 'warning': 'primary'}`}
                  disabled={isSearchLoading && isSearchForm}
                  style={isSearchForm && {margin: '-5px 10px 10px 10px'}}
                  onClick={() => {

                    let submitParams = params? params: []
                    let isValidated = true
                    if (!innerText) {
                      // isValidated = formFields[innerForm] && formFields[innerForm].every(field => !field.isRequired || isValid(this.refs, field.name))
                      formFields[innerForm] && formFields[innerForm].forEach(field =>
                        isValidated = isValidated & (!field.isRequired ||
                          (field.type == 'date'? this.isDateValid(this.state[field.name], field.name): isValid(this.refs, field.name)
                        )))
                        if(isValidated) {
                          submitParams = [...submitParams, ...formFields[innerForm].map(field =>
                            field.type == 'checkbox'? this.refs[field.name].checked :
                            field.type == 'date'? this.state[field.name] :
                            this.refs[field.name].value)
                          ]
                        }
                      }
                      console.log('submitAction:', submitParams, submitAction);
                      if (isSearchForm) {
                        !isSearchLoading && submitParams && submitParams.length
                        && !submitParams.every(item => item == "") && this.doAdvancedSearch(submitParams)
                      } else {
                        if (isValidated) {
                          submitAction(...submitParams)
                          $('.modal-div').modal('hide')
                        }
                      }
                    }}>{ln(buttonText)} &nbsp;
                    {isSearchLoading && isSearchForm?
                      <i className="fa fa-spin fa-circle-o-notch"></i>
                      :
                      <i className={`fa fa-${iconName}`} />
                    }
                </button>
              }
              {isSearchForm &&
                <button type="button" className={`btn btn-default ${isSearchLoading && 'hide'}`} data-dismiss="modal"
                  style={{margin: '-5px 10px 10px 10px'}} data-widget="collapse"
                  onClick={() =>  {
                    formFields[innerForm].map((field, index) => {
                      clear(this.refs, field.name)
                    })
                    this.doAdvancedSearch([])
                  }}
                  >{ln('cancel')}</button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
