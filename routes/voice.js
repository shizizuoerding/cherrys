var router = require('express').Router();
var AV = require('leanengine');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Voice = AV.Object.extend('Voice');

// 查询 Voice 列表
router.get('/voice', function(req, res) {
    var signatures = req.query.signature;
    console.log(signatures);
    var signature = parseInt(signatures);
    console.log(signature);
    var query = new AV.Query("Voice");
    query.equalTo('signature', signature);
    query.first().then(function(results) {
        console.log(results);
        // 处理返回的结果数据
        var result = {
            code: 200,
            data: results,
            message: 'Operation succeeded'
        }
        res.send(result);
    }, function(error) {
        console.log('Error: ' + error.code + ' ' + error.message);
    });
});

router.get('/voices', function(req, res) {
    var signatures = req.query.signature;
    var signature = parseInt(signatures);
    var query = new AV.Query("Voice");
    query.equalTo('signature', signature);
    query.first().then(function(results) {
        console.log(results);
        // 处理返回的结果数据
        var result = {
            code: 200,
            data: results,
            message: 'Operation succeeded'
        }
        res.send(result);
    }, function(error) {
        console.log('Error: ' + error.code + ' ' + error.message);
    });
});

// 新增 Voice 项目
router.post('/tts', function(req, res) {
    var content = req.body.content;
    console.log(content);
    var vcn = req.body.vcn;
    console.log(vcn);
    // var spd = req.body.spd;
    // var vol = req.body.vol;
    var timestamp = new Date().getTime();
    // var signature = faultylabs.MD5(timestamp + '&' + content + '&' + content);
    // md5.update(timestamp + '&' + vcn);
    // var signature = md5.digest('hex');
    var signatures =timestamp;

    var signature = parseInt(signatures);
    console.log(signature);
    var voice = AV.Object.new('Voice');
    voice.set('content', content);
    voice.set('vcn', vcn);
    // voice.set('spd', spd);
    // voice.set('vol', vol);
    voice.set('signature', signature);
    voice.save().then(function(results) {
        // 成功保存之后，执行其他逻辑.
        // console.log('New object created with objectId: ' + post.id);
        console.log(results);
        res.send("http://cherrys.leanapp.cn/voicess/?signature="+signature);
    }, function(err) {
        // 失败之后执行其他逻辑
        // error 是 AV.Error 的实例，包含有错误码和描述信息.
        console.log('Failed to create new object, with error message: ' + err.message);
        res.send("102");
    });
});

router.post('/ttss', function(req, res) {
    var content = req.body.content;
    console.log(content);
    var vcn = req.body.vcn;
    console.log(vcn);
    // var spd = req.body.spd;
    // var vol = req.body.vol;
    var timestamp = new Date().getTime();
    // var signature = faultylabs.MD5(timestamp + '&' + content + '&' + content);
    // md5.update(timestamp + '&' + vcn);
    // var signature = md5.digest('hex');
    var signatures =timestamp;
    var signature = parseInt(signatures);
    console.log(signature);

    var voice = AV.Object.new('Voice');
    voice.set('content', content);
    voice.set('vcn', vcn);
    // voice.set('spd', spd);
    // voice.set('vol', vol);
    voice.set('signature', signature);
    voice.save().then(function(results) {
        // 成功保存之后，执行其他逻辑.
        // console.log('New object created with objectId: ' + post.id);
        console.log(results);
        res.send("http://cherrys.leanapp.cn/voices/?signature="+signature);
    }, function(err) {
        // 失败之后执行其他逻辑
        // error 是 AV.Error 的实例，包含有错误码和描述信息.
        console.log('Failed to create new object, with error message: ' + err.message);
        res.send("102");
    });
});


router.post('/feedback', function(req, res) {
    var phoneType = req.body.phoneType;
    var feedback = AV.Object.new('Feedback');
    feedback.set('phoneType', phoneType);
    feedback.save().then(function(post) {
        // 成功保存之后，执行其他逻辑.
        // console.log('New object created with objectId: ' + post.id);
        res.send("220");
    }, function(err) {
        // 失败之后执行其他逻辑
        // error 是 AV.Error 的实例，包含有错误码和描述信息.
        console.log('Failed to create new object, with error message: ' + err.message);
        res.send(err);
    });
});
module.exports = router;
