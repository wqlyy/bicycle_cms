import React from 'react';
import {Card,Button,Table,Form,Modal,message} from 'antd';
import Request from '../../utils/request'
import BaseFilter from '../../components/BaseForm'


export default class Order extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys:[],
      orderInfo:{},
      orderConfirmVisble:false
    }
  }
  params = {
      page: 1
  }
  formList = [{
      type:'SELECT',
      label:"城市",
      field:'city',
      placeholder:"全部",
      initialValue:"",
      width:100,
      list:[
        {
          id:'',
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
      type:'时间查询',
      label:"订单时间",
      field:"order_date"
    },
    {
      type:'SELECT',
      label:"订单状态",
      field:'status',
      placeholder:"全部",
      initialValue:"",
      width:100,
      list:[
        {
          id:'',
          name:"全部"
        },
        {
          id:"1",
          name:"进行中"
        },
        {
          id:"2",
          name:"结束行程"
        }
      ]
    }
  ]
  componentDidMount(){
    this.getList()
  }
  getList=()=>{
    Request.getList(this,'/order/list',this.params)
  }
  handleFilter = (params)=>{
    let start_time="",end_time="";
    if(params.order_date){
      start_time = params.order_date[0].format('YYYY-MM-DD HH:mm:ss');
      end_time = params.order_date[1].format('YYYY-MM-DD HH:mm:ss')
    }
    params.start_time = start_time;
    params.end_time = end_time;
    this.params = params;
    this.getList();
  }
   // 订单结束确认
   handleConfirm = ()=>{
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return;
    }
    Request.ajax({
      url:'/order/ebike_info',
      data:{
        params:{
          orderId: item.id
        }
      }
    }).then((result)=>{
      this.setState({
        orderInfo:result,
        orderConfirmVisble: true
      })
    })
  }

  // 结束订单
  handleFinishOrder = ()=>{
    let item = this.state.selectedItem;
    Request.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      message.success(res)
      this.setState({
        orderConfirmVisble: false,
        selectedRowKeys:[],
        selectedItem:null
      })
      this.getList();
    })
  }
  selectRow = (record,index) => {
    console.log(index)
    const selectedRowKeys = [index];
    this.setState({ selectedRowKeys, selectedItem:record[0]});
  }
  onSelectedRowKeysChange = (selectedRowKeys,record) => {
    this.setState({ selectedRowKeys, selectedItem:record[0]});
  }
  openOrderDetail=()=>{
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      })
      return;
    }
   window.open(`/#/common/order/detail/${item.id}`,'_blank')
  }
  render(){
    const columns = [
      {
        title:'订单编号',
        dataIndex:"order_sn"
      },
      {
        title:'车辆编号',
        dataIndex:"bike_sn"
      },
      {
        title:'用户名',
        dataIndex:"user_name"
      },
      {
        title:'手机号',
        dataIndex:"mobile"
      },
      {
        title:'里程',
        dataIndex:"distance",
        render(dis){
          return `${dis/1000}km`
        }
      },
      {
        title:'行驶时长',
        dataIndex:"total_time"
      },
      {
        title:'状态',
        dataIndex:"status"
      },
      {
        title:'开始时间',
        dataIndex:"start_time"
      },
      {
        title:'结束时间',
        dataIndex:"end_time"
      },
      {
        title:'订单金额',
        dataIndex:"total_fee"
      },
      {
        title:'实付金额',
        dataIndex:"user_pay"
      },
    ]
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:19}
    }
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };
    return (
      <div>
        <Card>
          <BaseFilter filterSubmit={this.handleFilter} formList={this.formList}/>
          {/* <FilterForm wrappedComponentRef={(inst)=>{
            this.filterForm = inst;
          }}/> */}
        </Card>
        <Card>
          <Button onClick={this.openOrderDetail} type="primary">订单详情</Button>
          <Button onClick={this.handleConfirm} type="primary" style={{marginLeft:'15px'}}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record,index) => ({
              onClick: () => {
                this.selectRow(record,index);
              },
            })}
          />
        </div>
          <Modal
            title="结束订单"
            visible={this.state.orderConfirmVisble}
            onCancel={()=>{
                this.setState({
                    orderConfirmVisble:false
                })
            }}
            onOk={this.handleFinishOrder}
            width={600}
        >
            <Form layout="horizontal">
                <Form.Item label="车辆编号" {...formItemLayout}>
                    {this.state.orderInfo.bike_sn}
                </Form.Item>
                <Form.Item label="剩余电量" {...formItemLayout}>
                    {this.state.orderInfo.battery + '%'}
                </Form.Item>
                <Form.Item label="行程开始时间" {...formItemLayout}>
                    {this.state.orderInfo.start_time}
                </Form.Item>
                <Form.Item label="当前位置" {...formItemLayout}>
                    {this.state.orderInfo.location}
                </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}
