import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import { updateUser } from '../../redux/action'
import HeaderSelector from '../../compoents/header-selector'

class LaobanInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: ''
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
        const {header,post,info,company,salary} = this.state
        if(!header){
            return Toast.info('请选择头像')
        }else if(!post){
            return Toast.info('请填写招聘职位')
        }else if(!info){
            return Toast.info('请填写职位要求')
        }else if(!company){
            return Toast.info('请填写公司名称')
        }else if(!salary){
            return Toast.info('请填写职位薪资')
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
                <InputItem onChange={val => this.handleChange('post', val)}>招聘职位：</InputItem>
                <InputItem onChange={val => this.handleChange('company', val)}>公司名称：</InputItem>
                <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资：</InputItem>
                <TextareaItem
                    title='职位要求：'
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
)(LaobanInfo)
