export default {
  formatDate(time){
    if(!time){return ''}
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() + '  ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
  },
  paginations(data,callback){
    console.log(data)
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
  }
}