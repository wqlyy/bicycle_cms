import React from 'react'
import {Badge} from 'antd'

/**
 * 字典文件
 */

//状态
const STATUS = {
  '1':<Badge status='success' text='运行中'/>,
  '2':<Badge status='error' text='报错'/>,
  '3':<Badge status='default' text='正常'/>,
  '4':<Badge status='processing' text='处理中'/>,
  '5':<Badge status='warning' text='警告'/>,
}
//爱好
const INTEREST = {
  '1':'游泳',
  '2':'打篮球',
  '3':'踢足球',
  '4':'跑步',
  '5':'爬山',
  '6':'骑行',
  '7':'麦霸',
  '8':'桌球'
}
// 性别
const SEX={
  '1':'男',
  '2':'女'
}
// 用车模式
const USE_BIKE_MODE ={
  "1":"停车点",
  "2":"禁停区"
}
//营运模式
const OP_MODE = {
  "1":"自营",
  "2":"加盟"
}
export {SEX,INTEREST,STATUS,USE_BIKE_MODE,OP_MODE}