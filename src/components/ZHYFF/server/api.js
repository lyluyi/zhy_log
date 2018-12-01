import fetch from '../server'

// Bpc公司查询

export const getBpcCompanyId = (params) => { return fetch('json', 'Correspond/selectCorrespond.do', params) }

// BPC部门查询

export const getBpcDepartmentId = (params) => { return fetch('json', 'Correspond/selectByComp.do', params) }

// BPC片区查询

export const getBpcAreaId = (params) => { return fetch('json', 'Correspond/selectCorrespond.do', params) }

// BPC费用类型查询

export const getBpcCostTypeId = (params) => { return fetch('json', 'Correspond/selectCorrespondCostType.do', params) }

// 查看公司使用表

export const getBpcCompany = (params) => { return fetch('json', 'BudgetUsage/selectC0001.do', params) }

// 查看部门使用表

export const getBpcDepartment = (params) => { return fetch('json', 'BudgetUsage/selectC0002.do', params) }

// 默认查看片区使用表

export const getBpcArea = (params) => { return fetch('json', 'BudgetUsage/selectTotArea.do', params) }
