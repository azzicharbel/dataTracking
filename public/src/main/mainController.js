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
                            console.log("ON STATE");
                        } else {
                            console.log("OFF STATE");
                            console.log(attrs.ngModel);
                            $( "fieldset" ).prop( "disabled", true );
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
]);
