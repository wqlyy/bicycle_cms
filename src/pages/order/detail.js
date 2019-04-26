import React,{Component} from 'react';
import {Card} from 'antd';
import Request from '../../utils/request'

import './detail.less'

export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  componentDidMount(){
    let orderId = this.props.match.params.orderId;
    console.log(orderId)
    this.getDetailInfo(orderId);
  }
  getDetailInfo=orderId=>{
    Request.ajax({
      url:'/order/detail',
      data:{
        params:{
          orderId:orderId
        }
      }
    }).then(result=>{
      this.setState(()=>{
        return {
          orderInfo:result
        }
      })
      this.renderMap(result)
    })
  }
  //绘制用户行驶路线
  drawBikeRoute = (positionList) =>{
    console.log(positionList)
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if(positionList.length>0){
      startPoint = new window.BMap.Point(positionList[0].lon, positionList[0].lat);
      let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
        imageSize:new window.BMap.Size(36,42),
        anchor:new window.BMap.Size(36,42)
      })
      let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
      map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(positionList[positionList.length-1].lon,positionList[positionList.length-1].lat);
      let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
        imageSize:new window.BMap.Size(36,42),
        anchor:new window.BMap.Size(36,42)
      })
      let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
      map.addOverlay(endMarker);

      //连接路线图
      let trackPoint = [];
      positionList.forEach((item)=>{
        trackPoint.push(new window.BMap.Point(item.lon,item.lat));
      })
     let polyline = new window.BMap.Polyline(trackPoint,{
        strokeColor:'#1869ad',
        strokeWeight:3,
        strokeOpacity:1
      })
      map.addOverlay(polyline);
      map.centerAndZoom(endPoint, 11); 
    }
    
  }
  //绘制服务区域
  drawServiceArea=(areaList)=>{
    let trackPoint = [];
    areaList.forEach((item)=>{
      trackPoint.push(new window.BMap.Point(item.lon,item.lat));
    })
    let polygon = new window.BMap.Polygon(trackPoint,{
      strokeColor:'#ce0000',
      strokeWeight:4,
      strokeOpacity:1,
      fillColor:'#ff8605',
      fillOpacity:0.4
    })
    this.map.addOverlay(polygon);
  }
  renderMap=(result)=>{
    this.map = new window.BMap.Map('orderDetailMap',{enableMapClick:false});
    this.map.centerAndZoom('北京', 11);    
    this.addMapControl();//添加地图控件
    this.drawBikeRoute(result.position_list)//绘制用户行驶路线
    this.drawServiceArea(result.area)//绘制服务区域
  }
  //添加地图控件
  addMapControl=()=>{
    let map = this.map;
   
    map.addControl(new  window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    map.addControl(new  window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
  }
  render(){
    const info = this.state.orderInfo||{};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{info.mode===1?"服务区":"停车点"}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>

          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{info.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}