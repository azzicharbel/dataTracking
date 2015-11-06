/**
 * Created by charbel on 9/25/2015.
 */

'use strict';

var config = {};
config.api = {};
config.api.base_url = "";

appServices.factory('SensorData', function($http) {
    return {

        //did not call this function yet from the client
        getSensorData: function() {
            return $http.get(config.api.base_url + '/apis/dataApi/' + id);
        },

        getLastDataEntry: function(){
            return $http.get(config.api.base_url + '/apis/dataApi');
        },

        sendEmailNotification: function(){
            var tempId = "111";
            return $http.get(config.api.base_url + '/notify/' + tempId);
        }
    }
});