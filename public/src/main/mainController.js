/**
 * Created by charbel on 9/24/2015.
 */
'use strict';

angular.module('dataTracking')
    .controller('mainCtrl', function($scope, $location, $http, SensorData, $socket){

        $socket.on('update', function (data){
            $scope.sensordata= data.status;
            changeStatusColor();

        });

        function changeStatusColor(){
            //if ($scope.sensordata= "ON"){
            //    $("#statusColor" ).css( "color", "green" );
            //}else {
            //    $("#statusColor" ).css( "color", "red" );
            //}
        }
});
