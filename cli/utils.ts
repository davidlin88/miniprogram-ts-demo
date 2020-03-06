import fs = require('fs')

export function create(str = '', data = '', options = 'utf-8') {
   // console.log('str:', str);
  var path = []
  var arr = str.split('/')
  var len = arr.length
  for (var i = 0; i < len; i++) {
     //  // console.log(i)
    path.push(arr[i])
    var filename = path.join('/')
    // 判断这个文件或文件夹是否存在
    var isExist = fs.existsSync(filename)
     // console.log('isExist:', isExist)
    if (i < len - 1) {
      // 一定是文件夹
      if (isExist) {
         // console.log(`目录${filename}已存在`)
        continue
      }
       // console.log('计划创建 ' + filename + ' 文件夹')
      fs.mkdirSync(filename)
    } else {
      // 判断是文件还是文件夹
      if (arr[i].indexOf('.') > -1) {
        // 如果是文件
        if (isExist) {
           // console.log(`文件${filename}已存在，复写`)
        }
         // console.log('创建文件' + filename)
        fs.writeFileSync(filename, data, options)
      } else {
        // 如果是文件夹
        if (isExist) {
           // console.log(`目录${filename}已存在`)
          continue
        }
         // console.log('创建文件夹' + filename)
        fs.mkdirSync(filename)
      }
    }
  }

}