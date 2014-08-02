var config = require('../config/config.json');
var resources = require('../resources/gogo.json');

var Q = require('q');
var request = require('request');
var cheerio = require('cheerio');

/*
 * GET project info
 */

exports.getProjectInfo = function(projectID) {
	var deferred = Q.defer();

	console.log('API (Service) - getProjectInfo: '+projectID);
	console.log('API (Service) - getProjectInfo - URL: '+resources.GOGO_URL+projectID);

	request({
		uri: resources.GOGO_URL+projectID+'#pledges'
	}, function(error, response, body) {
		var $ = cheerio.load(body);

		var info = {
			projectID: projectID,
			projectName: getName($),
			balance: getBalance($),
			raised: getRaised($),
			percentage: getPercentage($),
			timeLeft: getTimeLeft($),
			updates: getUpdatesNumber($),
			comments: getCommentsNumber($),
			pledges: getPledgesNumber($)
		}

		request({
			uri: resources.GOGO_URL+projectID+'/show_tab/pledges'
		}, function(error, response, body) {
			var $$ = cheerio.load(body);

			info.lastPledges = getLastPledges($$);

			deferred.resolve(info);
		})
 
	});

	return deferred.promise;
};

function getName($) {
	return $('.i-campaign-page h1').text();
}

function getBalance($) {
	return $('.i-balance > .currency > span').text();
}

function getRaised($) {
	return $('.i-raised > .currency > span').text();
}

function getPercentage($) {
	return $('.i-bottom-row > .i-percent').text().replace('\n','').trim();
}

function getTimeLeft($) {
	return $('.i-bottom-row > .i-time-left').children().last().text();
}

function getUpdatesNumber($) {
	return $('.i-float-tab-links .i-tab').eq(1).find('.i-count').text();
}

function getCommentsNumber($) {
	return $('.i-float-tab-links .i-tab').eq(2).find('.i-count').text();
}

function getPledgesNumber($) {
	return $('.i-float-tab-links .i-tab').eq(3).find('.i-count').text();
}

function getLastPledges($) {
	var funders = [];
	$('.i-funder-row').each(function(i, elem) {
		var name = $(this).find('.i-name').text();
		var amount = $(this).find('.currency > span').text();
		if (amount == '') {
			amount = 'Private'
		}
		funders.push({
			name: name,
			amount: amount
		});
	});
	return funders;
}