import BackendClient from './backendClient'

export const employeeRegisterSubmit = (first_name, last_name, reporting_person_id) => BackendClient.post("employees/add", {
    "first_name": first_name,
    "last_name": last_name,
    "reporting_person_id": reporting_person_id
})

export const loadEmployeesList = _ => BackendClient.get("employees/list")

export const loadEmployeeDetailsService = empId => BackendClient.get(`employees/view?emp_id=${empId}`)

export const removeTheEmployeeService = empId => BackendClient.get(`employees/delete?emp_id=${empId}`) 

export const employeeUpdateSubmit = (empId, first_name, last_name, reporting_person_id) => BackendClient.post(`employees/update?emp_id=${empId}`, {
    "first_name": first_name,
    "last_name": last_name,
    "reporting_person_id": reporting_person_id
})