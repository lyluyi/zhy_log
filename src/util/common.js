export const currentTime = (val) => {
  let date = new Date(val)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
