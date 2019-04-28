import React from 'react';
import {Card,Button,Modal,message} from 'antd'
import moment from 'moment'
import ETable from '../../components/ETable'
import Request from '../../utils/request'
import Utils from '../../utils/utils'

import {RoleForm,PermissionForm,RoleAuthForm} from './permissionForm'

export default class Permission extends React.Component{
  state={
    isRoleVisible:false,
    isPermissionVisible:false,
    isAuthVisible:false
  }
  componentWillMount(){
    this.getList()
  }
  params={
    page:1
  }
  getList=()=>{
    Request.getList(this,'/role/list',this.params)
  }
  handleCreateRoleSubmit=()=>{
    let params = this.roleForm.props.form.getFieldsValue();
    Request.ajax({
      url:'/role/create',
      method:'post',
      data:{
        params
      }
    }).then(res=>{
      message.success(res);
      this.roleForm.props.form.resetFields();
      this.setState({
        isRoleVisible:false
      });
      this.getList()
    })

  };
  handleCreate=()=>{
    this.setState({
      isRoleVisible:true
    })
  }
  //角色权限设置
  handlePermission=()=>{
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:'提示',
        content:'请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermissionVisible:true,
      detailInfo:item
    });
  };
  //设置权限
  handlePerEditSubmit=()=>{
    let params = this.permissionForm.props.form.getFieldsValue();
    params.id = this.state.selectedItem.id;
    params.menus = this.state.detailInfo.menus;
    Request.ajax({
      url:'/permission/edit',
      method:'post',
      data:{params}
    }).then(res=>{
      message.success(res);
      this.setState({
        isPermissionVisible:false
      })
      this.getList()
    })
  }
  patchMenuInfo=(checkedKeys)=>{
    let detatil = this.state.detailInfo;
    detatil.menus = checkedKeys;
    this.setState({
      detailInfo:detatil
    })
  }
  //用户列表
  getRoleUserList = (id) =>{
    Request.ajax({
      url:"/role/user_list",
      data:{
        params:{id}
      }
    }).then(res=>{
      this.getAuthUserList(res);
    })
  };
  getAuthUserList=(dataSource)=>{
    let mockData=[];
    let targetKeys=[];
    if(dataSource&&dataSource.length>0){
      dataSource.forEach(item=>{
        let data={
          key:item.user_id,
          title:item.user_name,
          status:item.status
        };
        if(data.status===1){
          targetKeys.push(data.key) 
        }
        mockData.push(data)
      })
      this.setState({
        targetKeys,
        mockData
      })
    }
   
  }
  //用户授权
  handleUserAuth=()=>{
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:'提示',
        content:'请选择一个角色'
      })
      return;
    }
    this.setState({
      isAuthVisible:true,
      detailInfo:item
    });
    this.getRoleUserList(item.id)
  }
  handleUserRoleSubmit=()=>{
    let data={};
    data.user_ids = this.state.targetKeys;
    data.role_id=this.state.selectedItem.id;
    // 提交数据
    console.log(data);
  }
  render() {
    const columns=[
      {
        title:'角色ID',
        dataIndex:'id'
      },{
        title:'角色名称',
        dataIndex:'role_name'
      },{
        title:'创建时间',
        dataIndex:'create_time',
        render(time){
          return moment().format('YYYY-MM-DD HH:mm:ss')
        }
      },{
        title:'使用状态',
        dataIndex:'status',
        width:100,
        render(status){
          return status===1?'启用':'禁用'
        }
      },{
        title:'授权时间',
        dataIndex:'authorize_time',
        render(time){
          return moment().format('YYYY-MM-DD HH:mm:ss')
        }
      },{
        title:'授权人',
        dataIndex:'authorize_user_name'
      },
    ]
    return (
      <div>
        <Card>
          <Button onClick={this.handleCreate} type='primary'>创建角色</Button>
          <Button onClick={this.handlePermission} type='primary' style={{margin:'0 10px'}}>设置权限</Button>
          <Button onClick={this.handleUserAuth} type='primary'>用户授权</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleCreateRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible:false
            })
          }}
        >
          <RoleForm
            wrappedComponentRef={(inst)=>{
              this.roleForm = inst
            }}
          />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermissionVisible}
          onOk={this.handlePerEditSubmit}
          onCancel={()=>{
            this.permissionForm.props.form.resetFields();
            this.setState({
              isPermissionVisible:false
            })
          }}
        >
          <PermissionForm
            wrappedComponentRef={(inst)=>{
              this.permissionForm = inst
            }}
            patchMenuInfo={this.patchMenuInfo}
            detailInfo={this.state.detailInfo}
          />
        </Modal>

        <Modal
          title="用户权限"
          width={600}
          visible={this.state.isAuthVisible}
          onOk={this.handleUserRoleSubmit}
          onCancel={()=>{
            this.authForm.props.form.resetFields();
            this.setState({
              isAuthVisible:false
            })
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={(inst)=>{
              this.authForm = inst
            }}
            patchUserInfo={(targetKeys)=>{
              this.setState({
                targetKeys
              })
            }}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
          />
        </Modal>
      </div>
    )
  }
}

