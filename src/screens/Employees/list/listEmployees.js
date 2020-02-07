import React, { Component } from 'react'
import { connect } from "react-redux"

import { 
    removeTheEmployee,
    loadEmployeesListDownGeneral
} from '../../../actions/employeeActions'

import '../../Employees/employees.scss'

class listEmployees extends Component {

    state = {
        first_name: "",
        last_name: "",
        employeeList: []
    }

    componentWillMount() {
        this.props.loadEmployeesListDownGeneral().then(employeeList => this.setState({ employeeList }))
    }

    removeTheEmployee = empId => this.props.removeTheEmployee(empId).then(_ => this.props.loadEmployeesListDownGeneral().then(employeeList => this.setState({ employeeList })))

    redirectToLocation = url => this.props.history.push(url)

    render() {
        const { employeeList } = this.state
        return (
            <>
                <h2>All Employees</h2>
                <table>
                    <tr>
                        <th style={{ width: '25%' }}>First Name</th>
                        <th style={{ width: '25%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Created At</th>
                        <th style={{ width: '20' }}>Action</th>
                    </tr>
                    {employeeList.map(eachEmployee =>                         
                        <tr>
                            <td>{eachEmployee.first_name}</td>
                            <td>{eachEmployee.last_name}</td>
                            <td>{eachEmployee.created_at}</td>
                            <td>
                                <a className="actionLinks" onClick={() => this.redirectToLocation(`/view/${eachEmployee.employee_id}`)}>
                                    <svg strokeLinecap="round" className="icon icon-eye" viewBox="0 0 32 32">
                                        <path d="M4 16c5 12 19 12 24 0M4 16C9 4 23 4 28 16"></path>
                                        <circle cx="16" cy="16" r="4.5"></circle>
                                    </svg>
                                </a>
                                <a className="actionLinks" onClick={() => this.redirectToLocation(`/edit/${eachEmployee.employee_id}`)}>
                                    <svg x="0" y="0" enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <path d="M85.333 282.64L85.333 362.64 165.333 362.64 378.667 149.307 298.667 69.307z"></path>
                                        <path d="M441.707 56.08L391.893 6.267c-8.32-8.32-21.867-8.32-30.187 0L320 47.973l80 80 41.707-41.707c8.32-8.319 8.32-21.866 0-30.186z"></path>
                                        <g>
                                            <path d="M0 426.64H512V511.97299999999996H0z" opacity="0.36"></path>
                                        </g>
                                    </svg>
                                </a>
                                <a className="actionLinks" onClick={() => this.removeTheEmployee(eachEmployee.employee_id)}>
                                    <svg className="icon" viewBox="0 0 10 10">
                                        <path d="M7.1 1.4l1.4 1.4-5.6 5.6L1.5 7zm-4.2 0L8.5 7 7.1 8.4 1.5 2.8z"></path>
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    )}
                </table>
            </>
        )
    }
}

const mapStateToProps = ({ employee }) => ({
    loading: employee.loading
})
  
const mapDispatchToProps = dispatch => ({
    removeTheEmployee: empId => dispatch(removeTheEmployee(empId)),
    loadEmployeesListDownGeneral: _ => dispatch(loadEmployeesListDownGeneral())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(listEmployees)