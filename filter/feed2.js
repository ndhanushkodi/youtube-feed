var App = angular.module('videoApp', ['App.filters']);
  App.controller('VideoCtrl', ['$scope', function ($scope) {
    $scope.selectedVideo = [];

    $scope.videoList = [{
        
        tag: 'Health'
    }, {
        
        tag: 'Science'
    }, {
       
        tag: 'Politics'
    },  {
        
        tag: 'Sports'
    },  {
        
        tag: 'Business'
    },  {
       
        tag: 'Travel'
    },  {
     
        tag: 'Technology'
    }];

    $scope.videos = [{
        title: 'Brett',
        description: 'Software Engineer',
        url: 'this is 1',
        tagid: {
            tag: 'Health'
        }
    }, {
        title: 'Steven',
        description: 'Database Administrator',
        url: 'this is 2',
        tagid: {
            tag: 'Politics'
        }
    }, {
        title: 'ChangedJim',
        description: 'Designer',
        url: 'this is 3',
        tagid: {
            tag: 'Science'
        }
    }, {
        title: 'Michael',
        description: 'Front-End Developer',
        url: 'this is 4',
        tagid: {
            tag: 'Technology'
        }
    }, {
        title: 'Josh',
        description: 'Network Engineer',
        url: 'this is 5',
        tagid: {
            tag: 'Politics'
        }
    }];


    // if video selected, then add it to the selcted video vector

    $scope.setSelectedVideo = function () {
        if (_.contains($scope.selectedVideo, this.tagid.tag)) {
            $scope.selectedVideo = _.without($scope.selectedVideo, this.tagid.tag);
        } else {
            $scope.selectedVideo.push(this.tagid.tag);
        }
    };

}]);

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