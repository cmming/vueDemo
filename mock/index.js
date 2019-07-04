let express = require('express'); //引入express模块.
var bodyParser = require('body-parser')
const path = require('path')
let multer  = require('multer');
var cors = require('cors')




let apiData = require('./json/api.json')
let table = require('./model/table')
let file = require('./model/file')
let authorization = require('./model/authorization')

let user = require('./model/user')

// console.log(table)

let app = express(); //实例化express

app.use(cors())

// app.use(bodyParser.text());//运用中间件，对请求体的文本进行解析
app.use(express.static(path.join(__dirname, 'public')))

// app.use(multer({ dest: '/tmp/'}).array('file'));
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/api.json', (req, res) => {

    res.json(apiData)
});

//基础table的数据模拟
//分页数据
app.get('/table/demo', table.list);
//删除数据
app.delete('/table/demo/[0-9]', table.list);
//更新数据
app.put('/table/demo/[0-9]', table.update);
//保存数据
app.post('/table/demo', table.store);


app.post('/file/upload',multer({ dest: '/tmp/'}).array('file'), file.upload);


//request payload
// app.use(bodyParser.json())
app.post('/file/chunk',multer({ dest: '/tmp/'}).array('chunk'), file.chunk);


///获取用户信息
app.post('/authorization/user/info', authorization.info);


// 用户管理模块

app.get('/users', user.list);
//删除数据
app.delete('/user/[0-9]', user.list);
//更新数据
app.put('/user/[0-9]', user.update);
//保存数据
app.post('/user', user.store);






/**
 * 监听8090端口
 */
app.listen('3777', () => {
    console.log('mock server start on http://localhost:3777')
})