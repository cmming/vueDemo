var fs = require("fs");


const file = {
    upload: (req, res) => {

        console.log(req, req.files[0], __dirname + "/"); // 上传的文件信息

        var des_file = __dirname + "/../public/tmp/" + req.files[0].originalname;
        fs.readFile(req.files[0].path, function(err, data) {
            fs.writeFile(des_file, data, function(err) {
                if (err) {
                    //    console.log( err );
                } else {
                    var response = {
                        message: 'File uploaded successfully',
                        filename: req.files[0].originalname,
                        url: "http://localhost:3777/tmp/" + req.files[0].originalname
                    };
                }
                //    console.log( response );
                res.header("Content-Type", "application/json; charset=utf-8")
                res.end(JSON.stringify(response));
            });
        })
    },
    chunk: (req, res) => {
        var result = { "data": { "end_offset": 1024*1024, "session_id": "61db8102-fca6-44ae-81e2-a499d438e7a5" }, "status": "success" }

        let params = '',
            data = '';
        if (req.get('Content-Type') === 'application/json') {
            req.on('data', (chunk) => { data += chunk; });
            req.on('end', () => {
                params = JSON.parse(data);
                console.log(params)
                if (params.phase === "start") {
                    res.status(200).json(result);
                } else if (params.phase === "finish") {
                    //合并文件
                    res.status(200).json(result);
                }
            });
        } else {
            // console.log(req.file,req.body)
            var des_file = __dirname + "/../public/tmp/" + req.files[0].filename;
            fs.readFile(req.files[0].path, function(err, data) {
                fs.writeFile(des_file, data, function(err) {
                    if (err) {
                        //    console.log( err );
                    } else {
                        var response = { "status": "success" };
                    }
                    //    console.log( response );
                    res.header("Content-Type", "application/json; charset=utf-8")
                    res.end(JSON.stringify(response));
                });
            })
        }

    }
}


module.exports = file