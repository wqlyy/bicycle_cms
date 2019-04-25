import React from 'react';
import { Card, Button,Table,Form,Select } from 'antd';
import Ajax from '../../utils'
import Utils from '../../utils/utils'

export default class City extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      listQuery:{
        page:1
      }
    }
  }
  componentDidMount(){
    this.getList();
  }
  //获取接口数据
  getList = ()=>{
    const _this = this;
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
  handleOpenCity = ()=>{}
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
        dataIndex:'mode'
      },
      {
        title:'营运模式',
        dataIndex:'op_mode'
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
          {/* <FilterForm></FilterForm> */}
        </Card>
        <Card>
          <Button onClick={this.handleOpenCity} type="primary"></Button>
        </Card>
        <div className="content-wrap">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    )
  }
}