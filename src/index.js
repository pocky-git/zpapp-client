import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import Register from './pages/register'
import Login from './pages/login'
import Main from './pages/main'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>
,document.getElementById('root'))