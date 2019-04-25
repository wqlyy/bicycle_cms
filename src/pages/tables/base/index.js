import React from 'react';
import {Card,Table, Modal,Button, message} from 'antd';
import Ajax from '../../../utils'
import {SEX,INTEREST,STATUS} from '../../../config/dict'

export default class BaseTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataSource:[],
      dataSource1:[]
    }
  }
  componentDidMount(){
    const dataSource = [
      {
        id:'1',
        userName:'Jack1',
        password:'123',
        sex:'1',
        status:'1',
        interest:'跑步1',
        birthday:'2008-08-08',
        address:'四川省成都市',
        time:'09:09:09'
      },
      {
        id:'2',
        userName:'Jack2',
        sex:'1',
        status:'1',
        interest:'跑步11',
        birthday:'2008-08-08',
        address:'四川省成都市',
        time:'09:09:09'
      },
      {
        id:'3',
        userName:'Jack3',
        sex:'1',
        status:'1',
        interest:'跑步113',
        birthday:'2008-08-08',
        address:'四川省成都市',
        time:'09:09:09'
      }
    ];
    dataSource.map((item,index)=>{
      return item.key = index;
    })
    this.setState({
      dataSource
    })
    this.getTableList();
  }
  getTableList=()=>{
    Ajax({
      url:'/table/list',
      data:{
        isShowLoading:true
      }
    }).then(res=>{
      res.result.list.map((item,index)=>{
        return item.key = index;
      })
      this.setState({
        dataSource2:res.result.list,
        
      })
    })
  }
  onRowClick=(record,index)=>{
    let selectedKey = [index];
    this.setState({
      selectedRowKeys:selectedKey,
      selectedItem:record
    })
    Modal.info({
      title:'信息',
      content:`用户名：${record.userName}，用户爱好：${INTEREST[record.interest]}`
    })
  }
  //多选删除
  deleteRow=()=>{
    let rows = this.state.selectedRows;
    let ids=[];
    rows.forEach((item)=>{
      ids.push(item.id);
    })
    Modal.confirm({
      title:'删除提示',
      content:`您确定要删除这些数据吗？${ids.join(',')}`,
      onOk:()=>{
        message.success('删除成功')
      }
    })
    console.log(rows)
  }
  render(){
    const columns=[
      {
        title:'ID',
        dataIndex:'id'
      },
      {
        title:'用户名',
        dataIndex:'userName'
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
    const rowSelection={
      type:'radio',
      selectedRowKeys:this.state.selectedRowKeys
    }
    const rowCheckedSelection={
      type:'checkbox',
      selectedRowKeys:this.state.selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{
        this.setState({
          selectedRowKeys,
          selectedRows

        })
      }
    }
    return (
      <div>
        <Card title="基础表格" className="card-wrap">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource}
          />
        </Card>
        <Card title="动态数据渲染表格" className="card-wrap">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="Mock-单选" className="card-wrap">
          <Table
            columns={columns}
            rowSelection={rowSelection}
            onRow={(record,index)=>{
              return {
                onClick:()=>{
                  this.onRowClick(record,index);
                }
              }
            }}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="Mock-多选" className="card-wrap">
        <div>
          <Button onClick={this.deleteRow} type="primary">删除</Button>
        </div>
          <Table
            columns={columns}
            rowSelection={rowCheckedSelection}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
      </div>
    )
  }
}