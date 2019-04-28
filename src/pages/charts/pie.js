import React from 'react'
import {Card} from 'antd'
// import echarts from 'echarts'

import theme from './themeLight'

import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'


export default class ChartsPie extends React.Component{
  componentWillMount(){
    Echarts.registerTheme('infographic', theme);
  }
  getOption=()=>{
    return {
      title: {
        text: "用户骑行订单",
        x:'center'
      },
      legend: {
        orient:"vertical",
        right:10,
        top:20,
        bottom:20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type:'pie',
          data:[
            {
              name:"周一",
              value:1000
            },
            {
              name:"周二",
              value:1000
            },
            {
              name:"周三",
              value:2000
            },
            {
              name:"周四",
              value:1500
            },
            {
              name:"周五",
              value:1400
            },
            {
              name:"周六",
              value:1200
            },
            {
              name:"周日",
              value:1800
            }
          ]
        }
      ]

    };
  }

  getOption2=()=>{
    return {
      title: {
        text: "用户骑行订单",
        x:'center'
      },
      legend: {
        orient:"vertical",
        right:10,
        top:20,
        bottom:20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type:'pie',
          radius:['50%','80%'],
          data:[
            {
              name:"周一",
              value:1000
            },
            {
              name:"周二",
              value:1000
            },
            {
              name:"周三",
              value:2000
            },
            {
              name:"周四",
              value:1500
            },
            {
              name:"周五",
              value:1400
            },
            {
              name:"周六",
              value:1200
            },
            {
              name:"周日",
              value:1800
            }
          ]
        }
      ]

    };
  }


  getOption3=()=>{
    return {
      title: {
        text: "用户骑行订单",
        x:'center'
      },
      legend: {
        orient:"vertical",
        right:10,
        top:20,
        bottom:20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type:'pie',
          roseType:'area',
          data:[
            {
              name:"周一",
              value:1000
            },
            {
              name:"周二",
              value:1800
            },
            {
              name:"周三",
              value:2000
            },
            {
              name:"周四",
              value:1500
            },
            {
              name:"周五",
              value:2500
            },
            {
              name:"周六",
              value:1200
            },
            {
              name:"周日",
              value:1800
            }
          ].sort((a,b)=>{
            return a.value-b.value
          })
        }
      ]

    };
  }
  render(){
    return(
      <div>
        <Card title="饼图1">
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
        <Card title="饼图（环形图）">
          <ReactEcharts
            option={this.getOption2()}
            notMerge={true}
            lazyUpdate={true}
            theme={"infographic"}
            style={{height:500}}
          />
        </Card>
        <Card title="饼图3">
          <ReactEcharts
            option={this.getOption3()}
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