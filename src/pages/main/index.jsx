import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/action'
import './index.less'

import Dashen from '../dashen'
import Laoban from '../laoban'
import DashenInfo from '../dashen-info'
import LaobanInfo from '../laoban-info'
import Personal from '../personal'
import Message from '../message'
import Chat from '../chat'
import NavFooter from '../../compoents/nav-footer'

class Main extends Component {
    navList = [
        {
            path: '/laoban',
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神'
        },
        {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal',
            component: Personal,
            title: '个人中心',
            icon: 'personal',
            text: '个人'
        },
    ]

    componentDidMount() {
        const userid = Cookies.get('user_id')
        const { _id } = this.props.user
        if (userid && !_id) {
            this.props.getUser()
        }
    }

    render() {
        const userid = Cookies.get('user_id')
        if (!userid) {
            return <Redirect to='/login' />
        }

        const { _id } = this.props.user
        if (_id) {
            const { pathname } = this.props.location
            if (pathname === '/') {
                return <Redirect to={getRedirectTo(this.props.user)} />
            }
        }

        const { type } = this.props.user

        if(type==='dashen'){
            this.navList[0].hide = true
        }else if(type==='laoban'){
            this.navList[1].hide = true
        }

        const navList = this.navList.filter(nav=>!nav.hide)

        const { pathname } = this.props.location

        const currentNav = navList.find(nav => nav.path === pathname)

        const read = this.props.chat.msgList.filter(msg=>!msg.read&&msg.to===_id).length

        return (
            <div className="main-page">
                {
                    currentNav?
                    <NavBar>{currentNav.title}</NavBar>:null
                }
                <Switch>
                    {
                        navList.map((nav) => (
                            <Route path={nav.path} component={nav.component} />
                        ))
                    }
                    <Route path='/chat/:_id' component={Chat} />
                    <Route path='/dashen-info' component={DashenInfo} />
                    <Route path='/laoban-info' component={LaobanInfo} />
                    <Redirect to='/' />
                </Switch>
                {
                    currentNav?
                    <NavFooter navList={navList} read={read} />:null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        chat: state.chat
    }),
    { getUser }
)(Main)