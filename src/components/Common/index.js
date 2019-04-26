import React from 'react'
import { Row,Col } from 'antd'

import Header from '../Header'

import '../../styles/common.less'

export default class Common extends React.Component{
  render(){
    return (
      <div>
        <Row className='container'>
          <Header menuType="second"/>
        </Row>
        <Row>{this.props.children}</Row>
      </div>
    )
  }
}