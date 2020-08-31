const bdd = require('../mysqlConfig');

exports.postMessage = (req, res, next) => {
    console.log(req.file)
    console.log('routeok');
}