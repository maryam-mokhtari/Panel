import React, { Component } from 'react'
import {language, ln, dir} from '../../../../utils/language'

export default class GeneralSearch extends Component {
  render() {
    return (
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group" style={{background: 'white'}}>
                <input type="text" name="q" className="form-control" placeholder={`${ln('search')}...`} />
                <span className="input-group-btn">
                  <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
          )
        }
      }
