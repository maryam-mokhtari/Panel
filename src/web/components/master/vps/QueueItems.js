import React, { Component } from 'react'
import { language, ln, dir } from '../../../../utils/language'

export default class QueueItems extends Component {

  render() {
    const {
      queueItems,
      dequeueLoading,
    } = this.props
    const {dequeue} = this.props.handlers
    return (
      <div className="margin">
        <div className="text-red">{ln('queueItems')}</div>
        {queueItems.map((item, index) => (
          <div key={index} style={{
              float: 'left',
              margin: 10,
              padding: 10,
              border: '1px solid #eee',
              boxShadow: '1px 1px 1px #fbfbfb'
            }}>
            <a className="btn btn-app" style={{margin: 10}} onClick={() => dequeueLoading != item.name && dequeue(item.name)}
              disabled={dequeueLoading == item.name}
              >
              {dequeueLoading == item.name?
                <i className="fa fa-spin fa-circle-o-notch" />
                :
                <i className="fa fa-caret-square-o-up" />
              }
              <span>Dequeue</span>
            </a>
            <div style={{textAlign: 'center'}}>{item.name}</div>
            <span className="text-gray text-sm" >From: </span>
            <span className="text-orange text-sm">{item.startedTime.toDateString().substr(4)}</span>
            <div className="text-orange text-sm" style={{paddingLeft: 40}}>

              {item.startedTime.toTimeString().substr(0,8)}
            </div>

          </div>
        ))}
      </div>
    )
  }
}
