import React, { Component } from 'react'
import { connect } from "react-redux"

import { 
    loadEmployeeDetails,
    loadEmployeesListDownGeneral 
} from '../../../actions/employeeActions'

import '../../Employees/employees.scss'

class viewEmployee extends Component {

    state = {        
        employeeInfo: [],
        employeeList: [],
        selectedEmployeeId: 0,
        reportingStack: []
    }

    componentWillMount() {
        this.props.loadEmployeesListDownGeneral().then(employeeList => this.setState({ employeeList }, () => {
            this.props.loadEmployeeDetails(this.props.match.params.id).then(employeeInfo => {
                // Assume that the reporting hireachy goes only to three level in this example
                // Have to find a better solution for the below loop If the hireachy going more deeper.
                if (employeeInfo.reporting_person_id !== "0") {
                    this.setState({ reportingStack: this.state.reportingStack.concat(employeeInfo) })
                    this.props.loadEmployeeDetails(employeeInfo.reporting_person_id).then(datalevel1 => {
                        this.setState({ reportingStack: this.state.reportingStack.concat(datalevel1) })
                        this.props.loadEmployeeDetails(datalevel1.reporting_person_id).then(datalevel2 => {
                            this.setState({ reportingStack: this.state.reportingStack.concat(datalevel2) })
                        })
                    })
                }                
                this.setState({ employeeInfo: employeeInfo, selectedEmployeeId: employeeInfo.employee_id })
            })
        }))        
    }    

    render() {

        const { loading } = this.props
        const { employeeInfo, reportingStack } = this.state     

        if (loading) return <h2>Please wait...</h2>

        return (
            <div>
                <h2>Employment Information</h2>                
                <div>
                    <span>First Name : </span><span>{employeeInfo.first_name}</span>
                </div>
                <div>
                    <span>Last Name : </span><span>{employeeInfo.last_name}</span>
                </div>
                <div>
                    <span>Reporting Structure : </span><span>{reportingStack.length > 0 ? reportingStack.map((eachLevel, i) => i < reportingStack.length - 1 ? eachLevel.first_name + " --> " : eachLevel.first_name ) : 'None'}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ employee }) => ({
    loading: employee.loading
})
  
const mapDispatchToProps = dispatch => ({
    loadEmployeeDetails: empId => dispatch(loadEmployeeDetails(empId)),
    loadEmployeesListDownGeneral: _ => dispatch(loadEmployeesListDownGeneral())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(viewEmployee)