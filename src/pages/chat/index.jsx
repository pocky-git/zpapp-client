import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg, getRead } from '../../redux/action'

const Item = List.Item

class Chat extends Component {

    state = {
        content: '',
        isShow: false
    }

    sendMsg = () => {
        const content = this.state.content.trim()
        const from = this.props.user._id
        const to = this.props.match.params._id

        if (!content) {
            return
        }

        this.props.sendMsg({ content, from, to })

        this.setState({
            content: '',
            isShow: false
        })
    }

    toggleShow = () => {
        const { isShow } = this.state
        this.setState({
            isShow: !isShow
        })
        const event = new Event('resize')
        setTimeout(()=>{
            window.dispatchEvent(event)
        })
    }

    componentWillMount() {
        const emojis = ['😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({ text: emoji }))
    }

    componentDidMount() {
        window.scrollTo(0, document.documentElement.scrollHeight)
    }

    componentDidUpdate() {
        window.scrollTo(0, document.documentElement.scrollHeight)
    }

    componentWillUnmount() {
        const myId = this.props.user._id
        const targetId = this.props.match.params._id
        const chat_id = [myId, targetId].sort().join('_')
        this.props.getRead(chat_id)
    }

    render() {
        const { content,isShow } = this.state

        const from = this.props.user._id
        const to = this.props.match.params._id
        const chat_id = [from, to].sort().join('_')
        const msgList = this.props.chat.msgList.filter(item => item.chat_id === chat_id)

        const { users } = this.props.chat
        if (!users[to]) {
            return null
        }

        const { username, header } = users[to]
        const myHeader = users[from].header

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left' />}
                    className='sticky-header'
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {username}
                </NavBar>
                <List>
                    {
                        msgList.map(msg => {
                            if (msg.from === from) {
                                return (
                                    <Item
                                        key={msg._id}
                                        className='chat-me'
                                        extra={<img src={require(`../../assets/images/headers/${myHeader}.png`)} />}
                                    >
                                        {msg.content}
                                    </Item>
                                )

                            } else if (msg.to === from) {
                                return (
                                    <Item
                                        key={msg._id}
                                        thumb={require(`../../assets/images/headers/${header}.png`)}
                                    >
                                        {msg.content}
                                    </Item>
                                )

                            }
                        })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        value={content}
                        placeholder="请输入"
                        onChange={val => this.setState({ content: val })}
                        extra={
                            <span>
                                <span style={{ marginRight: 5, lineHeight: 'normal' }} onClick={this.toggleShow}>😊</span>
                                <span onClick={this.sendMsg}>发送</span>
                            </span>
                        }
                        onFocus={()=>this.setState({isShow:false})}
                    />
                    {
                        isShow?
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text })
                            }}
                        />:null
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        chat: state.chat
    }),
    { sendMsg, getRead }
)(Chat)
