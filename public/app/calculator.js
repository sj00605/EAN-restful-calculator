

angular.module('CalculatorApp', [])
    .controller('CalculatorController', function($scope, $http) {
		
		 
		 $http.get('/api/operators')
			.then(function(response) {
				//First function handles success
				//$scope.result = response.data;
				$scope.chooseOperator = response.data;
			}, function(response) {
				//Second function handles error
				$scope.result = "Something went wrong";
			});
			
		$scope.sendPost = function() {
			
			$scope.result = $scope.op;
			var data = JSON.stringify({
					"a": $scope.a,
					"b": $scope.b
				});
				
			if($scope.op === "ADD"){
			$http.post('/api/calculate/ADD', data)
				 .then(function (response){
					 $scope.result2 = response.data;
				 }, function (response) {
					 $scope.result2 = "Client error ADD";
				 });
			}
			
			if($scope.op === "SUB"){
			$http.post('/api/calculate/SUB', data)
				 .then(function (response){
					 $scope.result2 = response.data;
				 }, function (response) {
					 $scope.result2 = "Client error SUB";
				 });
			}
			
			if($scope.op === "MUL"){
			$http.post('/api/calculate/MUL', data)
				 .then(function (response){
					 $scope.result2 = response.data;
				 }, function (response) {
					 $scope.result2 = "Client error MUL";
				 });
			}
			
			if($scope.op === "DIV"){
			$http.post('/api/calculate/DIV', data)
				 .then(function (response){
					 $scope.result2 = response.data;
				 }, function (response) {
					 $scope.result2 = "Client error DIV";
				 });
			}
			
			
			
			
			
		}                 
		
		//var inputs = {};
		
		//$http.get($scope.operator).then(function (response){
			
		//	$scope.result = response.data;
		//}
        //$scope.calculate = function() {
        //    if ($scope.operator == '+') {
		//		$scope.result = $scope.a + $scope.b;
		//		console.log($scope.result);
        //        return $scope.result
        //    }
        //    if ($scope.operator == '-') {
		//		
		//		$scope.result = $scope.a - $scope.b;
       //         return $scope.result
        //    }
        //    if ($scope.operator == '*') {
				
		//		$scope.result = $scope.a * $scope.b;
        //        return $scope.result
        //    }
        //    if ($scope.operator == '/') {
				
		//		$scope.result = $scope.a / $scope.b;
        //        return $scope.result
        //    }
       // };
    });