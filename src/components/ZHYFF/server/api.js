import fetch from '../server'

// Bpc公司查询

export const getBpcCompanyId = (params) => { return fetch('json', 'Correspond/selectAllComp.do', params) }

// BPC部门查询

export const getBpcDepartmentId = (params) => { return fetch('json', 'Correspond/selectByComp.do', params) }

// BPC片区查询

export const getBpcAreaId = (params) => { return fetch('json', 'Correspond/selectcontrolNum.do', params) }

// BPC费用类型查询

export const getBpcCostTypeId = (params) => { return fetch('json', 'Correspond/selectCorrespondCostType.do', params) }

// 查看公司使用表

export const getBpcCompanyWithoutDept = (params) => { return fetch('json', 'BudgetUsage/selectTotComp.do', params) }

// 查看公司部门使用表

export const getBpcCompany = (params) => { return fetch('json', 'BudgetUsage/selectC0001.do', params) }

// 查看部门使用表

export const getBpcDepartment = (params) => { return fetch('json', 'BudgetUsage/selectC0002.do', params) }

// 默认查看片区使用表

export const getBpcArea = (params) => { return fetch('json', 'BudgetUsage/selectTotArea.do', params) }

// 汇率维护

export const getExchangeManegement = (params) => { return fetch('json', 'ExchangeRate/operaExchangeRate.do', params) }

// BPC版本维护表

export const getBPCVersions = (params) => { return fetch('json', 'costTable/selectBPCBudget.do', params) }

// 查询BPC版本

export const getBPCVersionsQuery = (params) => { return fetch('FormData', 'costTable/selectCostTable.do', params) }

// 导入BPC数据

export const getBPCData = (params) => { return fetch('json', 'costTable/synchronizationData.do', params) }

// 更新BPC数据

export const getUpdateBPCData = (params) => { return fetch('json', 'costTable/synchronizationFK.do', params) }

// 获取BPC年份

export const getBPCYear = (params) => { return fetch('json', 'Correspond/selectUtilYear.do', params) }
