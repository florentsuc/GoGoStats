"use strict";angular.module("clientApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/:projectID",{templateUrl:"views/stats.html",controller:"StatsCtrl"})}]),angular.module("clientApp").service("phoneServices",function(){}),angular.module("clientApp").controller("StatsCtrl",["$scope","$http","$routeParams",function(a,b,c){var d=c.projectID;a.loaded=!1,b.get("/api/info/"+d).success(function(b){console.log(b),a.projectName=b.projectName,a.percentage=b.percentage,a.balance=b.balance,a.percentage=b.percentage,a.timeLeft=b.timeLeft,a.updates=b.updates,a.comments=b.comments,a.pledges=b.pledges,a.lastPledges=b.lastPledges,a.loaded=!0})}]);