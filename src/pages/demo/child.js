import React,{Component} from 'react';

export default class Child extends Component{
  // constructor(props){
  //   super(props);

  // }
  componentWillMount(){
    console.log('componentWillMount')
  }
  componentDidMount(){
    console.log('componentDidMount')
  }
  componentWillReceiveProps(newProps){
    console.log(newProps)
    console.log(`componentWillReceiveProps====:${newProps}`)
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  componentDidUpdate(){
    console.log('componentDidUpdate')
  }
  render(){
    return(
      <div>
        <p>{this.props.name}</p>
        <button onClick={(e)=>this.props.fn('hehee')}>fn</button>
      </div>
    )  
  }
}