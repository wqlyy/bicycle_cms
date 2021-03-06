import Axios from 'axios';
import { Modal ,message} from 'antd';
import Utils from './utils'

export default class Request {
  static ajax(options){
    let loading;
    if(options.data && options.data.isShowLoading!==false){
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    const BASE_URL = 'https://www.easy-mock.com/mock/5cc11d4e2363380d7f175996/cms_api';
    return new Promise((resolve,reject)=>{
      Axios({
        baseURL:BASE_URL,
        url:options.url,
        method:options.method||'get',
        timeout:5000,
        params:(options.data && options.data.params)||''
      }).then((res)=>{
        if(options.data && options.data.isShowLoading!==false){
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if(res.status===200){
          if(res.data.code===0){
            resolve(res.data.result)
          }else{
            Modal.info({
              title:'提示',
              content:res.data.msg
            })
          }
        }
      }).catch(err=>{
        message.error('请求超时，请稍候重试');
        reject(err)
        if(options.data && options.data.isShowLoading!==false){
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
      })
    })
  }
  static getList(_this,url,params){
    this.ajax({url,data:{params}}).then(res=>{
      _this.setState({
        list:res.list.map((item,index)=>{
          item.key=index;
          return item;
        }),
        pagination:Utils.paginations(res,(current)=>{
          _this.params.page = current
          _this.getList()
        })
      })
    })
  }
}