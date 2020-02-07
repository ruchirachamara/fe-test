import React, { Component } from 'react'
import { connect } from "react-redux"

import { 
    employeeRegister,
    employeeFormUpdate,
    loadEmployeesListDownGeneral
} from '../../../actions/employeeActions'

import '../../Employees/employees.scss'

class addEmployees extends Component {

    state = {
        first_name: "",
        last_name: "",
        employeeList: []
    }

    componentWillMount() {
        this.props.loadEmployeesListDropdown().then(employeeList => this.setState({ employeeList }))
    }

    handleBlur = _ => _ => (this.props.formUpdated) && this.setState({ saveBtnDisabledStatus: false })

    updateFormHandler = field => event => {  
        this.setState({ 
            [field]: event.target.value, 
            errorFields: {
                [field]: (!event.target.value) ? true : false
            },
            errorsInTheForm: (!event.target.value) ? true : false
        })      
        this.props.employeeFormUpdate([field], event.target.value)  
    }

    submitEmployeeForm = e => {
        e.preventDefault()
        const {
            last_name,
            first_name            
        } = this.state
        if (first_name && last_name) {
            if (this.props.formUpdated) {
                this.props.employeeRegister().then(data => {
                    if (data.status === "employee_created") {
                        this.props.loadEmployeesListDropdown().then(employeeList => {
                            this.setState({ message: "New employee has been added", employeeList: employeeList }, () => {
                                setTimeout(_ => this.setState({ message: "" }), 3000)
                            })
                        })
                    } else {
                        this.setState({ message: "Something went wrong!" }, () => {
                            setTimeout(_ => this.setState({ message: "" }), 3000)
                        })                                        
                    }
                })                         
            } 
        }        
    }

    render() {

        const {
            loading,
            last_name,
            first_name
        } = this.props

        const { message } = this.state

        const { employeeList } = this.state

        if (loading) return <h2>Please wait...</h2>

        return (
            <div>
                <h2>Employment Entry Form</h2>
                {message && <h3>{message}</h3>}
                <form>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                        type="text" 
                        id="first_name"                                         
                        name="first_name"  
                        placeholder="First Name"          
                        onBlur={this.handleBlur('first_name')}                                                                                             
                        onChange={this.updateFormHandler('first_name')}                                                                                    
                        value={(first_name !== 'null' ? first_name : '')}                                                                                  
                    />
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                        type="text" 
                        id="last_name"                                         
                        name="last_name"  
                        placeholder="Last Name"          
                        onBlur={this.handleBlur('last_name')}                                                                                             
                        onChange={this.updateFormHandler('last_name')}                                                                                    
                        value={(last_name !== 'null' ? last_name : '')}                                                                                  
                    />
                    <label htmlFor="reportingPerson">Reporting to</label>
                    <select id="reportingPerson" name="reportingPerson" onChange={this.updateFormHandler('reporting_person_id')}>                        
                        <option>{'Please Select'}</option>
                        {employeeList.map(eachEmployee => <option value={eachEmployee.employee_id}>{eachEmployee.first_name}</option>)}
                    </select>
                    <input type="button" defaultValue="Submit" onClick={this.submitEmployeeForm} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ employee }) => ({
    loading: employee.loading,
    formUpdated: employee.formUpdated
})
  
const mapDispatchToProps = dispatch => ({
    employeeRegister: _ => dispatch(employeeRegister()),
    loadEmployeesListDropdown: _ => dispatch(loadEmployeesListDownGeneral()),
    employeeFormUpdate: (field, value) => dispatch(employeeFormUpdate(field, value))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(addEmployees)