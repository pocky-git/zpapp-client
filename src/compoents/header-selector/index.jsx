import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes = {
        getHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                icon: require(`../../assets/images/headers/头像${i + 1}.png`),
                text: `头像${i + 1}`
            })
        }

        this.state = {
            icon: ''
        }
    }

    handleSelect = (el) => {
        this.setState({
            icon: el.icon
        })
        this.props.getHeader(el.text)
    }

    render() {
        const {icon} = this.state
        const title = !icon?<div>还未选择头像</div>:<div>已选择头像<img src={icon} alt=""/></div>

        return (
            <List renderHeader={() => title} className="my-list">
                <Grid 
                    data={this.headerList} 
                    columnNum={4} 
                    onClick={this.handleSelect}
                />
            </List>
        )
    }
}
