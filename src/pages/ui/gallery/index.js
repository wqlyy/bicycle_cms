import React from 'react';
import {Card,Row,Col} from 'antd';

import '../ui.less'

export default class Gallerys extends React.Component{
  componentWillMount(){
    const imgs=[];
    for(let i=0;i<4;i++){
      imgs[i]=[]
      for(let j = (i*4)+1;j<=(i+1)*4;j++){
        imgs[i].push(`${j}.png`);
      }
    }
    this.setState({
      imgs
    })
  }
  render(){
    const imgList = this.state.imgs.map(list=>list.map((item,index)=>{
      return (
        <Card key={index} cover={<img alt="" src={`/gallery/${item}`}></img>}>
           <Card.Meta title="图片标题" description="图片描述"/>
        </Card>
      )
    }))
    return (
      <div className="card-wrap">
        <Row gutter={10}>
          <Col span={6}>{imgList[0]}</Col>
          <Col span={6}>{imgList[1]}</Col>
          <Col span={6}>{imgList[2]}</Col>
          <Col span={6}>{imgList[3]}</Col>
          <Col span={6}>{imgList[4]}</Col>
        </Row>
      </div> 
    )
  }
}