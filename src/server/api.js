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

// 人员联系方法

export const getLinkman = (params) => { return fetch('Json', 'user/linkmanPage', params) } // 人员联系方式

export const getJobPage = (params) => { return fetch('FormData', 'job/page', params) } //  查询job

export const getOptionalJobDictListByDeptId = (params) => { return fetch('FormData', 'jobDict/optionalJobDictListByDeptId', params) } //  根据部门id查询可选的职位

export const getDictType = (params) => { return fetch('FormData', 'sys/dictType', params) } //  查询数据字典

export const getDictionaries = (params) => { return fetch('FormData', 'sys/dictionaries', params) } //  查询数据字典子项

export const postDictTypeData = (params) => { return fetch('Json', 'sys/dictType/saveDictType', params) } //  保存数据字典

export const postDictionariesData = (params) => { return fetch('Json', 'sys/dictionaries/saveDictionaries', params) } //  保存数据字典项

export const saveJob = (params) => { return fetch('Json', 'job/saveJob', params) } //  保存TJob

// OA报表查询
export const getOaReport = (params) => { return fetch('Json', 'costByFinish/allCostByFinish', params) } // OA报表查询

// 个人中心
export const postCheckPassWord = (params) => { return fetch('FormData', 'user/resetPwd', params) } // 修改密码

// 岗位变动
export const getUserIdJobChange = (params) => { return fetch('Json', 'user/page', params) } // 工号查询

// 转编

export const getTransferList = (params) => { return fetch('Json', 'userOrganization/selectUserpage', params) } // 待转编人员列表

export const postTransfer = (params) => { return fetch(('json'), 'userOrganization', params) } // 保存转编人员信息

// 职位
export const postJob = (params) => { return fetch('FormData', 'jobDict/page', params) } // 职位录入

// 保存职位
export const postSaveJob = (params) => { return fetch('Json', 'jobDict', params) } // 职位保存

// 职位

export const getJobId = (params) => { return fetch('FormData', 'job/page', params) } // 查询职位

// 岗位变动

export const postJobChange = (params) => { return fetch('json', 'userCdChange', params) } // 保存岗位变动信息

// 查询岗位变动信息

export const getJobChangeApply = (params) => { return fetch('FormData', 'userCdChange/findUserCdChangeById', params) }

// 用户审批分页

export const getUserAuditList = (params) => { return fetch('FormData', 'userAudit/page', params) }

// 查询审批备份 User

export const getUserAuditOldUser = (params) => { return fetch('FormData', 'userAudit/userAudit/oldUser', params) }

// 查询人员审批详细信息

export const getUserAudit = (params) => { return fetch('FormData', 'userAudit/findUserAuditById', params) }

// 人员审批

export const userAudit = (params) => { return fetch('FormData', 'userAudit/audit', params) }

// 保存人员回聘信息

export const postUserReturn = (params) => { return fetch('json', 'userReturn', params) }

// 查询回聘详细信息

export const getUserReturnApply = (params) => { return fetch('FormData', 'userReturn/findUserReturnById', params) }

// 保存离职信息

export const postUserQuit = (params) => { return fetch('json', 'userQuit', params) }

// 查询离职信息

export const getUserQuitApply = (params) => { return fetch('FormData', 'userQuit/findUserQuitById', params) }

// 查询转编申请信息

export const getUserOrganizationApply = (params) => { return fetch('FormData', 'userOrganization/findUserOrganizationById', params) }

// 查询待转正员工

export const getCanUserFormalUser = (params) => { return fetch('json', 'userFormal/selectUserPage', params) }

// 保存员工转正信息

export const postUserFormal = (params) => { return fetch('json', 'userFormal', params) }

// 查询转编信息

export const getUserFormalApply = (params) => { return fetch('FormData', 'userFormal/findUserFormalById', params) }

// 人员移动人员回退
export const postUserAuditRollback = (params) => { return fetch('FormData', 'userAudit/rollback', params) }

// 人员信息预处理
export const getUserAuditWill = (params) => { return fetch('FormData', 'user/userAuditWill', params) }
