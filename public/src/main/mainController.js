/**
 * Created by charbel on 9/24/2015.
 */
'use strict';

angular.module('dataTracking')
    .controller('mainCtrl', function($scope){

        // to make scope variable in mainCTRL  accessible by the child controller (s)
        $scope.parentobj = {};
        $scope.parentobj.sensordata= "";
        $scope.parentobj.notification= "";
        $scope.parentobj.startTime= "";
        $scope.parentobj.endTime= "";

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
        //timepicker example : http://mytechtipdemo.appspot.com/timepicker/

        $scope.parentobj.startTime = new Date();
        $scope.parentobj.endTime = new Date();

        $scope.changed = function () {
            $scope.start_time = $scope.parentobj.startTime;

            $scope.end_time = {
                hour: $scope.parentobj.endTime.getHours(),
                min: $scope.parentobj.endTime.getMinutes()
            };

        //$scope.startTime = new Date();
        //$scope.endTime = new Date();
        //
        //$scope.changed = function () {
        //    $scope.start_time = $scope.startTime;
        //
        //    $scope.end_time = {
        //        hour: $scope.endTime.getHours(),
        //        min: $scope.endTime.getMinutes()
        //    };

            // coming from the dataController (child controller)
            //var currentDataStamp = $scope.hourMin;
            //var currentDataStatus =$scope.status;
            //console.log ("currentDataStamp = " + $scope.hourMin + "currentDataStatus" + $scope.status );
            //sendNotification ($scope.start_time ,$scope.endTime, currentDataStamp, currentDataStatus);
            console.log("start = " + $scope.start_time + "end = " +  $scope.end_time.min);
        };

        $scope.config = {
            showMeridian: true,
            hourSteps: 1,
            minuteSteps: 15
        };

        $scope.clicked = function(e) {
            console.log("clicked event");
            e.preventDefault();
            e.stopPropagation();
        };
        //////////////////////////////////////////////
       // https://codeforgeek.com/2014/07/send-e-mail-node-js/
       // function sendNotification (start, end, currentTime, currentStatus){
       //     console.log("start = " + start + "end = " + end +  "currenTime = " + currentTime + "currentStatus = " + currentStatus );
       // }
})

    .directive('bootstrapSwitch', [
        //http://www.bootstrap-switch.org/methods.html
        function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();

                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                console.log(ngModel);
                                ngModel.$setViewValue(state);
                            });
                        }
                    });

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            $( "fieldset" ).prop( "disabled", false );
                            element.bootstrapSwitch('state', true, true);
                            scope.parentobj.notification = "ON";
                            console.log("ON STATE");
                        } else {
                            console.log("OFF STATE");
                            $( "fieldset" ).prop( "disabled", true );
                            element.bootstrapSwitch('state', false, true);
                            scope.parentobj.notification = "OFF"
                        }
                    });
                }
            };
        }
]);
