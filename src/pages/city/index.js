import React from 'react';
import {Card, Button, Table, Form, Select, Modal, message} from 'antd';
import Request from '../../utils/request'
import {USE_BIKE_MODE, OP_MODE} from '../../config/dict'
import BaseFilter from '../../components/BaseForm';

export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false
    }
  }
  params = {
    page: 1
  };
  handleFilter = (params) =>{
    this.params = params;
    this.getList();
  };
  componentDidMount() {
    this.getList();
  }

  //获取接口数据
  getList = () => {
    Request.getList(this, '/open_city', this.params)
  }
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  handleOpenCitySubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    Request.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then(res => {
      message.success(res);
      this.setState({
        isShowOpenCity: false
      })
      this.getList()
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return USE_BIKE_MODE[mode]
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(mode) {
          return OP_MODE[mode]
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render: (arr) => {
          return arr.map(item => {
            return item.user_name;
          }).join(',')
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time'
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ];
    const formList = [
      {
        type: 'SELECT',
        label: "城市",
        field: 'city',
        placeholder: "全部",
        initialValue: "",
        width: 100,
        list: [
          {
            id: '',
            name: "全部"
          },
          {
            id: "1",
            name: "北京"
          },
          {
            id: "2",
            name: "天津"
          },
          {
            id: "3",
            name: "上海"
          }
        ]
      },
      {
        type: 'SELECT',
        label: "用车模式",
        field: 'mode',
        placeholder: "全部",
        initialValue: "",
        width: 120,
        list: [{
          id: '',
          name: "全部"
        },
          {
            id: "1",
            name: "指定停车点模式"
          },
          {
            id: "2",
            name: "禁停区模式"
          }]
      },
      {
        type: 'SELECT',
        label: "营运模式",
        field: 'op_mode',
        placeholder: "全部",
        initialValue: "",
        width: 80,
        list: [{
          id: '',
          name: "全部"
        },
          {
            id: "1",
            name: "自营"
          },
          {
            id: "2",
            name: "加盟"
          }]
      },
      {
        type: 'SELECT',
        label: "加盟商授权状态",
        field: 'auth_status',
        placeholder: "全部",
        initialValue: "",
        width: 100,
        list: [{
          id: '',
          name: "全部"
        },
          {
            id: "1",
            name: "已授权"
          },
          {
            id: "2",
            name: "未授权"
          }]
      }
    ];
    return (
      <div>
        <Card>
          <BaseFilter filterSubmit={this.handleFilter} formList={formList}/>

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
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleOpenCitySubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst) => {
            this.cityForm = inst;
          }}/>
        </Modal>
      </div>
    )
  }
}

class OpenCityForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const {getFieldDecorator} = this.props.form;
    return (
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 150}}>
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
              <Select style={{width: 150}}>
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
              <Select style={{width: 150}}>
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