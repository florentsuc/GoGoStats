'use strict';

angular
	.module('clientApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ngAnimate'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/:projectID', {
				templateUrl: 'views/stats.html',
				controller: 'StatsCtrl'
			});
	}
);
