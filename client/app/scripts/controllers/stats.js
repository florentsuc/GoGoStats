'use strict';

angular.module('clientApp')
	.controller('StatsCtrl', function ($scope, $http, $routeParams, $timeout) {
		var projectID = $routeParams.projectID;

		$scope.loaded = false;

		$http.get('/api/info/'+projectID).success(function(info) {
			console.log(info);
			$scope.projectName = info.projectName;
			$scope.balance = info.balance;
			$scope.timeLeft = info.timeLeft;
			$scope.updates = info.updates;
			$scope.comments = info.comments;
			$scope.pledges = info.pledges;
			$scope.lastPledges = info.lastPledges;
			$scope.loaded = true;

			$timeout(function() {				
				$scope.percentage = parseInt(info.percentage.replace(',',''));
			}, 500);
		});
	}
);
