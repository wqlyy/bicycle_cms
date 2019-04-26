import React from 'react'
import {Input,Select,Form,Button,Checkbox,DatePicker} from 'antd'

import Utils from '../../utils/utils'

const FormItem = Form.Item;

class FilterForm extends React.Component{

  initFormList = () => {
    const {getFieldDecorator} = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];
    if(formList&&formList.length>0){
     let formKeyList = formList.map((item,index)=>{
        item.key = index;
        return item;
      })
      formKeyList.forEach((item,index)=>{
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue||'';
        let placeholder = item.placeholder;
        let width = item.width;
        if(item.type==="时间查询"){
          const DATEPICKER = <FormItem
            label={label}
            key={item.key}
          >
             {
                getFieldDecorator(field)(<DatePicker.RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['开始时间', '结束时间']}
                  // onChange={this.onChange}
                  // onOk={this.onOk}
                />)
              }
          </FormItem>
          formItemList.push(DATEPICKER);
        }
        if(item.type === 'INPUT'){
          const INPUT = <FormItem
            label={label}
          >
            {
              getFieldDecorator(field,{
                initialValue:initValue
              })(<Input type="text" placeholder={placeholder}/>)
            }
          </FormItem>;
          formItemList.push(INPUT);
        }else if(item.type === 'SELECT'){
          const SELECT = <FormItem
            label={label}
            key={item.key}
            
          >
            {
              getFieldDecorator(field,{
                initialValue:initValue
              })(<Select
                placeholder={placeholder}
                style={{width:width}}
              >
                {Utils.getOptionList(item.list)}
              </Select>)
            }
          </FormItem>;
          formItemList.push(SELECT);
        }else if(item.type === 'CHECKBOX'){
          const CHECKBOX = <FormItem
            label={label}
          >
            {
              getFieldDecorator(field,{
                valuePropName:'checked',
                initialValue:initValue
              })(<Checkbox>
                {label}
              </Checkbox>)
            }
          </FormItem>;
          formItemList.push(CHECKBOX);
        }
      })
    }
    return formItemList;
  }
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);

  }
  handleResetFilter = () => {
    this.props.form.resetFields()
  }
  render(){
    return (
      <Form layout="inline">
        {this.initFormList()}
        <Form.Item>
          <Button onClick={this.handleFilterSubmit} type="primary" style={{margin:"0 10px"}}>查询</Button>
          <Button onClick={this.handleResetFilter}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({})(FilterForm);