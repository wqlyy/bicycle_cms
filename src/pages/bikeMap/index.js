import React from 'react'
import {Card} from 'antd'
import BaseForm from '../../components/BaseForm'
import Request from '../../utils/request'

export default class BikeMap extends React.Component{
  formList=[
    {
      type:'SELECT',
      label:"城市",
      field:'city',
      placeholder:"全部",
      initialValue:"0",
      width:100,
      list:[
        {
          id:'0',
          name:"全部"
        },
        {
          id:"1",
          name:"北京"
        },
        {
          id:"2",
          name:"天津"
        },
        {
          id:"3",
          name:"上海"
        }
      ]
    },
    {
      type:'时间查询'
    },
    {
      type:'SELECT',
      label:"订单状态",
      field:"order_status",
      placeholder:'全部',
      initialValue:'0',
      list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'行程结束'}]
    },
  ]
  params={
    page:1
  }
  map={}
  state={}
  componentDidMount(){
    this.getList();
  }
  handleFilterSubmit=(filterParams)=>{
    this.params = filterParams;
    this.getList()
  }
  getList=()=>{
    Request.ajax({
      url:'/map/bike_list',
      data:{
        params:this.params
      }
    }).then(res=>{
      console.log(res)
      this.setState({
        total:res.total_count
      })
      this.renderMap(res);
    })
  }
  renderMap=(res)=>{
    const BMap = window.BMap;
    let list = res.route_list;
    this.map = new BMap.Map('container');
    let gps1 = list[0].split(',');
    let startPoint = new BMap.Point(gps1[0],gps1[1]);
    let gps2 = list[list.length-1].split(',');
    let endPoint = new BMap.Point(gps2[0],gps2[1]);
    this.map.centerAndZoom(endPoint,11);

    let startPointIcon = new BMap.Icon('/assets/start_point.png',new BMap.Size(36,42),{
      imageSize:new BMap.Size(36,42),
      anchor:new BMap.Size(18,42)
    });
    let bikeMarkerStart = new BMap.Marker(startPoint,{icon:startPointIcon})
    this.map.addOverlay(bikeMarkerStart);
    let endPointIcon = new BMap.Icon('/assets/end_point.png',new BMap.Size(36,42),{
      imageSize:new BMap.Size(36,42),
      anchor:new BMap.Size(18,42)
    });
    let bikeMarkerEnd = new BMap.Marker(endPoint,{icon:endPointIcon})
    this.map.addOverlay(bikeMarkerEnd);

    // 绘制车辆行驶路线
    let routeList=list.map(item=>{
      let p = item.split(',');
      return new BMap.Point(p[0],p[1])
    })
    let polyLine = new BMap.Polyline(routeList,{
      strokeColor:"#ef4136",
      strokeWeight:2,
      strokeOpacity:1
    });
    this.map.addOverlay(polyLine);

    //绘制服务区
    let serviceList = res.service_list;
    let servicePointList = serviceList.map(item=>{
      return new BMap.Point(item.lon,item.lat);
    })
    let polyServiceLine = new BMap.Polyline(servicePointList,{
      strokeColor:"#ef4136",
      strokeWeight:3,
      strokeOpacity:1,
      
    }); 
    this.map.addOverlay(polyServiceLine);

    //绘制车辆分布
    let bikeList = res.bike_list;
    
    let bikeIcon = new BMap.Icon('/assets/bike.jpg',new BMap.Size(36,42),{
      imageSize:new BMap.Size(36,42),
      anchor:new BMap.Size(18,42)
    })
    bikeList.forEach(item=>{
      let p = item.split(',');
      let point = new BMap.Point(p[0],p[1]);
      let bikeMarker = new BMap.Marker(point,{icon:bikeIcon});
      this.map.addOverlay(bikeMarker);
    })
  }
  render(){
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit = {this.handleFilterSubmit}/>
        </Card>
        <Card>
          <div>共{this.state.total}辆车</div>
          <div id="container" style={{height:500}}></div>
        </Card>
      </div>
    )
  }
}