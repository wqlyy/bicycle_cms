import React from 'react';
import {Card,Button,Table,Form, Select, DatePicker,Modal,message} from 'antd';
import Ajax from '../../utils'
import Utils from '../../utils/utils'

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
  componentDidMount(){
    this.getList()
  }
  getList=()=>{
    Ajax({
      url:'/order/list',
      data:{
        params:this.params
      }
    }).then(res=>{

      this.setState({
        list:res.list.map((item,index)=>{
          item.key=index;
          return item;
        }),
        pagination:Utils.paginations(res,(current)=>{
          this.params.page = current
            
          this.getList()
        })
      })
    })
  }
  handleFilter = (params)=>{
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
    Ajax({
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
    Ajax({
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
          <FilterForm wrappedComponentRef={(inst)=>{
            this.filterForm = inst;
          }}/>
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



class FilterForm extends React.Component{
  onChange=(value, dateString) =>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  onOk = (value)=> {
    console.log('onOk: ', value);
  }
  handleSubmit=(e)=>{
    e.preventDefault();

    let formValue = this.props.form.getFieldsValue();
    console.log(formValue)
    // console.log(formValue.order_date[0].format('YYYY-MM-DD HH:mm:ss'))
    
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city_id',{
              initialValue:"0"
            })(
              <Select
                style={{width:100}}
                placeholder="全部"
              >
                <Select.Option value="0">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
                <Select.Option value="3">深圳市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="订单时间">
          {
            getFieldDecorator('order_date')(<DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['开始时间', '结束时间']}
              // onChange={this.onChange}
              // onOk={this.onOk}
            />)
          }
        </Form.Item>
        <Form.Item label="订单状态">
          {
            getFieldDecorator('start_time',{
              initialValue:"0"
            })(
              <Select
              style={{width:100}}
              placeholder="全部"
            >
              <Select.Option value="0">全部</Select.Option>
              <Select.Option value="1">进行中</Select.Option>
              <Select.Option value="2">进行中（临时锁车）</Select.Option>
              <Select.Option value="3">行程结束</Select.Option>
            </Select>
            )
          }
        
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleSubmit} type="primary" style={{margin:"0 10px"}}>查询</Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
FilterForm = Form.create()(FilterForm)