import React from 'react';
import {Card,Spin,Icon,Alert} from 'antd';


import '../ui.less'

export default class Loading extends React.Component{
  render(){
    const icon = <Icon type="plus" style={{fontSize:24}}/>
    const iconLoading = <Icon type="loading" style={{fontSize:24}}/>
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small"/>
          <Spin size="default" style={{margin:'0 10px'}}/>
          <Spin size="large" />
          <Spin indicator={icon} style={{margin:'0 10px'}}/>
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="主题info/success/warning/error"
            description="描述信息"
            type="info"
          />
          <Spin>
            <Alert
              message="和Spin结合"
              description="描述信息"
              type="info"
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
                message="和Spin结合"
                description="描述信息"
                type="success"
              />
          </Spin>
          <Spin indicator={iconLoading}>
            <Alert
                message="和Spin结合"
                description="描述信息"
                type="success"
              />
          </Spin>
        </Card>
      </div>
    )
  }
}
