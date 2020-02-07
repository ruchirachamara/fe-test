import * as actions from "../actions/employeeActions"

const initialState = {
    first_name: "",
    last_name: "",
    reporting_person_id: null,
    loading: false,
    formUpdated: false
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.EMPLOYEE_REGISTER_FORM_UPDATE:
            return {
                ...state,
                [action.field]: action.value,
                formUpdated: true
            }
        case actions.SEND_EMPLOYEE_REGISTER_FORM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.SEND_EMPLOYEE_REGISTER_FORM_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_EMPLOYEE_REGISTER_FORM_REQUEST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_LOAD_EMPLOYEE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.SEND_LOAD_EMPLOYEE_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_LOAD_EMPLOYEE_LIST_REQUEST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actions.LOAD_EMPLOYEE_DETAILS_SERVICE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.REMOVE_THE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.REMOVE_THE_EMPLOYEE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actions.REMOVE_THE_EMPLOYEE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_EMPLOYEE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.SEND_EMPLOYEE_UPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_EMPLOYEE_UPDATE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case actions.SEND_EMPLOYEE_REGISTER_CLEAR_FORM:
            return initialState
        default:
            return state
    }
}