import fetch from '../server'

export const getLogin = (params) => { return fetch('/login', params) }

export const getAddressJson = (params) => { return fetch('/account/login.do', params) }
