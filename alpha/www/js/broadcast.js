/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 var offinterval = null;
 var la = 0;
 var lo = 100;
var bc = {
    // Application Constructor
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	simBroadcast: function()
                 {
				   
                   var pubnub = new PubNub({
						subscribeKey: "sub-c-06a9fee8-dfb4-11e6-b4a1-02ee2ddab7fe",
						publishKey: "pub-c-fc5b9670-8df2-466e-a927-6a7494726042",
						ssl:true
						
					});

				pubnub.subscribe({
					channels: ['my_channel'],
					withPresence: true // also subscribe to presence instances.
						});
						


 offinterval = window.setInterval(function(){
  (navigator.geolocation.getCurrentPosition(onSuccess, onError))
}, 1000);	

  		 function onSuccess(position) {
        //alert('Latitude: '          + position.coords.latitude          + '\n' +
        //      'Longitude: '         + position.coords.longitude         + '\n' +
        //      'Altitude: '          + position.coords.altitude          + '\n' +
        //      'Accuracy: '          + position.coords.accuracy          + '\n' +
        //      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //      'Heading: '           + position.coords.heading           + '\n' +
        //      'Speed: '             + position.coords.speed             + '\n' +
        //      'Timestamp: '         + position.timestamp                + '\n');
		
	var newMessage = {
    "Latitude":  position.coords.latitude,
	"Longitude": position.coords.longitude 
	}
	
	if(la>100){
		la=0;
	} 
	if(lo>100){
		lo=0;
	}
	var newMessage1 = {
    "Latitude":  la++,
	"Longitude": lo++ 
	}

pubnub.publish(
    {
        message: newMessage1,
        channel: 'my_channel',
        sendByPost: false, // true to send via post
        storeInHistory: false, //override default storage options
        meta: { 
            "cool": "meta"
        }   // publish extra meta with the request
    }, 
    function (status, response) {
        if (status.error) {
            // handle error
            console.log	(status)
        } else {
            console.log("message Published w/ timetoken", response.timetoken)
        }
    }
);	
		
		
		
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


	
		

 pubnub.addListener({
    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
		console.log(msg);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        // handle status
    }
});     
					
    },
	
		initBroadcast: function()
                 {
				   
                   var pubnub = new PubNub({
						subscribeKey: "sub-c-06a9fee8-dfb4-11e6-b4a1-02ee2ddab7fe",
						publishKey: "pub-c-fc5b9670-8df2-466e-a927-6a7494726042",
						ssl:true
						
					});

				pubnub.subscribe({
					channels: ['my_channel'],
					withPresence: true // also subscribe to presence instances.
						});
						


 offinterval = window.setInterval(function(){
  (navigator.geolocation.getCurrentPosition(onSuccess, onError))
}, 1000);	

  		 function onSuccess(position) {
        //alert('Latitude: '          + position.coords.latitude          + '\n' +
        //      'Longitude: '         + position.coords.longitude         + '\n' +
        //      'Altitude: '          + position.coords.altitude          + '\n' +
        //      'Accuracy: '          + position.coords.accuracy          + '\n' +
        //      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //      'Heading: '           + position.coords.heading           + '\n' +
        //      'Speed: '             + position.coords.speed             + '\n' +
        //      'Timestamp: '         + position.timestamp                + '\n');
		
	var newMessage = {
    "Latitude":  position.coords.latitude,
	"Longitude": position.coords.longitude 
	}
	
	

pubnub.publish(
    {
        message: newMessage,
        channel: 'my_channel',
        sendByPost: false, // true to send via post
        storeInHistory: false, //override default storage options
        meta: { 
            "cool": "meta"
        }   // publish extra meta with the request
    }, 
    function (status, response) {
        if (status.error) {
            // handle error
            console.log	(status)
        } else {
            console.log("message Published w/ timetoken", response.timetoken)
        }
    }
);	
		
		
		
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


	
		

 pubnub.addListener({
    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
		console.log(msg);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        // handle status
    }
});     
					
    },
	
	
	
	
	clearint:function()
	{
	 window.clearInterval(offinterval);	
	}
		 
				 				 
};

bc.initialize();