import {Select} from 'antd'
import React from 'react'

export default {
  formatDate(time){
    if(!time){return ''}
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() + '  ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
  },
  paginations(data,callback){
    return {
      onChange:(current)=>{
        callback(current)
      },
      current:data.page,
      pageSize:data.length,
      total:data.total,
      showTotal:()=>{
        return `共${data.total}条数据`
      },
      showQuickJumper:true
    }
  },
  getOptionList(data){
    if(!data) return [];
     let list = data.map((item,index)=>{
       item.key = index;
      return item;
    })
    let options = list.map(item=>{
      return <Select.Option key={item.key} value={item.id}>{item.name}</Select.Option>
    })
    return options;
  }
}