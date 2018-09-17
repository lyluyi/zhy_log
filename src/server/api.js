import fetch from '../server'

export const getLogin = (params) => { return fetch('Json', 'user/login', params) } // 登录

export const getAvatraJson = (params) => { return fetch('up/saveUrl.do', (params)) } // 人员信息 上传头像

// 公司 tCom/page
export const getCompanyId = (params) => { return fetch('FormData', 'tCom/page', params) } // 查询公司ID（包括查询传参）

export const postCompanyData = (params) => { return fetch('Json', 'tCom/addCom', params) } // 保存公司信息

// 部门
export const getDepartmentLevel = (params) => { return fetch('FormData', 'dept/page', params) } // 查询上级部门（包括查询传参）

export const postDepartmentData = (params) => { return fetch('Json', 'dept/addDept', params) } // 保存部门信息

// 人员

export const getUserId = (params) => { return fetch('Json', 'users/findUserId', params) } // 获取工号ID

export const postPersonData = (params) => { return fetch('Json', 'users/addUsers', params) } // 保存人员信息

// 角色管理

export const postRoleAdminData = (params) => { return fetch('Json', 'role/addRole', params) } // roleAdmin 保存部门信息

// 角色菜单配置

export const getRoleMuneList = (params) => { return fetch('Json', 'menuRole/selectMenuList', params) } // role 设定权限菜单

export const postRoleMuneList = (params) => { return fetch('Json', 'menuRole/addMenuRole', params) } // role 设定权限菜单

export const getRoleList = (params) => { return fetch('Json', 'role/selectRoleList', params) } // role 查询角色名称

// 用户账号管理

export const getUserAdminList = (params) => { return fetch('Json', 'users/findUser', params) } // 人员账号查询

export const postUserAdminList = (params) => { return fetch('Json', 'users/updateUserRole', params) } // 用户账号管理保存

// 公司组织架构查询

export const getCompanyTree = (params) => { return fetch('Json', 'organizational/tree', params) } // role 查询角色名称

// 用户行为日志

export const getAccountLog = (params) => { return fetch('Json', 'user/findlog', params) } // 日志查询接口

// 个人信息查询

// export const getHighCheck = (params) => { return fetch('Json', 'user/pagePlus', params) } // 高级信息查询

// export const getLowCheck = (params) => { return fetch('FormData', 'user/page', params) } // 普通信息查询

export const getInfoCheck = (params) => { return fetch('Json', 'user/pagePlus', params) } // 信息查询

export const getSubCheck = (params) => { return fetch('FormData', 'users/findUserInfoByUserId', params) } // 子表信息查询

export const exportTableData = (params) => { return fetch('Json', 'user/exportPlus', params) } // 表格信息导出
