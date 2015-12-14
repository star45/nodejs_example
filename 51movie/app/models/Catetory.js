var mongoose = require('mongoose');
var CatetorySchema = require('../schemas/catetory');

//使用mongoose的模型方法编译生成模型
var Catetory = mongoose.model('Catetory',CatetorySchema);

//将模型构造函数导出
module.exports = Catetory;