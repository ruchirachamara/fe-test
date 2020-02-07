import { 
    loadEmployeesList,
    employeeUpdateSubmit,
    employeeRegisterSubmit,
    removeTheEmployeeService,
    loadEmployeeDetailsService
} from "../services/employeeServices"

export const REMOVE_THE_EMPLOYEE_REQUEST = "REMOVE_THE_EMPLOYEE_REQUEST"
export const SEND_EMPLOYEE_UPDATE_REQUEST = "SEND_EMPLOYEE_UPDATE_REQUEST"
export const SEND_EMPLOYEE_REGISTER_CLEAR_FORM = "SEND_REGISTER_CLEAR_FORM"
export const EMPLOYEE_REGISTER_FORM_UPDATE = "EMPLOYEE_REGISTER_FORM_UPDATE"
export const SEND_LOAD_EMPLOYEE_LIST_REQUEST = "SEND_LOAD_EMPLOYEE_LIST_REQUEST"
export const REMOVE_THE_EMPLOYEE_REQUEST_FAILURE = "REMOVE_THE_EMPLOYEE_REQUEST_FAILURE"
export const REMOVE_THE_EMPLOYEE_REQUEST_SUCCESS = "REMOVE_THE_EMPLOYEE_REQUEST_SUCCESS"
export const SEND_EMPLOYEE_REGISTER_FORM_REQUEST = "SEND_EMPLOYEE_REGISTER_FORM_REQUEST"
export const SEND_EMPLOYEE_UPDATE_REQUEST_FAILURE = "SEND_EMPLOYEE_UPDATE_REQUEST_FAILURE"
export const SEND_EMPLOYEE_UPDATE_REQUEST_SUCCESS = "SEND_EMPLOYEE_UPDATE_REQUEST_SUCCESS"
export const LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST = "LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST"
export const SEND_LOAD_EMPLOYEE_LIST_REQUEST_SUCCESS = "SEND_LOAD_EMPLOYEE_LIST_REQUEST_SUCCESS"
export const SEND_LOAD_EMPLOYEE_LIST_REQUEST_FAILURE = "SEND_LOAD_EMPLOYEE_LIST_REQUEST_FAILURE"
export const SEND_EMPLOYEE_REGISTER_FORM_REQUEST_SUCCESS = "SEND_EMPLOYEE_REGISTER_FORM_REQUEST_SUCCESS"
export const SEND_EMPLOYEE_REGISTER_FORM_REQUEST_FAILURE = "SEND_EMPLOYEE_REGISTER_FORM_REQUEST_FAILURE"
export const LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_FAILURE = "LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_FAILURE"
export const LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_SUCCESS = "LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_SUCCESS"

const sendEmployeeRegisterFormRequest = _ => ({
    type: SEND_EMPLOYEE_REGISTER_FORM_REQUEST
})

const sendEmployeeRegisterFormRequestSuccess = _ => ({
    type: SEND_EMPLOYEE_REGISTER_FORM_REQUEST_SUCCESS
})

const sendEmployeRegisterFormRequestFailure = _ => ({
    type: SEND_EMPLOYEE_REGISTER_FORM_REQUEST_FAILURE
})

const sendRegisterClearForm = _ => ({
    type: SEND_EMPLOYEE_REGISTER_CLEAR_FORM
})

const sendLoadEmployeesListRequest = _ => ({
    type: SEND_LOAD_EMPLOYEE_LIST_REQUEST
})

const sendLoadEmployeesListRequestSuccess = _ => ({
    type: SEND_LOAD_EMPLOYEE_LIST_REQUEST_SUCCESS 
})

const sendLoadEmployeesListRequestFailure = _ => ({
    type: SEND_LOAD_EMPLOYEE_LIST_REQUEST_FAILURE
})

const loadEmployeeDetailsServiceRequest = _ => ({
    type: LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST
})

const loadEmployeeDetailsServiceRequestSuccess = _ => ({
    type: LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_SUCCESS
})

const loadEmployeeDetailsServiceRequestFailure = _ => ({
    type: LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_FAILURE
})

const removeTheEmployeeRequest = _ => ({
    type: REMOVE_THE_EMPLOYEE_REQUEST
})

const removeTheEmployeeRequestSuccess = _ => ({
    type: REMOVE_THE_EMPLOYEE_REQUEST_SUCCESS
})

const removeTheEmployeeRequestFailure = _ => ({
    type: REMOVE_THE_EMPLOYEE_REQUEST_FAILURE
})

const sendEmployeeUpdateFormRequest = _ => ({
    type: SEND_EMPLOYEE_UPDATE_REQUEST
})

const sendEmployeeUpdateFormRequestSuccess = _ => ({
    type: SEND_EMPLOYEE_UPDATE_REQUEST_SUCCESS
})

const sendEmployeeUpdateFormRequestFailure = _ => ({
    type: SEND_EMPLOYEE_UPDATE_REQUEST_FAILURE
})

export const employeeFormUpdate = ( field, value ) => ({
    type: EMPLOYEE_REGISTER_FORM_UPDATE,
    field,
    value
})

export const sendClearedRegisterForm = _ => (dispatch, getState) => {
    dispatch(sendRegisterClearForm())
    return new Promise((resolve, reject) => resolve(true))
}

export const employeeRegister = _ => (dispatch, getState) => {
    dispatch(sendEmployeeRegisterFormRequest())
    const { first_name, last_name, reporting_person_id } = getState().employee
    return employeeRegisterSubmit(first_name, last_name, reporting_person_id || 0)
        .then(data => {
            dispatch(sendEmployeeRegisterFormRequestSuccess())
            return data
        })
        .catch(error => {
            dispatch(sendEmployeRegisterFormRequestFailure())
            return error
        })
}

export const loadEmployeesListDownGeneral = _ => dispatch => {
    dispatch(sendLoadEmployeesListRequest())
    return loadEmployeesList()
        .then(data => {
            dispatch(sendLoadEmployeesListRequestSuccess())
            return data
        })
        .catch(error => {
            dispatch(sendLoadEmployeesListRequestFailure())
            return error
        })    
}

export const loadEmployeeDetails = empId => dispatch => {
    dispatch(loadEmployeeDetailsServiceRequest())
    return loadEmployeeDetailsService(empId)
        .then(data => {
            dispatch(loadEmployeeDetailsServiceRequestSuccess())
            return data
        })
        .catch(error => {
            dispatch(loadEmployeeDetailsServiceRequestFailure())
            return error
        })    
}

export const removeTheEmployee = empId => dispatch => {
    dispatch(removeTheEmployeeRequest())    
    return removeTheEmployeeService(empId)
        .then(data => {
            dispatch(removeTheEmployeeRequestSuccess())
            return data
        })
        .catch(error => {
            dispatch(removeTheEmployeeRequestFailure())
            return error
        })    
}

export const employeeUpdate = empId => (dispatch, getState) => {
    dispatch(sendEmployeeUpdateFormRequest())
    const { first_name, last_name, reporting_person_id } = getState().employee
    return employeeUpdateSubmit(empId, first_name, last_name, reporting_person_id || 0)
        .then(data => {
            dispatch(sendEmployeeUpdateFormRequestSuccess())
            return data
        })
        .catch(error => {
            dispatch(sendEmployeeUpdateFormRequestFailure())
            return error
        })
}