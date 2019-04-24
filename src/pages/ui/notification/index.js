import React from 'react';
import {Card,Button,notification} from 'antd';

import '../ui.less'

export default class Notice extends React.Component{
  openNotification=(type,dir)=>{
    let config={
      message:'标题',
      description:'描述信息'
    };
    if(dir){
      config = Object.assign(config,{placement:dir});
    }
    notification[type](config);
  }
  render(){
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
          <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
          <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框位置" className="card-wrap">
          <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success-topLeft</Button>
          <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info-topRight</Button>
          <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning-bottomLeft</Button>
          <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>Error-bottomRight</Button>
        </Card>
      </div> 
    )
  }
}