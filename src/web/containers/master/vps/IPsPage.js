import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import Loading from '../../../components/general/Loading'
import { loadIPs,} from '../../../../actions'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'

class IPsPage extends Component {
  componentDidMount() {
    this.props.loadIPs()
  }
  render() {
    const {currentUser,
      ipsLoading, IPs,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('ips')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}/`}>{ln('home')}</Link></li>
            <li className="active">{ln('ips')}</li>
          </ol>
        </section>

        <section className="content">
          {ipsLoading ?
            <Loading />
            :
            IPs ?
            <div className="row">
              {
                IPs.map((ip, index) => {


                  return (
                    <div className="col-md-3 col-sm-6" key={index}>
                      <div className="box box-info">
                        <div className="box-header with-border">
                          <h3 className="box-title">
                            <Link to={`/${baseRoute.master}/ip/${ip.ip.replace(/\./g,'-')}`}>
                              {ip.ip}
                            </Link>
                          </h3>

                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

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
    ipsLoading, IPs,
  } = state.masterEntities
  return {
    currentUser, ipsLoading, IPs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadIPs,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IPsPage)
