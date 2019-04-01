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

export const exportSubTableData = (params) => { return fetch('Json', 'user/exportAllUserInfo', params) } // 表格信息导出

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

export const postTransfer = (params) => { return fetch(('Json'), 'userOrganization', params) } // 保存转编人员信息

// 职位
export const postJob = (params) => { return fetch('FormData', 'jobDict/page', params) } // 职位录入

// 保存职位
export const postSaveJob = (params) => { return fetch('Json', 'jobDict', params) } // 职位保存

// 职位

export const getJobId = (params) => { return fetch('FormData', 'job/page', params) } // 查询职位

// 岗位变动

export const postJobChange = (params) => { return fetch('Json', 'userCdChange', params) } // 保存岗位变动信息

// 查询待晋升员工
export const getCanUpUserFormalUser = (params) => { return fetch('Json', 'userFormal/selectUpUserPage', params) }

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

export const postUserReturn = (params) => { return fetch('Json', 'userReturn', params) }

// 查询回聘详细信息

export const getUserReturnApply = (params) => { return fetch('FormData', 'userReturn/findUserReturnById', params) }

// 保存离职信息

export const postUserQuit = (params) => { return fetch('Json', 'userQuit', params) }

// 查询离职信息

export const getUserQuitApply = (params) => { return fetch('FormData', 'userQuit/findUserQuitById', params) }

// 查询转编申请信息

export const getUserOrganizationApply = (params) => { return fetch('FormData', 'userOrganization/findUserOrganizationById', params) }

// 查询待转正员工

export const getCanUserFormalUser = (params) => { return fetch('Json', 'userFormal/selectUserPage', params) }

// 保存员工转正信息

export const postUserFormal = (params) => { return fetch('Json', 'userFormal', params) }

// 查询转编信息

export const getUserFormalApply = (params) => { return fetch('FormData', 'userFormal/findUserFormalById', params) }

// 人员移动人员回退
export const postUserAuditRollback = (params) => { return fetch('FormData', 'userAudit/rollback', params) }

// 人员信息预处理
export const getUserAuditWill = (params) => { return fetch('FormData', 'user/userAuditWill', params) }

// 更新健康证日期、有效证件到期日
export const updateUserAuditWill = (params) => { return fetch('FormData', 'user/updateUserInfoExpireField', params) }

// 更新岗位变动信息
export const updateUserCdChange = (params) => { return fetch('Json', 'userCdChange/updateUserCdChange', params) }

// 更新员工转正信息
export const updateUserFormal = (params) => { return fetch('Json', 'userFormal/updateUserFormal', params) }

// 更新员工转编信息
export const updateUserOrganization = (params) => { return fetch('Json', 'userOrganization/updateUserOrganization', params) }

// 更新员工离退信息
export const updateUserQuit = (params) => { return fetch('Json', 'userQuit/updateUserQuit', params) }

// 更新员工回聘信息
export const updateUserReturn = (params) => { return fetch('Json', 'userReturn/updateUserReturn', params) }

// 人员信息编辑 工号查询 获取所有信息
export const getUserIdAllInfo = (params) => { return fetch('FormData', 'user/findUserById', params) }

// 人员信息编辑 更新保存
export const updateUserIdAllInfo = (params) => { return fetch('Json', 'user/updateUserInfo', params) }

// 合同录入人员查询
export const getUserContractPage = (params) => { return fetch('FormData', 'userContract/userPage', params) }

// 保存合同信息
export const postSaveUserContractPage = (params) => { return fetch('Json', 'userContract/saveUserContract', params) }

// 人员变动详情查看

export const getJobChangeCum = (params) => { return fetch('FormData', 'userCdChange/page', params) }

export const getFullmemberCum = (params) => { return fetch('FormData', 'userFormal/page', params) }

export const getDimissonCum = (params) => { return fetch('FormData', 'userQuit/page', params) }

export const getReEmployCum = (params) => { return fetch('FormData', 'userReturn/page', params) }

export const getTransferCum = (params) => { return fetch('FormData', 'userOrganization/page', params) }

// HR系统权限默认查询
export const defaultQuery = (params) => { return fetch('FormData', 'priHR/page', params) }

// HR系统权限默保存修改
export const updateList = (params) => { return fetch('Json', 'priHR/updateList', params) }

// HR系统权限删除
export const deletePriHR = (params) => { return fetch('Json', 'priHR/deletePriHR', params) }

// 查询合同信息
export const getUserContractInfoPage = (params) => { return fetch('FormData', 'userContract/userContractPage', params) }

// 修改合同信息
export const updateUserContract = (params) => { return fetch('Json', 'userContract/updateUserContract', params) }

// 报表
export const getComReportMm = (params) => { return fetch('FormData', 'user/report/gs/month/userCdChangeInfo', params) } // 公司月度报表查询

export const getComReportMmTime = (params) => { return fetch('FormData', 'montylyStatement/getCompanyMonthlyCanSelectMonth', params) } // 公司月度报表查询时间限定

export const getComReportYy = (params) => { return fetch('FormData', 'user/report/gs/year/userCdChangeInfo', params) } // 公司月度报表查询

export const getComReportYyTime = (params) => { return fetch('FormData', 'yearlyStatement/getCompanyYearlyCanSelectYear', params) } // 公司年度报表查询时间限定

export const getGroReportMm = (params) => { return fetch('FormData', 'user/report/jt/month/userCdChangeInfo', params) } // 集团月度报表查询

export const getGroReportMmTime = (params) => { return fetch('FormData', 'montylyStatement/getGTMonthlyCanSelectMonth', params) } // 集团月度报表查询查询时间限定

export const getGroReportYy = (params) => { return fetch('FormData', 'user/report/jt/year/userCdChangeInfo', params) } // 集团月度报表查询

export const getGroReportYyTime = (params) => { return fetch('FormData', 'yearlyStatement/getGTYearlyCanSelectYear', params) } // 集团年度度报查询时间限定

export const getReportYy = (params) => { return fetch('FormData', 'yearlyStatement/page', params) } // 年度报表查询

export const getReportMm = (params) => { return fetch('FormData', 'montylyStatement/page', params) } // 月度报表查询

export const getReportMmGenerate = (params) => { return fetch('FormData', 'montylyStatement/generate', params) } // 一键月结

export const getReportYyGenerate = (params) => { return fetch('FormData', 'yearlyStatement/generate', params) } // 一键年结

// 公司月报表
export const getGSReportMM = (params) => { return fetch('FormData', '/user/report/gs/month/userCdChangeReport', params) }
// 公司月报表详情
export const getGSReportMMDetail = (params) => { return fetch('FormData', '/user/report/gs/month/userCdChangeInfoDetail', params) }

// 公司年报表
export const getGSReportYY = (params) => { return fetch('FormData', '/user/report/gs/year/userCdChangeReport', params) }

// 集团月报表
export const getJTReportMM = (params) => { return fetch('FormData', '/user/report/jt/month/userCdChangeReport', params) }
// 集团月报表详情
export const getJTReportMMDetail = (params) => { return fetch('FormData', '/user/report/jt/month/userCdChangeInfoDetail', params) }

// 集团年报表
export const getJTReportYY = (params) => { return fetch('FormData', '/user/report/jt/year/userCdChangeReport', params) }
