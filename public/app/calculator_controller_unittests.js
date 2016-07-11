describe('calculator controller tests', function(){
	
	var $httpBackend, $rootScope, createController, operatorJSON;
	
	beforeEach(angular.mock.module('CalculatorApp'));
	
	beforeEach(inject(function($injector){
		
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		
		operatorJSON = $httpBackend.when('GET', '/api/operators')
                            .respond(
							{
								"id": "1",
								"name": "ADD"
							}, {
								"id": "2",
								"name": "SUB"
							}, {
								"id": "3",
								"name": "MUL"
							}, {
								"id": "4",
								"name": "DIV"
							});
		
		var $controller = $injector.get('$controller');
		
	    createController = function() {
			return $controller('CalculatorController', {'$scope' : $rootScope });
		};
		
	}));
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
    });
	
	describe('http get', function(){
		
		it('should ensure that the http get send the json back', function() {

			$httpBackend.expectGET('/api/operators');
			var controller = createController();
			$httpBackend.flush();
		});
		
		
		it('should fail authentication', function() {
	
			operatorJSON.respond(401, '');

			$httpBackend.expectGET('/api/operators');
			var controller = createController();
			$httpBackend.flush();
			console.log($rootScope.result);
			expect($rootScope.result).toBe('Something went wrong');
		});

		
	});
	
	describe('http post', function(){
		
		it('should pass addition', function() {

			var controller = createController();
			
			$httpBackend
				.expectPOST('/api/calculate/ADD', {"a": "2","b": "1", "op" : "ADD"})
				.respond(3.00);
			
			$rootScope.sendPost();
			
			console.log(controller);
			expect($rootScope.result2).toEqual(3.00);
			
			$httpBackend.flush();
			

		});
	});
	
	
	
});