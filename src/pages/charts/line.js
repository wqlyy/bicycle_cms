import React from 'react'
import {Card} from 'antd'
// import echarts from 'echarts'

import theme from './infographic'

import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'


export default class ChartsLine extends React.Component{
  componentWillMount(){
    Echarts.registerTheme('infographic', theme);
  }
  getOption=()=>{
    return {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis:{
        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis:{
        type:'value'
      },
      series: [
        {
          name: '订单量',
          type:'line',
          data:[1000,2000,1500,3000,2000,1200,800]
        }
      ]

    };
  }

  getOption2=()=>{
    return {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend:{
        data: ['OFO订单量', '摩拜订单量']
      },
      xAxis:{
        boundaryGap:false,
        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis:{
        type:'value'
      },
      series: [
        {
          name: 'OFO订单量',
          type:'line',
          data:[1000,2000,1500,3000,2000,1200,800]
        },
        {
          name: '摩拜订单量',
          type:'line',
          data:[800,1200,1100,1600,2200,1500,1000]
        }
      ]

    };
  }


  getOption3=()=>{
    return {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis:{
        type:"category",
        boundaryGap:false,
        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis:{
        type:'value'
      },
      series: [
        {
          name: '订单量',
          type:'line',
          data:[1000,2000,1500,3000,2000,1200,800],
          areaStyle:{}
        }
      ]

    };
  }
  render(){
    return(
      <div>
        <Card title="折线图表一">
          <ReactEcharts
            option={this.getOption()}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
        <Card title="折线图表二">
          <ReactEcharts
            option={this.getOption2()}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
        <Card title="折线图表三">
          <ReactEcharts
            option={this.getOption3()}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
      </div>
    )
  }
}