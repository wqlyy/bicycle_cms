import React from 'react'
import {Card,Button,Radio} from 'antd'

import '../ui.less'

export default class Buttons extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      size:'default'
    }
  }
  render(){
    return(
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="default">普通按钮</Button>
          <Button type="primary">主色按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="danger">警告按钮</Button>
          <Button disabled>禁用按钮</Button>
        </Card>
        <Card title="图形按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card-wrap">
          <Button loading={this.state.loading} type="primary">确定</Button>
          <Button loading={this.state.loading} shape="circle" type="primary"></Button>
          <Button onClick={this.handleOpenLoading} loading={this.state.loading}>点击加载</Button>
          <Button loading={this.state.loading} shape="circle"></Button>
          <Button onClick={this.handleCloseLoading} type="primary">关闭</Button>
        </Card>
        <Card title="按钮组">
        <Button.Group>
          <Button icon="left" type="primary">返回</Button>
          <Button icon="right" type="primary">前进</Button>
        </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button size={this.state.size} type="default">普通按钮</Button>
          <Button size={this.state.size} type="primary">主色按钮</Button>
          <Button size={this.state.size} type="dashed">虚线按钮</Button>
          <Button size={this.state.size} type="danger">警告按钮</Button>
          <Button size={this.state.size} disabled>禁用按钮</Button>
        </Card>
        
      </div>
    )
  }
  handleCloseLoading=()=>{
    this.setState({
      loading:false
    })
  }
  handleOpenLoading=()=>{
    this.setState({
      loading:true
    })
  }
  handleChangeSize=(e)=>{
    this.setState(()=>{
      let val = e.target.value;
      return {
        size:val
      }
    })
  }
}