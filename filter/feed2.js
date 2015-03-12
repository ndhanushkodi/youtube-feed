var App = angular.module('videoApp', ['ngResource', 'App.filters']);
  App.controller('VideoCtrl', ['$scope', function ($scope) {
    $scope.selectedVideo = [];

    $scope.videoList = [{
        id: 1,
        tag: 'Health'
    }, {
        id: 2,
        tag: 'Science'
    }, {
        id: 3,
        tag: 'Politics'
    },  {
        id: 4,
        tag: 'Sports'
    },  {
        id: 5,
        tag: 'Business'
    },  {
        id: 6,
        tag: 'Travel'
    },  {
        id: 7,
        tag: 'Technology'
    }];

    $scope.videos = [{
        title: 'Brett',
        description: 'Software Engineer',
        url: 'this is 1',
        tagid: {
            id: 1,
            tag: 'Health'
        }
    }, {
        title: 'Steven',
        description: 'Database Administrator',
        url: 'this is 2',
        tagid: {
            id: 3,
            tag: 'Politics'
        }
    }, {
        title: 'ChangedJim',
        description: 'Designer',
        url: 'this is 3',
        tagid: {
            id: 2,
            tag: 'Science'
        }
    }, {
        title: 'Michael',
        description: 'Front-End Developer',
        url: 'this is 4',
        tagid: {
            id: 7,
            tag: 'Technology'
        }
    }, {
        title: 'Josh',
        description: 'Network Engineer',
        url: 'this is 5',
        tagid: {
            id: 3,
            tag: 'Politics'
        }
    }];


    // if video selected, then add it to the selcted video vector

    $scope.setSelectedVideo = function () {
        if (_.contains($scope.selectedVideo, this.tagid.id)) {
            $scope.selectedVideo = _.without($scope.selectedVideo, this.tagid.id);
        } else {
            $scope.selectedVideo.push(this.tagid.id);
        }
    };

}]);

angular.module('App.filters', []).filter('videoFilter', [function () {
    return function (videos, selectedVideo) {
        if (!angular.isUndefined(videos) && !angular.isUndefined(selectedVideo) && selectedVideo.length > 0) {
            var tempVideos = [];
            angular.forEach(selectedVideo, function (id) {
                angular.forEach(videos, function (video) {
                    if (angular.equals(video.tagid.id, id)) {
                        tempVideos.push(video);
                    }
                });
            });
            console.log(tempVideos)  // before the return 
            return tempVideos;   // will show just tempVideos
            }
    };
}]);
