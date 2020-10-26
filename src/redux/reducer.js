import {combineReducers} from 'redux'
import {AUTH_SUCCESS,RESET_USER,SET_USERLIST,RECEIVE_MSG,RECEIVE_MSG_LIST,SET_READ} from './action-type'

const initUser = {
    username: '',
    type: '',
}

function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return action.data
        case RESET_USER:
            return {...initUser}
        default:
            return state
    }
}

const initUserList = []

function userList(state=initUserList,action){
    switch(action.type){
        case SET_USERLIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {},
    msgList: [],
    read: 0
}

function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSG_LIST:
            return {
                users: action.data.users,
                msgList: action.data.msgList
            }
        case RECEIVE_MSG: 
            return {
                users:state.users,
                msgList:[...state.msgList,action.data]
            }
        case SET_READ: 
            return {
                users:state.users,
                msgList: state.msgList.map(msg=>{
                    if(msg.chat_id===action.data){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                })
            }   
        default:
            return state
    }
}

export default combineReducers({
    user,userList,chat
})
