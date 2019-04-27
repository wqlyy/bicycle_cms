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
     //http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2

    Axios.get('https://www.tianqiapi.com/api/').then(res=>{
      this.setState({
        weather:res.data.data[0].wea,
        city:res.data.city
      })
    }).catch(err=>{
     
      this.setState({
        weather:'',
        city:''
      })
    })
   
  }
  render(){
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType?
            <Col span={6}>
              <div className="logo">
                <h1>共享单车管理平台</h1>
              </div>
            </Col>
            :''
          }
          <Col span={menuType?18:24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        {
          menuType?"":
          <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">首页</Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.city+ " " +this.state.weather}</span>
          </Col>
        </Row>
        }
        
      </div>
    )
  }
}