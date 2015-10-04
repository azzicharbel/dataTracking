/**
 * Created by charbel on 9/24/2015.
 */

'use strict';

angular.module('dataTracking')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/data/dataController.html',
                controller: 'graphCtrl'
            });
    });

