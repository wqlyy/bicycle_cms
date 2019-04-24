import React from 'react';
import {Card,Form,Input,Button,message, Icon, Checkbox} from 'antd';

class Login extends React.Component{
  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <Form.Item>
              {
                getFieldDecorator('userName',{
                  initialValue:'',
                  rules:[
                    {
                      required:true,
                      message:'用户名不能为空'
                    },
                    {
                      min:5,max:10,
                      message:'长度不在范围内'
                    },
                    {
                      pattern:/^\w+$/g,
                      message:'用户名必须为字母或者数字'
                    }
                  ]
                })(<Input prefix={<Icon type='user'/>} placeholder="请输入用户名"/>)
              }
              
            </Form.Item>
            <Form.Item>
            {
              getFieldDecorator('userPwd',{
                initialValue:'',
                rules:[]
              })( <Input prefix={<Icon type='lock'/>} type="password" placeholder="请输入密码"/>)
            }
             
            </Form.Item>
            <Form.Item>
            {
              getFieldDecorator('remember',{
                valuePropName:'checked',
                initialValue:true,
                rules:[]
              })( <Checkbox>记住密码</Checkbox>)
            }
            <a href="/">忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button onClick={this.handleSubmit} type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单">
          <Form style={{width:300}} layout="horizontal">
              <Form.Item>
                {
                  getFieldDecorator('name',{
                    initialValue:'',
                    rules:[
                      {
                        required:true,
                        message:'用户名不能为空'
                      }
                    ]
                  })(<Input prefix={<Icon type='user'/>} placeholder="请输入用户名"/>)
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('password',{
                    initialValue:'',
                    rules:[]
                  })(<Input prefix={<Icon type='lock'/>} placeholder="请输入密码"/>)
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('member',{
                    valuePropName:'checked',
                    initialValue:true,
                    rules:[]
                  })(<Checkbox>记住密码</Checkbox>)
                }
                <a href="/" style={{float:"right"}}>忘记密码</a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit1}>登录</Button>
              </Form.Item>
            </Form>
        </Card>
      </div>
    )
  }
  handleSubmit=()=>{
    console.log(this.props.form)
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,value)=>{
      if(!err){
        message.success(`${userInfo.userName}恭喜你通过本次校验，密码为${userInfo.userPwd}`)
      }
    })
  }
  handleSubmit1=()=>{
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,value)=>{
      if(!err){
        message.success(`${userInfo.name}恭喜你通过本次校验，密码为${userInfo.password}`)
      }
    })
  }
}
export default Form.create()(Login);