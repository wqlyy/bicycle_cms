import React from 'react'
import { Row,Col } from 'antd'

import Header from '../Header'
import Footer from '../Footer'
import LeftNav from '../LeftNav'

import '../../styles/common.less'

export default class Layout extends React.Component{
  render(){
    return (
      <Row className='container'>
        <Col span={4} className='left_nav'>
          <LeftNav/>
        </Col>
        <Col span={20} className='main'>
          <Header/>
          <Row className='content'>
          {/* {this.props.children} */}
          内容区域
          </Row>
          <Footer/>
        </Col>
      </Row>
    )
  }
}