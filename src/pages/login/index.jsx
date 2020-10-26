import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    Button,
    Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/action'
import { getRedirectTo } from '../../utils'

import './index.less'

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    login = () => {
        const { username,password } = this.state
        if(!username){
            return Toast.info('请填写用户名')
        }else if(!password){
            return Toast.info('请填写密码')
        }
        this.props.login(this.state)
        this.setState({
            username: '',
            password: '',
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const { _id } = this.props.user
        if (_id) {
            return <Redirect to={getRedirectTo(this.props.user)} />
        }

        const {username,password} = this.state

        return (
            <div className="login-page">
                <NavBar>BOSS直聘</NavBar>
                <WingBlank>
                    <List>
                        <InputItem value={username} placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
                        <InputItem value={password} placeholder='请输入密码' type="password" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    </List>
                    <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    { login }
)(Login)
