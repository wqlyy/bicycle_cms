import React from 'react';
import {Card,Table} from 'antd';

export default class BaseTable extends React.Component{
  componentWillMount(){
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
    this.setState({
      dataSource
    })
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
        dataIndex:'sex'
      },
      {
        title:'状态',
        dataIndex:'status'
      },
      {
        title:'爱好',
        dataIndex:'interest'
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
    return (
      <div>
        <Card title="基础表格" className="card-wrap">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource}
          />
        </Card>
      </div>
    )
  }
}