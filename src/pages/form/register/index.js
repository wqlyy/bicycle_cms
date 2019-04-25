import React from 'react';
import {
  Card,Form,Input,
  Button,
   Radio, InputNumber,Upload,
   Select, Switch, DatePicker,TimePicker, Icon, Checkbox
  } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class Register extends React.Component{
  state={}
  handleSubmit=()=>{
    let formInfo = this.props.form.getFieldsValue();
    console.log(formInfo)
  }
  handleReset=()=>{
    console.log(this.props.form);
    this.props.form.resetFields();
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{
        xs:24,
        sm:4
      },
      wrapperCol:{
        xs:24,
        sm:12
      }
    }
    const offsetlayout={
      wrapperCol:{
        xs:24,
        sm:{
          span:12,
          offset:4
        }
      }
      
    }
    return (
      <div>
        <Card title="注册表单" className="card-wrap">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName',{
                  initialValue:'',
                  rules:[
                    {
                      required:true,
                      message:'用户名不能为空'
                    }
                  ]
                })(<Input placeholder="请输入用户名"/>)
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password',{
                  initialValue:'',
                  rules:[
                    {
                      required:true,
                      message:'密码不能为空'
                    }
                  ]
                })(<Input type="password" placeholder="请输入密码"/>)
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex',{
                  initialValue:'1',
                  rules:[]
                })(
                <Radio.Group>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age',{
                  initialValue:'18',
                  rules:[]
                })(<InputNumber/>)
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('status',{
                  initialValue:'1',
                  rules:[]
                })(
                  <Select>
                    <Select.Option value="1">选项一</Select.Option>
                    <Select.Option value="2">选项二</Select.Option>
                    <Select.Option value="3">选项三</Select.Option>
                    <Select.Option value="4">选项四</Select.Option>
                    <Select.Option value="5">选项五</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest',{
                  initialValue:['1','2'],
                  rules:[]
                })(
                  <Select mode="multiple">
                    <Select.Option value="1">游泳</Select.Option>
                    <Select.Option value="2">打篮球</Select.Option>
                    <Select.Option value="3">踢足球</Select.Option>
                    <Select.Option value="4">跑步</Select.Option>
                    <Select.Option value="5">爬山</Select.Option>
                    <Select.Option value="6">骑行</Select.Option>
                    <Select.Option value="7">麦霸</Select.Option>
                    <Select.Option value="8">桌球</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarray',{
                  valuePropName:'checked',
                  initialValue:true,
                  rules:[]
                })(<Switch/>)
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday',{
                  initialValue:moment('2019-04-23 12:03:55'),
                  rules:[]
                })(<DatePicker 
                  showTime
                  format='YYYY-MM-DD HH:mm:ss'
                />)
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address',{
                  initialValue:'四川省成都市',
                  rules:[]
                })(<Input.TextArea
                  autosize={{minRows:4,maxRows:6}}
                />)
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time',{
        
                })(
                  <TimePicker/>
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg',{
                  initialValue:'',
                  rules:[]
                })(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    name='file'
                  >
                  {this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type='plus'/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetlayout}>
              {
                getFieldDecorator('xieyi',{
                  initialValue:'',
                  rules:[]
                })(
                  <Checkbox>我已经阅读过<a href="/">慕课协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetlayout}>
              <Button onClick={this.handleSubmit} type="primary">注册</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(Register)