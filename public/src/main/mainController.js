/**
 * Created by charbel on 9/24/2015.
 */
'use strict';

angular.module('dataTracking')
    .controller('mainCtrl', function($scope, $location, $http, SensorData, $socket){

        $socket.on('update', function (data){
            $scope.sensordata=data;
        });

});
