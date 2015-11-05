/**
 * Created by charbel on 9/24/2015.
 */

'use strict';

angular.module('dataTracking')
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        //scaleSteps and Scale step width forces the data to start to end at 1, and have a step of 1 (1x1=1)
        //Example:]This example creates a bar chart with Y-axis starting at 0 and ending at 900.
        // To do that, step width is set to 100 and number of steps are set to 9.

        ChartJsProvider.setOptions({
            animation: false,
            scaleOverride:true,
            scaleSteps:1,
            scaleStartValue:0,
            scaleStepWidth:1,
            //responsive:false,
            //scaleFontColor : "red",
            scaleLabel: function (valuePayload) {
                if (Number(valuePayload.value) === 0)
                    return 'OFF';

                if (Number(valuePayload.value) === 1)
                    return 'ON';
            }
        })
    }])

    .controller('sensorStatus', function($scope, $location, $http, SensorData, $socket){
        var liveData = [];
        var liveClock = [];

        /////////// This is Loaded First, until data start coming
        var fetchLastDataEntry = function (){
            SensorData.getLastDataEntry()
                .success(function (data){
                    console.log('data in controller' + JSON.stringify(data))
                    console.log(data[0].dateReceived);
                    var date = Date.parse(data[0].dateReceived); //parse the ISO date return from mongoDb to date in milliseconds;
                    date = new Date(date);

                    //e.g Mon Nov 02 2015
                    $scope.dateString = date.toDateString();

                    date = formatDate(date);
                    console.log('parsed date = ' + date);
                    pushData(data[0].status, date);
                    fetchData();

                })
                .error( function (error){
                    console.log(error + "Error in fetching the latest status ");
                })
        }

        fetchLastDataEntry();

        //moment().format();

        $socket.on('update', function (data){
            var dateRecieved = new Date();
            $scope.hourMin = dateRecieved; // saved in a scope variable to be accessed from the mainCtrl
            console.log("hour min =" + $scope.hourMin);
            //e.g Mon Nov 02 2015
            var dateStr = dateRecieved.toDateString();
            checkLastDataEntry(dateStr);
            //checkLastDataEntry(new Date('2011-04-11'));
            $scope.dateString = dateRecieved.toDateString();

            //var dateStr = dateRecieved.getDate() + "/" +  dateRecieved.getMonth()+1 + '/' + dateRecieved.getFullYear();
            var clockStr = formatDate(dateRecieved);

            console.log('clock' + clockStr);
            //saved in a scope variable to be accessed from the mainCtrl
            $scope.status= data.status;
            var status =  $scope.status //high or low

            checkNotification(clockStr);
            pushData(status, clockStr);
            fetchData();
        });

      //  $scope.chart.datasets[0].bars[$scope.count].fillColor = "green";

        $scope.$on("create", function(evt, chart) {
            //update the last status with color
            //console.log(chart);
            //console.log($scope.count)
            chart.datasets[0].bars[chart.datasets[0].bars.length-1].fillColor = "green";
            chart.update();
        });

        function checkLastDataEntry (current){
            //clear the chart array if the upcoming live data is not on the same day as last recorded data (lastEntryDate)
            if ($scope.dateString !== current ){
                liveData = [];
                liveClock = [];
            }
        }

        function formatDate(date){
            return date.getHours() + ":" +  date.getMinutes() + ':' +date.getSeconds();
        }

        function pushData(status, date){
            //change the value of sensordata in the mainrCtrl (parent controller)
            $scope.parentobj.sensordata = status;
            if (status === 'ON') {
                liveData.push(1);
            }
            else if (status === 'OFF'){
                liveData.push(0);
            }
            liveClock.push(date);
        }

        function fetchData() {
            $scope.labels = liveClock;
            $scope.series = ['Time'];
            $scope.data = [
                liveData
            ];
        }

        function checkNotification(clockStr) {
            console.log("Inside CheckNotification");
            console.log($scope.parentobj.notification);
            if ($scope.parentobj.notification == 'ON') {
                console.log($scope.parentobj.notification);
                // setting the date to arbitrary date but keeping th time of data received
                //and the time set for notification so we could able to do thetime comparison
                var strIncomingTime = Date.parse('01/01/2011 ' + clockStr);
                var strStartTime = Date.parse('01/01/2011 ' + formatDate($scope.parentobj.startTime));
                var strEndTime = Date.parse('01/01/2011 ' + formatDate($scope.parentobj.endTime));

                console.log('strStartTime = ' + strStartTime);
                console.log('strIncomingTime = ' + strIncomingTime);
                console.log('strEndTime = ' + strEndTime);

                //if the time of incoming data is in between the time set for notification then send a notification
                if (strStartTime <= strIncomingTime <= strEndTime) {
                    console.log(' time comparison');
                    SensorData.sendEmailNotification()
                        .success(function (data) {
                            console.log("Notification was sent to User Id " + data)

                        })
                        .error(function (error) {
                            console.log(error + "Failed to send notification");
                        })
                }
            }
        }
        //$scope.$watch('parentobj.notification', function() {
        //    console.log('Notification  ' + $scope.parentobj.notification );
        //    if ($scope.parentobj.sensordata === "ON"){
        //        console.log('hey, sensor has changed to green ' + $scope.parentobj.sensordata );
        //        $("#statusColor" ).css( "color", "green" );
        //    }else {
        //        console.log('hey, sensor has changed to red ' + $scope.parentobj.sensordata );
        //        $("#statusColor" ).css( "color", "red" );
        //    }
        //});
    });

