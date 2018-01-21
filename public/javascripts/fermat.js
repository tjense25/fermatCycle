angular.module('Fermat', [])
	.controller('myCtrl', ['$scope', myCtrl]);

function myCtrl($scope) {
	console.log("fermat.app started!");
	$scope.N;
	$scope.a;
	$scope.submitted = false;
	$scope.a_list = [];
	$scope.createCircle = function() {
	   console.log("in Create Circle"); 
	   $scope.submitted = true;
	}
}
