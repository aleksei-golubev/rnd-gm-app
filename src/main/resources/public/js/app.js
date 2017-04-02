var app = angular.module('app', []);

app.controller('RandomPositionController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $window.positionGetterScope = $scope;

    $scope.position = {lat: 0, lng: 0};

    $scope.draw = function () {
        $http.get('/position/random').then(function(response) {
            $scope.position = response.data;
            $scope.timer = setTimeout($scope.draw, 1000);
        });
    }

    $scope.stop = function() {
        clearTimeout($scope.timer);
    }
}]);

app.controller('GoogleMapController', ['$scope', '$window', function($scope, $window) {
    $scope.initialize = function() {
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            scrollwheel: false,
            zoom: 2
        });
    }

    google.maps.event.addDomListener(window, 'load', $scope.initialize);

    $window.positionGetterScope.$watch("position", function(newValue, oldValue) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: newValue,
            title: '['+ newValue.lat + ', ' + newValue.lng + ']'
        });
    });
}]);
