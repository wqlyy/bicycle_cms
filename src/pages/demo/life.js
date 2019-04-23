import React from 'react'
import Child from './child'
import {Button} from 'antd'
import styled from './life.module.less'
export default class Life extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0
    }
  }
  handleAdd=()=>{
    // console.log(this)
    this.setState({
      count:this.state.count+1
    })
  }
  handleClick(){
    console.log(this)
  }
  fn(data){
    console.log('子组件传值给父组件'+data)
    this.setState({
      name:data
    })
  }
  render(){
    return (
    <div className={styled.container}>
      <p>React生命周期</p>
      <button onClick={this.handleAdd}>点击一下</button>
      <button onClick={this.handleClick.bind(this)}>点击一下</button>
      <button onClick={()=>this.handleClick()}>点击一下</button>
      <Button type='primary '>aaaaaa</Button>
      <p>{this.state.count}</p>
      <Child name={this.state.count} fn={this.fn.bind(this)}/>
      <p>{this.state.name}</p>
    </div>
    )
  }
}