import React from 'react'
import {Card,Button,Modal} from 'antd'

import '../ui.less'

export default class Modals extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModal1:false,
      showModal2:false,
      showModal3:false,
      showModal4:false
    }
  }
  render(){
    return(
      <div>
        <Card title="基础模态框" className="card-wrap">
          <Button onClick={()=>this.handleOpen('showModal1')} type="primary">打开</Button>
          <Button onClick={()=>this.handleOpen('showModal2')} type="primary">自定义页脚</Button>
          <Button onClick={()=>this.handleOpen('showModal3')} type="primary">距离顶部20px</Button>
          <Button onClick={()=>this.handleOpen('showModal4')} type="primary">水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" className="card-wrap">
          <Button onClick={()=>this.handleConfirm('confirm')} type="primary">Confirm</Button>
          <Button onClick={()=>this.handleConfirm('info')} type="primary">Info</Button>
          <Button onClick={()=>this.handleConfirm('success')} type="primary">Success</Button>
          <Button onClick={()=>this.handleConfirm('warning')} type="primary">Warning</Button>
          <Button onClick={()=>this.handleConfirm('error')} type="primary">Error</Button>
        </Card>
        <Modal
          title="默认弹出框"
          visible={this.state.showModal1}
          onCancel={()=>{
            this.setState({
              showModal1:false
            })
          }}
        >
          <p>内容区域</p>
        </Modal>
        <Modal
          title="自定义页脚"
          okText="好的"
          cancelText="算了"
          visible={this.state.showModal2}
          onCancel={()=>{
            this.setState({
              showModal2:false
            })
          }}
        >
          <p>弹框</p>
        </Modal>
        <Modal
          title="距离顶部20px"
          okText="好的"
          style={{top:20}}
          cancelText="算了"
          visible={this.state.showModal3}
          onCancel={()=>{
            this.setState({
              showModal3:false
            })
          }}
        >
          <p>内容区域</p>
        </Modal>
        <Modal
          title="水平垂直居中"
          wrapClassName="vertical-center-modal"
          okText="好的"
          style={{top:20}}
          cancelText="算了"
          visible={this.state.showModal4}
          onCancel={()=>{
            this.setState({
              showModal4:false
            })
          }}
        >
          <p>内容区域</p>
        </Modal>
      </div>
    )
  }
  handleOpen=(type)=>{
    this.setState({
      [type]:true
    })
  }
  handleConfirm=(type)=>{
    Modal[type]({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    })
  }
}