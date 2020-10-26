import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import { updateUser } from '../../redux/action'
import HeaderSelector from '../../compoents/header-selector'

class DashenInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
    }

    getHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (attr, val) => {
        this.setState({
            [attr]: val
        })
    }

    save = () => {
        const {header,post,info} = this.state
        if(!header){
            return Toast.info('请选择头像')
        }else if(!post){
            return Toast.info('请填写求职岗位')
        }else if(!info){
            return Toast.info('请填写个人介绍')
        }
        this.props.updateUser(this.state)
    }

    render() {
        const { header, type } = this.props.user
        if (header && type === 'laoban') {
            return <Redirect to='/laoban'/>
        }else if(header && type === 'dashen'){
            return <Redirect to='/dashen'/>
        }

        return (
            <div>
                <NavBar>信息完善</NavBar>
                <HeaderSelector getHeader={this.getHeader} />
                <InputItem onChange={val => this.handleChange('post', val)}>求职岗位：</InputItem>
                <TextareaItem
                    title='个人介绍：'
                    rows={3}
                    onChange={val => this.handleChange('info', val)}
                ></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    { updateUser }
)(DashenInfo)

