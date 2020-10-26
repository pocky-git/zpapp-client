import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import { getUserList } from '../../redux/action'
import UserList from '../../compoents/user-list'

class Laoban extends Component {
    componentDidMount(){
        this.props.getUserList('dashen')
    }

    render() {
        const {header} = this.props.user
        if(!header){
            return <Redirect to='/laoban-info'/>
        }

        const {userList} = this.props
        return (
            <div>
                <UserList userList={userList}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userList: state.userList
    }),
    { getUserList }
)(Laoban)