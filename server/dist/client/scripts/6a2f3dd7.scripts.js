"use strict";angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngAnimate"]).config(["$routeProvider",function(a){a.when("/:projectID",{templateUrl:"views/stats.html",controller:"StatsCtrl"})}]),angular.module("clientApp").service("phoneServices",function(){}),angular.module("clientApp").controller("StatsCtrl",["$scope","$http","$routeParams","$timeout",function(a,b,c,d){var e=c.projectID;a.loaded=!1,b.get("/api/info/"+e).success(function(b){console.log(b),a.projectName=b.projectName,a.balance=b.balance,a.timeLeft=b.timeLeft,a.updates=b.updates,a.comments=b.comments,a.pledges=b.pledges,a.lastPledges=b.lastPledges,a.loaded=!0,d(function(){a.percentage=b.percentage},0)})}]);