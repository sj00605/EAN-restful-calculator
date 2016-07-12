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
			expect($rootScope.result).toBe('Something went wrong');
		});

		
	});
	
	describe('http post', function(){
		
		it('should pass addition', function() {
			var controller = createController();
			
			$rootScope.op = "ADD";
			$httpBackend
				.whenPOST('/api/calculate/ADD')
				.respond(200, 3.00);
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('3.00');

		});
		
		it('should fail addition', function(){
			
			var controller = createController();
			
			$rootScope.op = "ADD";
			
			$httpBackend
				.whenPOST('/api/calculate/ADD')
				.respond(401, 'Client error ADD');
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('Client error ADD');

		});
		
		it('should pass subtraction', function(){
			
			var controller = createController();
			
			$rootScope.op = "SUB";
			
			$httpBackend
				.whenPOST('/api/calculate/SUB')
				.respond(200, 1.00);
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('1.00');

		});
		
		it('should fail subtraction', function(){
			
			var controller = createController();
			
			$rootScope.op = "SUB";
			
			$httpBackend
				.whenPOST('/api/calculate/SUB')
				.respond(401, 'Client error SUB');
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('Client error SUB');

		});
		
		it('should pass multiplication', function(){
			
			var controller = createController();
			
			$rootScope.op = "MUL";
			
			$httpBackend
				.whenPOST('/api/calculate/MUL')
				.respond(200, 2.00);
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('2.00');

		});
		
		it('should fail multiplication', function(){
			
			var controller = createController();
			
			$rootScope.op = "MUL";
			
			$httpBackend
				.whenPOST('/api/calculate/MUL')
				.respond(401, 'Client error MUL');
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('Client error MUL');

		});
		
		it('should pass division', function(){
			
			var controller = createController();
			
			$rootScope.op = "DIV";
			
			$httpBackend
				.whenPOST('/api/calculate/DIV')
				.respond(200, 0.50);
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('0.50');

		});
		
		it('should fail division', function(){
			
			var controller = createController();
			
			$rootScope.op = "DIV";
			
			$httpBackend
				.whenPOST('/api/calculate/DIV')
				.respond(401, 'Client error DIV');
			
			$rootScope.sendPost();
			$httpBackend.flush();
			expect($rootScope.result2).toBe('Client error DIV');

		});
		
	});
	
	
	
});