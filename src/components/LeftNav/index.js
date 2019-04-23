import React from 'react'
import { Menu, Icon } from 'antd';

import MenuConfig from '../../config/menuConfig'

import './index.less'
const SubMenu = Menu.SubMenu;


export default class LeftNav extends React.Component{
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    })
  }
  //菜单渲染
  renderMenu=(data)=>{
    return data.map(item=>{
      if(item.children){
        return (
           <SubMenu key={item.key} title={item.title}>
               {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
    })
  }
  render(){
    return (
      <div>
        <div className='logo'>
          <h1>共享单车管理平台</h1>
        </div>
        <Menu theme="dark">{this.state.menuTreeNode}</Menu>
      </div>
    )
  }
}