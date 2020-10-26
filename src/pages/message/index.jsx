import React, { Component } from 'react'
import { List,Badge } from 'antd-mobile'
import { connect } from 'react-redux'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component {
    toChat = (from,to) => {
        const { _id } = this.props.user
        if(from===_id){
            this.props.history.push('/chat/'+to)
        }else if(to===_id){
            this.props.history.push('/chat/'+from)
        }
    }

    render() {

        const { msgList,users } = this.props.chat
        const msgsObj = {}
        msgList.forEach(msg => {
            if(!msgsObj[msg.chat_id]){
                msgsObj[msg.chat_id] = msg
            }else{
                if(msgsObj[msg.chat_id].create_time<msg.create_time){
                    msgsObj[msg.chat_id] = msg
                }
            }
        })
        const msgs = Object.values(msgsObj).sort((m1,m2)=>m2.create_time-m1.create_time)

        const { _id } = this.props.user
        const unReadMsgNum = {}
        msgList.filter(msg=>msg.to===_id).forEach(msg=>{
            if(!unReadMsgNum[msg.chat_id] && !msg.read){
                unReadMsgNum[msg.chat_id] = 1
            }else if(unReadMsgNum[msg.chat_id] && !msg.read){
                unReadMsgNum[msg.chat_id] += 1
            }
        })

        return (
            <List>
                {
                    msgs.map(msg=>{
                        const username = msg.from===this.props.user._id?users[msg.to].username:users[msg.from].username
                        const header = msg.from===this.props.user._id?users[msg.to].header:users[msg.from].header
                        return(
                            <Item
                                arrow="horizontal"
                                thumb={users[msg.from].header?require(`../../assets/images/headers/${header}.png`):null}
                                multipleLine
                                onClick={()=>this.toChat(msg.from,msg.to)}
                                extra={<Badge text={unReadMsgNum[msg.chat_id]} overflowCount={99} />}
                            >
                                {username} <Brief>{msg.content}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state=>({
        user: state.user,
        chat: state.chat
    })
)(Message)
