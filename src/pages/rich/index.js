import React from 'react'
import {Card,Modal,Button} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html'

export default class Rich extends React.Component{
  state={
    showRichText:false,
    editorState:''
  }
  onEditorStateChange = (editorState)=>{
    this.setState({
      editorState
    })
  }
  handleClearContent=()=>{
    this.setState({
      editorState:''
    })
  }
  onEditorChange=(contentState)=>{
    this.setState({
      contentState
    })
  }
  handleGetText=()=>{
    this.setState({
      showRichText:true
    })
  }
  render(){
    const {editorState} = this.state;
    return (
      <div>
        <Card>
          <Button onClick={this.handleClearContent} type='primary' style={{marginRight:10}}>清空文本内容</Button>
          <Button onClick={this.handleGetText} type='primary'>获取Html内容</Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
          />
        </Card>
        <Modal
          title='富文本'
          visible={this.state.showRichText}
          footer={null}
          onCancel={()=>{
            this.setState({
              showRichText:false
            })
          }}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}