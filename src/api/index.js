import axios from 'axios'

export const reqRegister = ({username,password,type}) => axios.post('/register',{username,password,type})

export const reqLogin = user => axios.post('/login',user)

export const reqUpdate = user => axios.post('/update',user)

export const reqUser = type => axios.get('/user',{params:{type}})

export const reqMsgList = () => axios.get('/msglist')

export const reqRead = chat_id => axios.post('/read',{chat_id})

