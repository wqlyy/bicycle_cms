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
  },
  /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
      if (selectedIds) {
          this.setState({
              selectedRowKeys,
              selectedIds: selectedIds,
              selectedItem: selectedRows
          })
      } else {
          this.setState({
              selectedRowKeys,
              selectedItem: selectedRows
          })
      }
  },
}