import { backendBaseUrl } from "../utils/config"
import { promiseReject } from "../utils/misc"

class BackendClient {

    checkStatusAndGetJSON = fetchResponse => fetchResponse.ok ? fetchResponse.json() : fetchResponse.json().then(promiseReject)
    
    checkForTokenExpiry = error => promiseReject(error)      

    get = (path, token = "") => {
        let options = {}
        if (token !== "") {
            options = {
                method: 'GET',
                headers: {
                    Accept: "application/json"
                }
            }
        }else {
            options = {
                method: 'GET',
                headers: {
                    Accept: "application/json"
                }
            }    
        }                
        return fetch(backendBaseUrl + path, options).then(this.checkStatusAndGetJSON).catch(this.checkForTokenExpiry)
    }

    post = (path, body = {}, token = "", mediaUpload = false) => {
        let options = {}        
        const formData = new FormData()
        if (!mediaUpload) {
            Object.keys(body).forEach(key => formData.append(key, body[key]))
        } else {  
            formData.append('file', body)
        }                
        if (token !== "") {
            options = {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            }
        }else {
            options = {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            }
        }         
        return fetch(backendBaseUrl + path, options).then(this.checkStatusAndGetJSON).catch(this.checkForTokenExpiry)
    }

    delete = path => {
        let options = {}
        options = {
            method: 'delete',
            headers: {
                Accept: "application/json"
            }
        }
        return fetch(path, options).then(this.checkStatusAndGetJSON).catch(this.checkForTokenExpiry)
    }
}

export default new BackendClient()