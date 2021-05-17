import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Tasks from '../tasks/tasks'
import About from '../about/about'


export default props => (
    <Router history={hashHistory}>
        <Route path='/tasks' component={Tasks} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/tasks' />
    </Router>
)