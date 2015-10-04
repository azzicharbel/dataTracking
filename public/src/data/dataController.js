/**
 * Created by charbel on 9/24/2015.
 */

'use strict';

angular.module('dataTracking')
    .controller('graphCtrl', function($scope, $location, $http, SensorData, $socket){
        SensorData.getSensorData()
            .success(function (data){
                $scope.sensordata = 'sensor data:' + data;
            })

        $socket.on('update', function (data){
            $scope.sensordata=data;
        });

    });

