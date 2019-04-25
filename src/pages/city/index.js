import React from 'react';
import { Card, Button,Table,Form,Select ,Modal, message} from 'antd';
import Ajax from '../../utils'
import Utils from '../../utils/utils'
import {USE_BIKE_MODE,OP_MODE} from '../../config/dict' 

export default class City extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      listQuery:{
        page:1
      },
      isShowOpenCity:false
    }
  }
  componentDidMount(){
    this.getList();
  }
  //获取接口数据
  getList = ()=>{
    Ajax({
      url:'/open_city',
      data:{
        params:{
          page:this.state.listQuery.page
        }
      }
    }).then(res=>{
      
      res.list.forEach((item,index)=>{
        item.key=index
      })
      this.setState(()=>{
        return {
          list:res.list,
          pagination:Utils.paginations(res,(current)=>{
            this.setState({
              listQuery:{
                page:current
              }
            })
            this.getList()
          })
        }
      })
    })
  }
  handleOpenCity = ()=>{
    this.setState({
      isShowOpenCity:true
    })
  }
  handleOpenCitySubmit=()=>{
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log(cityInfo)
    Ajax({
      url:'/city/open',
      data:{
        params:cityInfo
      }
    }).then(res=>{
      message.success(res);
      this.setState({
        isShowOpenCity:false
      })
      this.getList()
    })
  }
  render(){
    const columns = [
      {
        title:'城市ID',
        dataIndex:'id'
      },
      {
        title:'城市名称',
        dataIndex:'name'
      },
      {
        title:'用车模式',
        dataIndex:'mode',
        render(mode){
          return USE_BIKE_MODE[mode]
        }
      },
      {
        title:'营运模式',
        dataIndex:'op_mode',
        render(mode){
          return OP_MODE[mode]
        }
      },
      {
        title:'授权加盟商',
        dataIndex:'franchisee_name'
      },
      {
        title:'城市管理员',
        dataIndex:'city_admins',
        render:(arr)=>{
          return arr.map(item=>{
            return item.user_name;
          }).join(',')
        }
      },
      {
        title:'城市开通时间',
        dataIndex:'open_time'
      },
      {
        title:'操作时间',
        dataIndex:'update_time'
      },
      {
        title:'操作人',
        dataIndex:'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card>
          <Button onClick={this.handleOpenCity} type="primary">开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={()=>{
            this.setState({
              isShowOpenCity:false
            })
          }}
          onOk={this.handleOpenCitySubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst)=>{
            this.cityForm = inst;
          }}/>
        </Modal>
      </div>
    )
  }
}

class FilterForm extends React.Component{

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
            <Form.Item label="城市">
                {
                    getFieldDecorator('city_id')(
                        <Select
                            style={{width:100}}
                            placeholder="全部"
                        >
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">北京市</Select.Option>
                            <Select.Option value="2">天津市</Select.Option>
                            <Select.Option value="3">深圳市</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item label="用车模式">
                {
                    getFieldDecorator('mode')(
                        <Select
                            style={{ width: 120 }}
                            placeholder="全部"
                        >
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">指定停车点模式</Select.Option>
                            <Select.Option value="2">禁停区模式</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item label="营运模式">
                {
                    getFieldDecorator('op_mode')(
                        <Select
                            style={{ width: 80 }}
                            placeholder="全部"
                        >
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">自营</Select.Option>
                            <Select.Option value="2">加盟</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item label="加盟商授权状态">
                {
                    getFieldDecorator('auth_status')(
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">已授权</Select.Option>
                            <Select.Option value="2">未授权</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" style={{margin:'0 10px'}}>查询</Button>
                <Button>重置</Button>
            </Form.Item>
        </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component{
  render(){
    const formItemLayout = {
      labelCol:{
        span:5
      },
      wrapperCol:{
        span:19
      }
    }
    const { getFieldDecorator }  =this.props.form;
    return (
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id',{
              initialValue:'1'
            })(
              <Select style={{ width: 150 }}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="营运模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Select style={{ width: 150 }}>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...formItemLayout}>
            {
              getFieldDecorator('use_mode', {
                initialValue: '1'
              })(
                <Select style={{ width: 150 }}>
                  <Select.Option value="1">指定停车点</Select.Option>
                  <Select.Option value="2">禁停区</Select.Option>
                </Select>
              )
            }
          </Form.Item>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm);