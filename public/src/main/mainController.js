/**
 * Created by charbel on 9/24/2015.
 */
'use strict';

angular.module('dataTracking')
    .controller('mainCtrl', function($scope){

        // to make sensdata accessible by the child controller (s)
        $scope.parentobj = {};
        $scope.parentobj.sensordata= "";

        $scope.$watch('parentobj.sensordata', function() {
            console.log('hey, sensor data is ' + $scope.parentobj.sensordata );
            if ($scope.parentobj.sensordata === "ON"){
                console.log('hey, sensor has changed to green ' + $scope.parentobj.sensordata );
                $("#statusColor" ).css( "color", "green" );
            }else {
                console.log('hey, sensor has changed to red ' + $scope.parentobj.sensordata );
                $("#statusColor" ).css( "color", "red" );
            }
        });


        ////////////////////////////////////// TIMEPICKER
        //$scope.event = {
        //    startDate: new Date()
        //};

        $scope.startTime = new Date();
        $scope.endTime = new Date();

        $scope.changed = function () {

            $scope.start_time = $scope.startTime;

            $scope.end_time = {
                hour: $scope.endTime.getHours(),
                min: $scope.endTime.getMinutes()
            };

            console.log("start = " + $scope.start_time + "end = " +  $scope.end_time.min);
        };

        $scope.config = {
            showMeridian: true,
            hourSteps: 1,
            minuteSteps: 15
        };

        //$scope.clicked = function(e) {
        //    e.preventDefault();
        //    e.stopPropagation();
        //};
        //////////////////////////////////////////////
});
