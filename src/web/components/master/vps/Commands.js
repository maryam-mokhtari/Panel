import React, { Component } from 'react'
import { language, ln, dir } from '../../../../utils/language'

export default class Commands extends Component {
  async runCommand(service, type, hypId, handlers) {
    await handlers.runCommand(service, type, hypId)
    handlers.runCommand('nfs', 'status', hypId)
    handlers.runCommand('httpd', 'status', hypId)
    handlers.runCommand('libvirtd', 'status', hypId)
    handlers.runCommand('brush', 'status', hypId)
  }
  render() {
    const {hyp, commandLoading, isCommandSuccess, handlers, result, serviceAndType} = this.props
    const prefix = 'service_'
    const myKeys = Object.keys(hyp).filter(key => key.startsWith(prefix))
    return (

      <div className="row">
        {myKeys.map((key, index) => {
          const mod = (index + 1) - Math.floor((index + 1) / 4) * 4
          const background = mod == 0 || mod == 3? '#fbfbfb': ''
          const service = key.replace(prefix, '')
          let status = hyp[key]
          if (isCommandSuccess && serviceAndType && serviceAndType.filter(item=>Object.keys(item)==service).length) {
            status = serviceAndType.filter(item=>Object.keys(item)==service)[0][service]
            // status = type == 'stop'? 'OFF': 'ON'
            console.log('status:',service, status, status == 'ON', status == 'OFF', );
          }
          const color = status == 'ON'?'green': status == 'OFF'? 'red': 'orange'
          return (
            <div className="col-md-6 col-sm-12 col-xs-12" key={index}>
              <div className="info-box" style={{marginBottom: 0, background}}>

                <span className={`info-box-icon  bg-${color}`}
                  style={{fontSize: 25}}>{service}</span>
                <span className={`command-label text-${color}`}>{status}</span>
                <div className="info-box-content">
                  <div className="box-body">
                    <a className={`btn btn-app ${(status == 'ON' || commandLoading && commandLoading.indexOf(service)!=-1) && 'disabled'}`}
                      onClick={() => this.runCommand(service, 'start', hyp['id'], handlers)}
                      >
                      {commandLoading == service+'start'?
                        <i className="fa fa-spin fa-circle-o-notch" />
                        :
                        <i className="fa fa-play" />
                      }
                      Start
                    </a>
                    <a className={`btn btn-app ${(status == 'OFF' || commandLoading && commandLoading.indexOf(service)!=-1) && 'disabled'}`}
                      onClick={() => this.runCommand(service, 'stop', hyp['id'], handlers)}
                      >
                      {commandLoading == service+'stop'?
                        <i className="fa fa-spin fa-circle-o-notch" />
                        :
                        <i className="fa fa-stop" />
                      }
                      Stop
                    </a>
                    <a className={`btn btn-app ${commandLoading && commandLoading.indexOf(service)!=-1 && 'disabled'}`}
                      onClick={() => this.runCommand(service, 'restart', hyp['id'], handlers)}
                      >

                      {commandLoading == service+'restart'?
                        <i className="fa fa-spin fa-circle-o-notch" />
                        :
                        <i className="fa fa-repeat" />
                      }
                      Restart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
