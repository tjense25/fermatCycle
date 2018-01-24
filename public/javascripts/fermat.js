angular.module('Fermat', [])
	.controller('myCtrl', ['$scope', myCtrl]);

function myCtrl($scope) {
	console.log("fermat.app started!");

	var canvas = document.getElementById('canvas');
	var context= canvas.getContext('2d');
	var WIDTH = 700;
	var HEIGHT = 620;
	var R = 300;
	var POINTWEIGHT = 2;

	$scope.N;
	$scope.a;
	$scope.submitted = false;
	$scope.messages = [];
	$scope.points = [];
	$scope.cycle = [];
	$scope.createCircle = function() {
	   console.log("in Create Circle"); 
	   $scope.messages = [];
	   $scope.submitted = true;

	   $scope.getPoints();
	   if($scope.gcd($scope.N, $scope.a) == 1) {
	   	$scope.getCycle();
		var cycle_length = $scope.cycle.length - 1;
		if (($scope.N - 1) % cycle_length == 0) {
		   $scope.messages.push("Cylce length is " + cycle_length);
		   $scope.messages.push(($scope.N - 1) + " is divisible by " + cycle_length);
		   $scope.messages.push("Therefore, " + $scope.N + " is Probably Prime!");
		} else {
		   $scope.messages.push("Cylce length is " + cycle_length);
		   $scope.messages.push(($scope.N - 1) + " is not divisible by " + cycle_length);
		   $scope.messages.push("Therefore, " + $scope.N + " is Composite!");
		}
	   } else {
		$scope.messages.push($scope.N + " and " + $scope.a + " are not relatively Prime");
		$scope.messages.push("Therefore, " + $scope.N + " is Composite!");
	   }
	}

	$scope.gcd = function(a, b) {
	   console.log(a, b);
	   if (b == 0) return a;
	   else return $scope.gcd(b, a % b);
	}

	$scope.getPoints = function() {
	   $scope.points = [];
	   var angle = 2*Math.PI / ($scope.N - 1);
	   for (var i = 0; i < $scope.N - 1; i++) {
		var point = {
		   x : R*Math.cos(i*angle),
		   y : R*Math.sin(i*angle)
		}
		$scope.points.push(point);
	   }
	   $scope.drawPoints();
	}		

	$scope.getCycle = function() {
	   $scope.cycle = [];
	   $scope.cycle.push(0);
	   var b = 1;
	   do {
		b = ($scope.a * b) % $scope.N;
		$scope.cycle.push(b - 1);
	   } while (b != 1);	
	   $scope.drawLines();	   
	}

	$scope.drawCircle = function() {
	   context.beginPath();
	   context.arc(WIDTH/2, HEIGHT/2, R, 0, 2*Math.PI);
	   context.strokeStyle = "white";
	   context.stroke();
	}

	$scope.drawPoints = function() {
	   console.log("in drawPoints!");
	   context.clearRect(0, 0, WIDTH, HEIGHT);
	   $scope.drawCircle();

	   for (var i = 0; i < $scope.points.length; i++) {
		context.beginPath();
		var point = $scope.points[i];
		var x = WIDTH/2 + point.x;
		var y = HEIGHT/2 + point.y;
		context.arc(x, y, POINTWEIGHT, 0, 2*Math.PI);
		context.fillStyle = "white";
		context.fill();
	   }
	}

	$scope.drawLines = function() {
	   console.log("in drawLines!");
	   for (var i = 0; i < $scope.cycle.length - 1; i++) {
		var point1 = $scope.points[$scope.cycle[i]];
		var point2 = $scope.points[$scope.cycle[i + 1]];
		context.beginPath();
		context.moveTo(WIDTH/2 + point1.x, HEIGHT/2 + point1.y);
		context.lineTo(WIDTH/2 + point2.x, HEIGHT/2 + point2.y);
		context.strokeStyle = "#FF69B4";
		context.stroke();
	   }
	}
		
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	$scope.drawCircle();
}
