import React from 'react';
import {Form,Input,Radio,Tree,Transfer} from "antd";
import MenuList from '../../config/menuConfig'

const {TreeNode} = Tree;

const formItemLayout={
  labelCol:{span:5},
  wrapperCol:{span:19}
};

class RoleForm extends React.Component{
  render(){

    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="horizontal" >
        <Form.Item label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input type='text' placeholder="请输入角色名称"/>
            )
          }
        </Form.Item>
        <Form.Item label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status',{
              initialValue:'1'
            })(
              <Radio.Group>
                <Radio value="1">启用</Radio>
                <Radio value="0">禁用</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Tree>

        </Tree>
      </Form>
    )
  }
}

class PermissionForm extends React.Component{
  renderTreeNodes = (data) => {
    return data.map((item)=>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      }
      return <TreeNode title={item.title} key={item.key}/>
    })
  };
  onChecked=(checkedKeys)=>{
    this.props.patchMenuInfo(checkedKeys);
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {detailInfo} = this.props;
    return(
      <Form layout='horizontal'>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name}/>
        </Form.Item>
        <Form.Item label="启用状态" {...formItemLayout}>
          {
            getFieldDecorator('status',{
              initialValue:`${detailInfo.status}`
            })(
              <Radio.Group>
                <Radio value='1'>启用</Radio>
                <Radio value='0'>禁用</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys)=>{
            this.onChecked(checkedKeys)
          }}
          checkedKeys={detailInfo.menus}
        >
          <TreeNode title="平台权限">
            {this.renderTreeNodes(MenuList)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

class RoleAuthForm extends React.Component{
 
  onChecked=(checkedKeys)=>{
    this.props.patchMenuInfo(checkedKeys);
  }
  filterOption=(inputValue,option)=>{
    return option.title.indexOf(inputValue)>-1;
  }
  handleChange=(targetKeys)=>{
    this.props.patchUserInfo(targetKeys)
  }
  render(){
    const {detailInfo} = this.props;
    return(
      <Form layout='horizontal'>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name}/>
        </Form.Item>
        <Form.Item label="选择用户" {...formItemLayout}>
          <Transfer
            listStyle={{height:400}}
            dataSource={this.props.mockData}
            targetKeys={this.props.targetKeys}
            title={['待选用户','已选用户']}
            showSearch
            filterOption={this.filterOption}
            render={item => item.title}
            onChange={this.handleChange}
          />
        </Form.Item>
      </Form>
    )
  }
}


RoleForm = Form.create()(RoleForm);
PermissionForm = Form.create()(PermissionForm);
RoleAuthForm = Form.create()(RoleAuthForm);
export {RoleForm,PermissionForm,RoleAuthForm}