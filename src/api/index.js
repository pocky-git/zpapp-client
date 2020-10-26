import axios from 'axios'

//用户注册
export const reqRegister = ({username,password,type}) => axios.post('/register',{username,password,type})

//用户登录
export const reqLogin = user => axios.post('/login',user)

//用户更新个人资料
export const reqUpdate = user => axios.post('/update',user)

//获取用户信息以及列表
export const reqUser = type => axios.get('/user',{params:{type}})

//获取聊天消息列表
export const reqMsgList = () => axios.get('/msglist')

//设置消息已读
export const reqRead = chat_id => axios.post('/read',{chat_id})

