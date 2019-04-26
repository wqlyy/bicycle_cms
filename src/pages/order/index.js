import React from 'react';
import {Card,Button,Table,Form, Select, DatePicker} from 'antd';
import Ajax from '../../utils'
import Utils from '../../utils/utils'

export default class Order extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listQuery:{
        page:1
      }
    }
  }
  componentDidMount(){
    this.getList()
  }
  getList=()=>{
    Ajax({
      url:'/order/list',
      data:{
        params:{
          page:this.state.listQuery.page
        }
      }
    }).then(res=>{

      this.setState({
        list:res.list.map((item,index)=>{
          item.key=index;
          return item;
        }),
        pagination:Utils.paginations(res,(current)=>{
          this.setState({
            listQuery:{
              page:current
            }
          })
          this.getList()
        })
      })
    })
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
    return (
      <div>
        <Card>
          <FilterForm wrappedComponentRef={(inst)=>{
            this.filterForm = inst;
          }}/>
        </Card>
        <Card>
          <Button>订单详情</Button>
          <Button>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
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
    console.log(this.props.form)
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