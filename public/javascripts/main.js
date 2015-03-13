/* 
	The route configurations and the controllers for the party wiki
*/


var youFeed = angular.module('youFeed', ['ngRoute', 'App.filters']);

youFeed.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
            templateUrl : '../pages/home.html',
            controller  : 'feedController'
        })
        .when('/feed', {
            templateUrl : '../pages/feed.html',
            controller  : 'feedController'
        })
        .when('/addVideo', {
        	templateUrl : '../pages/add.html',
        	controller : 'addController'
        })

});

youFeed.controller('feedController', function($scope, $http) {


	// Get all of the pages in the database
	$http.get('/api/')
		.success(function(data){
			$scope.videos = data.videos;
			$scope.url = "https://www.youtube.com/embed/7-7knsP2n5w";
			$scope.loggedInUser = data.loggedInUser;
			// $scope.videos = data;
			// $scope.name = data[0].name;
			// console.log("The name is " + data[0].name);
		})
		.error(function(data) {
			console.log("Error: " + data);
		});


	
});

youFeed.controller('addController', function($scope, $http) {
	$scope.formData = {};
	$scope.msg = "";

	// Submit new page 
	$scope.addVideo = function () {
		console.log("in the add video method")
		$http.post('/api/addVideo', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.msg = "Added your video";
			})
			.error(function(data) {
			console.log("Error: " + data);
		});
	};

	// Hide the confirmation message when the user clicks on the form again
	$scope.hideMsg = function() {
		$scope.msg = "";
	};

});

angular.module('App.filters', []).filter('videoFilter', [function () {
    return function (videos, selectedVideo) {
        if (!angular.isUndefined(videos) && !angular.isUndefined(selectedVideo) && selectedVideo.length > 0) {
            var tempVideos = [];
            angular.forEach(selectedVideo, function (tag) {
                angular.forEach(videos, function (video) {
                    if (angular.equals(video.tagid.tag, tag)) {
                        tempVideos.push(video);
                    }
                });
            });
            console.log(tempVideos)  // before the return 
            return tempVideos;   // will show just tempVideos
            }
    };
}]);

// wikiParty.controller('byTopicController', function($scope, $http, $routeParams) {
// 	// Get the page id from the url
// 	var topicId = $routeParams.topic;

// 	// Get the requested page by topic id
// 	$http.get('/api/pages/' + topicId)
// 		.success(function(data){
// 			$scope.topic = data;
// 		})
// 		.error(function(data) {
// 			console.log("Error: " + data);
// 		});
// });

// wikiParty.controller('searchController', function($scope, $http, $window) {
// 	$scope.searchData = {};

// 	$scope.alertMessage = "";

// 	$scope.searchPage = function () {
// 		// Search by name
// 		$http.post('/api/search', $scope.searchData)
// 			.success(function(data) {
// 				$scope.searchData = {};
// 				if (!data[0]) {
// 					// Alert the user if the theme they searched for doesn't yet exist
// 					$scope.alertMessage = "That party theme does not yet exist in our database!";

// 				} else {
// 					console.log("Search result: " + data[0].name);
// 					//Redirect the User to the Appropriate page
// 					$window.location.href= "#pages/" + data[0]._id;
// 				};			
// 			})
// 			.error(function(data) {
// 				console.log("Error: " + data);
// 		});
// 	};
// });

// wikiParty.controller('editController', function($scope, $http, $routeParams, $window) {
// 	$scope.editData = {};

// 	// Get the topic id from the url
// 	var editId = $routeParams.topic;
	
// 	$scope.editPage = function () {
// 		// Post edits to the page with the corresponding id 
// 		$http.post('/api/edit/' + editId, $scope.editData)
// 			.success( function(data) {
// 				$scope.editData = {};
// 				$window.location.href= "#pages/" + editId;
// 			})
// 			.error(function(data) {
// 				console.log("Error: " + data);
// 		});
// 	};

// });








