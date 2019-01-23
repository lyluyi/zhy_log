export const currentTime = (val) => {
  if (val === null || val === '') {
    return ''
  }
  let date = new Date(val)
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }

  return date.getFullYear() + '-' + month + '-' + day
}

export const ageCalculate = (strBirthday) => {
  let returnAge
  let strBirthdayArr = strBirthday.split('-')
  let birthYear = strBirthdayArr[0]
  let birthMonth = strBirthdayArr[1]
  let birthDay = strBirthdayArr[2]

  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        var dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误
    }
  }
  return returnAge // 返回周岁年龄
}

export const isPoneAvailable = (str) => {
  let telReg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!telReg.test(str)) {
    return false
  } else {
    return true
  }
}

export const threeMonth = (date) => {
  let d = new Date(date)
  d.setMonth((d.getMonth()) + 3)
  var yy1 = d.getFullYear()
  var mm1 = d.getMonth() + 1
  var dd1 = d.getDate() - 1
  if (mm1 < 10) {
    mm1 = '0' + mm1
  }
  if (dd1 < 10) {
    dd1 = '0' + dd1
  }
  return (yy1 + '/' + mm1 + '/' + dd1)
}

export const idCardCheck = (idCard) => {
  let year = idCard.substring(6, 10) // 截取身份证上的年
  let months = idCard.substring(10, 12) // 截取身份证上的月
  let days = idCard.substring(12, 14) // 截取身份证上的日
  let birthDay = year + '-' + months + '-' + days
  let myDate = new Date()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  var age = myDate.getFullYear() - year
  if (parseInt(month) < parseInt(months)) {
    return {
      age: age - 1,
      birthDay
    }
  } else if ((parseInt(month) === parseInt(months)) && (parseInt(days) < parseInt(day))) {
    return {
      age: age - 1,
      birthDay
    }
  } else {
    return {
      age: age,
      birthDay
    }
  }
}
