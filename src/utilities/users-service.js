import * as usersAPI from './users-api'

export async function signUp(userData){
    const token = await usersAPI.signUp(userData)

    // for now this won't be a token but we will be returning one eventually
    localStorage.setItem('token', token)
    return getUser()
}

export function getToken(){
    // get token from local storage
    // get the token's payload
    // check if the token has expired
    // if it hasn't, return the token
    // 1. get token from localStorage
    const token = localStorage.getItem('token')
    if (!token) return null
    /* 2. get payload from token
        our JWT token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0QHQuY29tIiwiX2lkIjoiNjNlYTViOGQ5NjM0Yjg5NzEyNDI4ODhkIiwiY3JlYXRlZEF0IjoiMjAyMy0wMi0xM1QxNTo0NzoyNS4yMDFaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0xM1QxNTo0NzoyNS4yMDFaIiwiX192IjowfSwiaWF0IjoxNjc2MzAzMjQ1LCJleHAiOjE2NzYzODk2NDV9.3NdjX9j0lsPxPQ3E674W5dWJPAfl79HxkOM2NZCHgbU
    breaking down our token:
        part 1 is the header
        part 2 is the payload
        part 3 is the signature 
        (each part separated by the . )
    */
    const payload = token.split('.')[1]
    /* output is going to be array of substrings
        JWTs are base64 encoded
        we need to decode it to make it usable
        Javascript has a built-in function for decoding base64 called atob()
    */
    const decodedPayload = atob(payload)
    // will ouput a json object of the user
    const parsedPayload = JSON.parse(decodedPayload)
    // JWT's expiration is expressed in seconds, not miliseconds, so need to convert
    if (parsedPayload.exp < Date.now() / 1000){
        // token has expired, so we can remove it
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}

export function getUser(){
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut(){
    localStorage.removeItem('token')
}

export async function login(credentials){
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export async function checkToken(){
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}