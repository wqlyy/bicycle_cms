import React from 'react'
import {Card} from 'antd'
// import echarts from 'echarts'

import theme from './infographic'

import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'


export default class ChartsBar extends React.Component{
  componentWillMount(){
    Echarts.registerTheme('infographic', theme);
  }
  getOption = ()=>{
    return {
      title:{
        text:"用户骑行订单"
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis : {
        type : 'category',
        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis : {
        type : 'value'
      },
      series : [
        {
          name:'订单量',
          type:'bar',
          data:[1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    };
  }
  getOption2=()=>{
    return {
      title:{
        text:"用户骑行订单"
      },
      legend: {
        data: ['OFO', '摩拜', '小蓝', '青桔']
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis : {
        type : 'category',
        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis : {
        type : 'value'
      },
      series : [
        {
          name: 'OFO',
          type: 'bar',
          data: [320, 332, 301, 334, 390,300,500]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [220, 182, 191, 234, 290,250,210]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [150, 232, 201, 154, 190,120,189]
        },
        {
          name: '青桔',
          type: 'bar',
          data: [98, 77, 101, 99, 40,160,80]
        }
      ]
    };
  }
  render(){
    return(
      <div>
        <Card title="柱状图1">
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
        <Card title="柱状图2">
          <ReactEcharts
            option={this.getOption2()}
            notMerge={true}
            lazyUpdate={true}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
      </div>
    )
  }
}