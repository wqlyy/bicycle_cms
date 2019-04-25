import React from 'react'
import {Row,Col} from 'antd'
import moment from 'moment'

// import Util from '../../utils/utils'
import './index.less'
import Axios from 'axios';

export default class Header extends React.Component{
  componentWillMount(){
    this.setState({
      userName:'admin1'
    })
    setInterval(() => {
      // let sysTime = Util.formatDate(new Date().getTime())
      let sysTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      this.setState({
        sysTime
      })
    }, 1000);
    this.getWeather()
  }
  getWeather=()=>{
     // https://www.tianqiapi.com/api/
    Axios.get('https://www.tianqiapi.com/api/').then(res=>{
      this.setState({
        weather:res.data.data[0].wea,
        city:res.data.city
      })
    }).catch(err=>{
      console.log(err);
      this.setState({
        weather:'',
        city:''
      })
    })
   
  }
  render(){
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">首页</Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.city+ " " +this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}