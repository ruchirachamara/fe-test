import React, { Component } from 'react'
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import thunk from "redux-thunk"
import { Provider } from "react-redux"

import rootReducer from './reducers/rootReducer'

import Header from './screens/layouts/header/header'
import Footer from './screens/layouts/footer/footer'
import CommonLayout from './screens/layouts/CommonLayout/CommonLayout'
import addEmployees from './screens/Employees/add/addEmployees'
import listEmployees from './screens/Employees/list/listEmployees'
import viewEmployee from './screens/Employees/view/viewEmployee'
import updateEmployees from './screens/Employees/update/updateEmployee'

import './App.scss'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.store = createStore(
            rootReducer, 
            applyMiddleware(thunk)
        )
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <Route component={Header} />  
                    <Switch>
                        <CommonLayout>
                            <Route exact path="/" component={listEmployees} />            
                            <Route exact path="/add" component={addEmployees} />   
                            <Route exact path="/view/:id" component={viewEmployee} />                                
                            <Route exact path="/edit/:id" component={updateEmployees} />                                
                        </CommonLayout>                                                   
                    </Switch>                  
                    <Route component={Footer} />  
                </Router>
            </Provider>              
        )
    }
}