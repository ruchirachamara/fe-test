import { combineReducers } from "redux"

import { employeeReducer as employee } from "./employeeReducer"

const rootReducer = combineReducers({
    employee
})

export default rootReducer