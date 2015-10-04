/**
 * Created by charbel on 9/24/2015.
 */

'use strict';

angular.module('dataTracking')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainCtrl'
            });
    });