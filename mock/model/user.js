let Mock = require('mockjs'); //引入mock模块
let Random = Mock.Random;


const user = {
    //获取列表
    list: (req, res) => {
        let statusCode = 200
        if (req.method === 'DELETE') {
            statusCode = 204
        }
        console.log(req.method)
        var result = {
            "total": Random.integer(60, 100),
            "per_page": 15,
            "current_page": 1,
            "last_page": 4,
            "first_page_url": "http://laravel.app?page=1",
            "last_page_url": "http://laravel.app?page=4",
            "next_page_url": "http://laravel.app?page=2",
            "prev_page_url": null,
            "path": "http://laravel.app",
            "from": 1,
            "to": 15,
            "data": []
        }
        for (let i = 1; i <= 10; i++) {
            const tmp = {
                'id|+1': i,
                name: Random.name(),
                age:Random.natural( 16, 26 )
            };
            result.data.push(tmp)

        }
        res.status(statusCode).json(Mock.mock(result));
    },
    update: (req, res) => {
        res.status(204).json(Mock.mock({}));
    },
    store: (req, res) => {
        console.log(req.body)
        res.status(201).json(Mock.mock(req.body));
    }
}

module.exports = user