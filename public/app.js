/**
 * Created by charbel on 9/24/2015.
 */
'use strict';

var app = angular.module('dataTracking', [
    //add more if needed
    'ngRoute',
    'appServices',
    'socket.io',
    'chart.js',
    'ui.bootstrap'
]);

var appServices = angular.module('appServices', []);

app.config(function($socketProvider){
    $socketProvider.setConnectionUrl('http://localhost:8080');
});

//app.config(function ($httpProvider) {
//    $httpProvider.interceptors.push('TokenInterceptor');
//});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});