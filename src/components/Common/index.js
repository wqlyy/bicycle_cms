import React from 'react'
import { Row,Col } from 'antd'

import Header from '../Header'

import '../../styles/common.less'

export default class Common extends React.Component{
  render(){
    return (
      <Row >
        <Col span={24} className='simple-page'>
        <Header menuType="second"/>
        </Col> 
        <Col span={24} className="content">
        {this.props.children}
        </Col> 
      </Row>      
    )
  }
}