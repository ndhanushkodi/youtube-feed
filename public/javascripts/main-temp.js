//this is what ng-app will be
var wikiParty = angular.module('wikiParty', ['ngRoute']);

var errorHandler = function (data) {
	console.log('Error: ' + data);
};

wikiParty.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '../pages/home.html',
            controller  : 'searchController'
        })
        .when('/pages', {
        	templateUrl : '../pages/pages.html',
        	controller : 'pagesController'
        })
        .when('/add', {
        	templateUrl : '../pages/add.html',
        	controller : 'addController'
        })
        .when('/pages/:topic', {
        	templateUrl : '../pages/topic.html',
        	controller : 'byTopicController'
        })
        .when('/edit/:topic', {
        	templateUrl : '../pages/edit.html',
        	controller : 'editController'
        });

});

/*wikiParty.controller('mainController', function($scope, $http){
	//$scope.message = 'main controller';
	$http.get('/api/')
		.success(function(data){
			$scope.pages = data;
			console.log(data);
		})
		.error(errorHandler(data));
});*/

wikiParty.controller('pagesController', function($scope, $http) {
	//$scope.msg = "pages controller";
	$http.get('/api/pages')
		.success(function(data){
			$scope.pages = data;
			$scope.name = data[0].name;
			console.log("The name is " + data[0].name);
		})
		.error(function(data) {
			console.log("Error: " + data);
		});
	
});

wikiParty.controller('addController', function($scope, $http) {
	$scope.formData = {};

	//$scope.msg = "add controller";

	$scope.addPage = function () {
		$http.post('/api/addTopic', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				console.log("Successfully posted new page!");
			})
			.error(function(data) {
			console.log("Error: " + data);
		});
	};

});

wikiParty.controller('byTopicController', function($scope, $http, $routeParams) {
	var topicId = $routeParams.topic;
	console.log(topicId);

	$http.get('/api/pages/' + topicId)
		.success(function(data){
			console.log("Successfully found topic!");
			$scope.topic = data;
		})
		.error(function(data) {
			console.log("Error: " + data);
		});
});

wikiParty.controller('searchController', function($scope, $http, $window) {
	$scope.searchData = {};

	$scope.alertMessage = "";

	$scope.searchPage = function () {
		//Check if thing already exists in the wiki
		//Render the page if it does exist
		console.log("search page function!");

		console.log($scope.searchData.query);

		$http.post('/api/search', $scope.searchData)
			.success(function(data) {
				$scope.searchData = {};
				if (!data[0]) {
					// Redirect to the proper page
					console.log("That topic doesn't exist yet!");
					$scope.alertMessage = "That party theme does not yet exist in our database!";

				} else {
					console.log("Search result: " + data[0].name);
					//Redirect the User to the Appropriate page
					$window.location.href= "#pages/" + data[0]._id;
				};			
			})
			.error(function(data) {
			console.log("Error: " + data);
		});
	};
});

wikiParty.controller('editController', function($scope, $http, $routeParams) {
	console.log("Edit controller");

	$scope.editData = {};

	var editId = $routeParams.topic;
	$scope.editPage = function () {
		$http.post('/api/edit/' + editId, $scope.editData)
			.success( function(data) {
				$scope.editData = {};
			})
			.error(function(data) {
				console.log("Error: " + data);
		});
	};

});








