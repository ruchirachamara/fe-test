import React, { Component } from 'react'

import './header.scss'

export default class Header extends Component {

    state = {
        selectedUrl: ""
    }

    redirectToLocation = selectedUrl => this.setState({ selectedUrl }, this.props.history.push(selectedUrl))

    render() {
        const { selectedUrl } = this.state
        return (            
            <>
                <h2 className="employmentHeader">Employment List</h2>
                <ul className="headeMenu">
                    <li><a className={`${selectedUrl == '/' ? 'selected' : ''}`} onClick={() => this.redirectToLocation('/')}>List Employees</a></li>
                    <li><a className={`${selectedUrl == '/add' ? 'selected' : ''}`} onClick={() => this.redirectToLocation('/add')}>Add New Empliyee</a></li>
                </ul>
            </>
        )
    }
}