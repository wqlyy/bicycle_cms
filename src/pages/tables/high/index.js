import React from 'react';
import {Card,Table, Modal,Button, message} from 'antd';
import Request from '../../../utils/request'
import Utils from '../../../utils/utils'
import {SEX,INTEREST,STATUS} from '../../../config/dict'

export default class BaseTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataSource:[],
      selectedRowKeys:[],
      selectedItem:null
    }
  }
  params={
    page:1
  }
  componentDidMount(){
    this.getTableList()
  }
  getTableList=()=>{
    let _this = this;
    Request.ajax({
      url:'/table/high/list',
      data:{
        isShowLoading:true,
        params:{
          page:this.params.page
        }
      }
    }).then(res=>{
      res.list.map((item,index)=>{
        return item.key = index;
      })
      this.setState({
        dataSource:res.list,
        pagination:Utils.paginations(res,(current)=>{
          _this.params.page = current;
          this.getTableList();
        })
        
      })
    })
  }
  handleChange=(pagination,filters,sorter)=>{
    this.setState({
      sortOrder:sorter.order
    })
  }
  render(){
    const columns1=[
      {
        title:'ID',
        width:60,
        dataIndex:'id',
        fixed:'left'
      },
      {
        title:'用户名',
        width:80,
        dataIndex:'userName',
        fixed:'left'
      },
      {
        title:'年龄',
        width:60,
        dataIndex:'age',
      },
      {
        title:'性别',
        width:60,
        dataIndex:'sex',
        render(sex){
          return SEX[sex];
        }
      },
      {
        title:'状态',
        width:120,
        dataIndex:'status',
        render(status){
          return STATUS[status];
        }
      },
      {
        title:'爱好',
        width:100,
        dataIndex:'interest',
        render(interest){
          return INTEREST[interest];
        }
      },
      {
        title:'生日',
        width:110,
        dataIndex:'birthday'
      },
      {
        title:'地址',
        dataIndex:'address'
      },
      {
        title:'早起时间',
        width:90,
        dataIndex:'time',
        fixed:'right'
      }
    ]
    const columns2=[
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'用户名',
        dataIndex:'userName'
      },
      {
        title:'年龄',
        dataIndex:'age',
        sorter:(a,b)=>{
          return a.id - b.id;
        },
        sortOrder:this.state.sortOrder
      },
      {
        title:'性别',
        dataIndex:'sex',
        render(sex){
          return SEX[sex];
        }
      },
      {
        title:'状态',
        dataIndex:'status',
        render(status){
          return STATUS[status];
        }
      },
      {
        title:'爱好',
        dataIndex:'interest',
        render(interest){
          return INTEREST[interest];
        }
      },
      {
        title:'生日',
        dataIndex:'birthday'
      },
      {
        title:'地址',
        dataIndex:'address'
      },
      {
        title:'早起时间',
        dataIndex:'time'
      }
    ]
    const columns3=[
      {
        title:'ID',
        dataIndex:'id',
      },
      {
        title:'用户名',
        dataIndex:'userName'
      },
      {
        title:'年龄',
        dataIndex:'age',
      },
      {
        title:'性别',
        dataIndex:'sex',
        render(sex){
          return SEX[sex];
        }
      },
      {
        title:'状态',
        dataIndex:'status',
        render(status){
          return STATUS[status];
        }
      },
      {
        title:'爱好',
        dataIndex:'interest',
        render(interest){
          return INTEREST[interest];
        }
      },
      {
        title:'生日',
        dataIndex:'birthday'
      },
      {
        title:'地址',
        dataIndex:'address'
      },
      {
        title:'早起时间',
        dataIndex:'time'
      },
      {
        title:'操作',
        render:(text,item)=>{
          
          return (
            <Button size='small' onClick={()=>{this.handleDelete(item)}}>删除</Button>
          )
        }
      }
    ]
    return (
      <div>
        <Card title="头部固定" className="card-wrap">
          <Table
            columns={columns1}
            bordered
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            scroll={{y:240}}
          />
        </Card>
        <Card title="左侧固定" className="card-wrap">
          <Table
            columns={columns1}
            bordered
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            scroll={{x:2240}}
          />
        </Card>
        <Card title="表格排序" className="card-wrap">
          <Table
            columns={columns2}
            bordered
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            scroll={{x:240}}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" className="card-wrap">
          <Table
            columns={columns3}
            bordered
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </Card>
       </div>
    )
  }
  handleDelete = (item) => {
    Modal.confirm({
      title:'提示',
      content:`确认删除ID为 [--${item.id}--] ,用户名为 [--${item.userName}--] 的数据？`,
      onOk:()=>{
        this.getTableList();
        message.success('删除成功')
      }
    })
    console.log(item)
  }
}