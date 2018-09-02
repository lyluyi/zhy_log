import fetch from '../server'

export const getLogin = (params) => { return fetch('user/login', params) } // 登录

export const getAvatraJson = (params) => { return fetch('up/saveUrl.do', (params)) } // 人员信息 上传头像

// 公司
export const getCompanyId = (params) => { return fetch('tCom/findComName', params) } // 查询公司ID（包括查询传参）

export const postCompanyData = (params) => { return fetch('tCom/addCom', params) } // 保存公司信息

// 部门
export const getDepartmentLevel = (params) => { return fetch('dept/findDept', params) } // 查询上级部门（包括查询传参）

export const postDepartmentData = (params) => { return fetch('dept/addDept', params) } // 保存部门信息

// 人员

export const postPersonData = (params) => { return fetch('users/addUsers', params) } // 保存人员信息

// 角色管理

export const postRoleAdminData = (params) => { return fetch('role/addRole', params) } // roleAdmin 保存部门信息

// 角色菜单配置

export const getRoleMuneList = (params) => { return fetch('menuRole/selectMenuList', params) } // role 设定权限菜单

export const postRoleMuneList = (params) => { return fetch('menuRole/addMenuRole', params) } // role 设定权限菜单

export const getRoleList = (params) => { return fetch('role/selectRoleList', params) } // role 查询角色名称

// 用户行为日志

export const getAccountLog = (params) => { return fetch('user/findlog', params) } // 日志查询接口
