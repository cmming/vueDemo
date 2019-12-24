import Vue from 'vue'

// eslint-disable-next-line
function add1(state, row, tableIndex, columnIndex, filterKey) {
  // console.log(state, row,tableIndex, columnIndex, filterKey,2)
  return 1
}

/***
 * state 当前的这个值
 * row   一列的所有数据
 * tableIndex  用于寻找 多语言
 * columnIndex 列的key 用于多语言
 * filterKey   转换函数 用于寻找 转换函数
 */
Vue.filter('changeTableColumns',
  function (state, row, tableIndex, columnIndex, filterKey) {
    // eslint-disable-next-line
        // console.log(state, row,tableIndex, columnIndex, filterKey)
    if (filterKey === 'add1') {
      return add1(state, row, tableIndex, columnIndex)
    }
    // return eval(filterKey+'()')
    // return state, tableIndex, columnIndex, filterKey
  })

Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})
