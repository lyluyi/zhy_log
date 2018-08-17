import fetch from '../server'

export const getLogin = (params) => { return fetch('login', params) } // 登录

export const getAddressJson = (params) => { return fetch('account/login.do', params) }

export const getAvatraJson = (params) => { return fetch('up/saveUrl.do', (params)) } // 人员信息 上传头像
