var gogoService = require('../services/gogoService.js');
var Q 			= require('q');

/*
 * GET project info
 */

exports.getInfo = function(req, res) {	
    console.log('API (Route) - getInfo: '+req.params.projectID);

	gogoService.getProjectInfo(req.params.projectID).then(function(info) {
		res.json(info);
	}).catch(
        function(err) {
            res.json(500, err);
        }
    );
};