import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    Radio,
    Button,
    Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/action'
import { getRedirectTo } from '../../utils'

import './index.less'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    register = () => {
        const { username,password,password2 } = this.state
        if(!username){
            return Toast.info('请填写用户名')
        }else if(!password){
            return Toast.info('请填写密码')
        }else if(password != password2){
            return Toast.info('两次输入的密码不一致')
        }
        this.props.register(this.state)
        this.setState({
            username: '',
            password: '',
            password2: '',
            type: 'dashen'
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { _id } = this.props.user
        if (_id) {
            return <Redirect to={getRedirectTo(this.props.user)} />
        }

        const { username, password, password2, type } = this.state
        
        return (
            <div className="register-page">
                <NavBar>BOSS直聘</NavBar>
                <WingBlank>
                    <List>
                        <InputItem value={username} placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
                        <InputItem value={password} placeholder='请输入密码' type="password" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <InputItem value={password2} placeholder='请输入确认密码' type="password" onChange={val => this.handleChange('password2', val)}>确认密码:</InputItem>
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={val => this.handleChange('type', 'dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={val => this.handleChange('type', 'laoban')}>老板</Radio>
                        </ListItem>
                    </List>
                    <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    { register }
)(Register)
