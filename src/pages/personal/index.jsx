import React, { Component } from 'react'
import { Result, List, Button, WhiteSpace, Modal, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { resetUser } from '../../redux/action'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    logout = () => {
        Modal.alert('退出登录', '确定退出登录吗', [
            { text: '取消' },
            {
                text: '确认', onPress: () => {
                    Cookies.remove('user_id')
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const { header, post, company, info, salary, username } = this.props.user
        return (
            <div>
                <Result
                    img={<img src={header ? require(`../../assets/images/headers/${header}.png`) : null} />}
                    title={username}
                    message={company ? company : null}
                />
                <List renderHeader={'相关信息'} className="my-list">
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {
                            salary ?
                                <Brief>薪资: {salary}</Brief> : null
                        }
                    </Item>
                </List>
                <WhiteSpace />
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    { resetUser }
)(Personal)