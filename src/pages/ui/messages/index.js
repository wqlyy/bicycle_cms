import React from 'react';
import {Card,Button, message} from 'antd';

import '../ui.less'

export default class Msg extends React.Component{
  openMessage=(type)=>{
    message[type](`${type}类型消息内容，3s后自动关闭`)
  }
  render() {
    return (
      <div>
        <Card title="全局Message" className='card-wrap'>
          <Button onClick={()=>this.openMessage('success')} type="primary">Success</Button>
          <Button onClick={()=>this.openMessage('info')} type="primary">Info</Button>
          <Button onClick={()=>this.openMessage('warning')} type="primary">Warning</Button>
          <Button onClick={()=>this.openMessage('error')} type="primary">Error</Button>
          <Button onClick={()=>this.openMessage('loading')} type="primary">Loading</Button>
        </Card>
      </div>
    )
  }
}