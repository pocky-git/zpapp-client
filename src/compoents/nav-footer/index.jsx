import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import './index.less'

const Item = TabBar.Item

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        read: PropTypes.number.isRequired
    }

    render() {
        const {navList,read} = this.props
        const {pathname} = this.props.location

        return (
            <TabBar tintColor="#1cae82">
                {
                    navList.map((nav, index) => (
                        <Item
                            key={index}
                            icon={{ uri: require(`../../assets/images/nav/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`../../assets/images/nav/${nav.icon}-selected.png`) }}
                            selected={pathname===nav.path}
                            title={nav.text}
                            onPress={()=>this.props.history.push(nav.path)}
                            badge={nav.path==='/message'?read:''}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)
