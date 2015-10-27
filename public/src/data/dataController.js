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

            //var date = data.date;     //date data received
            var dateRecieved = new Date();
            //var dateStr = dateRecieved.getDate() + "/" +  dateRecieved.getMonth()+1 + '/' + dateRecieved.getFullYear();
            var clockStr = formatDate(dateRecieved);

            //console.log('date' + dateStr);
            console.log('clock' + clockStr);
            var status =  data.status //high or low

            //console.log ("current date = " + date);
            //console.log(liveData);
            //console.log(liveDates);

            pushData(status, clockStr);
            fetchData();
        });

      //  $scope.chart.datasets[0].bars[$scope.count].fillColor = "green";

        $scope.$on("create", function(evt, chart) {
            //update the last status with color

            console.log(chart);
            //console.log($scope.count)
            chart.datasets[0].bars[chart.datasets[0].bars.length-1].fillColor = "green";
            chart.update();
        });

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
    });

