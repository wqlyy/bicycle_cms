import React from 'react';
import {Card,Button, Modal, Form, Input, Radio, Select, DatePicker, message} from 'antd';
import Request from '../../utils/request';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
import {STATUS,SEX,INTEREST} from "../../config/dict"
import RadioGroup from 'antd/lib/radio/group';
import moment from 'moment'

export default class User extends React.Component{
  state={
    isVisible:false
  }
  formList=[
    {
      type:"INPUT",
      label:"用户名",
      field:"userName",
      placeholder:"请输入用户名",
      width:120
    },
    {
      type:"INPUT",
      label:"手机号",
      field:"user_mobile",
      placeholder:"请输入手机号",
      width:120
    }
  ]
  params={
    page:1
  }
  componentDidMount(){
    this.getList()
  }
  getList=()=>{
    Request.getList(this,'/user/list',this.params)
  }
  handleFilter=(params)=>{
    this.params = params;
    this.getList()
  }
  handleOperator=(type)=>{
    let item = this.state.selectedItem;
    if(type==='create'){
      this.setState({
        type,
        isVisible:true,
        title:'创建员工'
      })
    }else if(type==='edit'){
      if(!item){
        Modal.info({
          title:'提示',
          content:"请选择一个用户"
        })
        return;
      }
      console.log(item)
      this.setState({
        type,
        isVisible:true,
        title:'编辑员工',
        userInfo:item
      })
    }
  }
  handleSubmit=()=>{
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    Request.ajax({
      url:'/user/add',
      data:{
        params:data
      }
    }).then(res=>{
      this.userForm.props.form.resetFields();
      message.success(res);
      this.setState({
        isVisible:false,
        userInfo:null
      })
      this.getList()
    })
    
  }
  render(){
    const columns =[
      {
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: '用户名',
      dataIndex: 'userName'
    }, {
      title: '性别',
      dataIndex: 'sex',
      render(sex){
          return SEX[sex]
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      render(state){
          return STATUS[state];
      }
    },{
      title: '爱好',
      dataIndex: 'interest',
      render(interest){
          return INTEREST[interest];
      }
    },{
      title: '婚姻状况',
      dataIndex: 'isMarried',
      render(isMarried){
          return isMarried?'已婚':'未婚'
      }
    },{
      title: '生日',
      dataIndex: 'birthday'
    },{
      title: '联系地址',
      dataIndex: 'address'
    },{
      title: '早起时间',
      dataIndex: 'time'
    }]
    return (
      <div>
        <Card>
          <BaseForm filterSubmit={this.handleFilter} formList={this.formList}/>
        </Card>
        <Card className="operator-wrap">
          <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
          <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
          <Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
          <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          width={600}
          onCancel={()=>{
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible:false,
              userInfo:null
            })
          }}
        >
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            wrappedComponentRef={(inst)=>this.userForm = inst}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends React.Component{
  genOptions=(type)=>{
    let options = [];
    for(let key in type){
      options.push(<Select.Option key={key} value={key}>{type[key]}</Select.Option>)
    }
    return options;
  }
  render(){
    let type = this.props.type;
    let userInfo = this.props.userInfo || {};
    const {getFieldDecorator} = this.props.form;
    const formItemLayout={
      labelCol:{span:5},
      wrapperCol:{span:19}
    }
    return (
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="用户名">
          {
            getFieldDecorator('userName',{
              initialValue:userInfo.userName
            })(
              <Input type="text" placeholder="请输入用户名" />
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="性别">
          {
            getFieldDecorator('sex',{
              initialValue:userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="状态">
          {
            getFieldDecorator('status',{
              initialValue:`${userInfo.status?userInfo.status:"0"}`
            })(
              <Select placeholder="请选择状态">
                {
                  this.genOptions(STATUS)
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="生日">
          {
            getFieldDecorator('birthday',{
              initialValue:moment(userInfo.birthday)||null
            })(
              <DatePicker placeholder="请选择员工生日"/>
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="联系地址">
          {
            getFieldDecorator('address',{
              initialValue:userInfo.address
            })(
              <Input.TextArea
                rows={3}
                placeholder="请输入联系地址"
              />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

UserForm = Form.create()(UserForm)