import fetch from '../server'

const getDic = (key) => { return fetch('Form', 'sys/dictType/' + key) } // 字典查询

export default getDic
