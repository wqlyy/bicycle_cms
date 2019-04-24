import React from 'react';
import {Card,Tabs, message,Icon} from 'antd';

import '../ui.less'

export default class Tab extends React.Component{
  newTabIndex = 1;
  componentWillMount(){
    const panle = [
     
    ];
    this.setState({
      panle,
      activeKey:`${this.newTabIndex}`
    })
  }
  handleChangeTabs=(key)=>{
    message.info(`您选择了第${key}选择卡`);
  }
  handleChangeDymTabs=(key)=>{
    this.setState({
      activeKey:key
    })
  }
  handleAddTabs=(targetKey,action)=>{
    this[action](targetKey);
  }
  add=()=>{
    const panle = this.state.panle;
    const activeKey = `${this.newTabIndex++}`
    panle.push({title:`New Tab ${activeKey}`,content:`Tab${activeKey}内容`,key:activeKey});
    this.setState({
      panle,
      activeKey
    })
  }
  remove=(targetKey)=>{
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panle.forEach((p,i) => {
      if(p.key===targetKey){
        lastIndex = i - 1;
      }
    });
    //返回被保存下来的panle
    const panle = this.state.panle.filter(item=>item.key !== targetKey);
    if(lastIndex >= 0 && activeKey === targetKey){
      activeKey = panle[lastIndex].key;
    }
    this.setState({
      panle,
      activeKey
    })
  }
  render() {
    return (
      <div>
        <Card title="Tab标签基本使用" className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleChangeTabs}>
            <Tabs.TabPane tab="Tab 1" key="1">Tab1内容</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2" disabled>Tab2内容</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">Tab3内容</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title="带Icon图标的Tab" className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleChangeTabs}>
            <Tabs.TabPane tab={<label><Icon type='plus'/>Tab 1</label>} key="1">Tab1内容</Tabs.TabPane>
            <Tabs.TabPane tab={<label><Icon type='edit'/>Tab 2</label>} key="2">Tab2内容</Tabs.TabPane>
            <Tabs.TabPane tab={<label><Icon type='delete'/>Tab 3</label>} key="3">Tab3内容</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title="动态添加、删除Tabs" className='card-wrap'>
          <Tabs 
            activeKey={this.state.activeKey}
            onChange={this.handleChangeDymTabs}
            onEdit={this.handleAddTabs}
            type="editable-card"
            >
            {this.state.panle.map(item=>{
              return <Tabs.TabPane tab={item.title} key={item.key}>{item.content}</Tabs.TabPane>
            })}
          </Tabs>
        </Card>
      </div>
    )
  }
}