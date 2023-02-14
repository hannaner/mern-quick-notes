import { getToken } from "./users-service"
const BASE_URL = '/api/users'

export async function signUp(userData){
    return sendRequest(BASE_URL, 'POST', userData)
    // previous code before creating sendRequest
        // console.log('hello there!', userData)
        // const res = await fetch(BASE_URL, {
        //     // this is where we add the option
        //     // want to make a user
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // })

        // // if success
        // // we get a true here when the status is 200
        // if (res.ok){
        //     return res.json()
        // } else {
        //     // throw new javascript message Error
        //     throw new Error('Invalid signup')
        // }
}

export async function login(credentials){
    return sendRequest(BASE_URL + '/login', 'POST', credentials)
    // previous code before creating sendRequest
        // const res = await fetch(BASE_URL + '/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // })

        // if (res.ok){
        //     return res.json()
        // } else{
        //     throw new Error('Invalid login')
        // }
}

// we're making our signup and login functions a bit more DRY by creating a function that can be called in every API module
export default async function sendRequest(url, method='GET', payload=null){
    const options = { method }
    if (payload){
        options.headers = {'Content-type': 'application/json'}
        options.body = JSON.stringify(payload)
    }
    // if there's a token, include it in the request
    const token = getToken()
    if (token){
        // make sure we have headers in our options
        options.headers = options.headers || {}
        // add in our token with an authorization header
        // don't forget to capitalize Authorization
        // best practices is to begin with `Bearer`
        options.headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(url, options)
    if (res.ok) {
        return res.json()
    } else {
        throw new Error('Bad request')
    }
}

export async function checkToken(){
    return sendRequest(BASE_URL + '/check-token')
}