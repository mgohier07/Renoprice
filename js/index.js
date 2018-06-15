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
var app = {

    cordovaReady : false,
    ui5ready: false,
    myDB    : null,  

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
        this.cordovaReady = true;
        if (this.ui5ready) {
            this.startApp();
        }

    },

    onUI5ready: function() {
        
        ui5ready = true;
        console.log('UI5 Ready');
        if (this.cordovaReady) {
            this.initializeApp();
            this.startApp();
        }
    },

    initializeApp: function() {

        //Create of fetch Database.
        this.myDB = window.sqlitePlugin.openDatabase({name: "Renoprice.db", location: 'default'});
    },

    startApp: function(){
        // Start UI5 app
        sap.ui.require([
            "sap/ui/demo/masterdetail/localService/mockserver",
            "sap/m/Shell",
            "sap/ui/core/ComponentContainer"
            ], function (mockserver, Shell, ComponentContainer) {
            // set up test service for local testing
            // TODO: remove this when switching to a real service
            mockserver.init();
            // initialize the UI component
            new Shell({
               app: new ComponentContainer({
                  height: "100%",
                  name: "sap.ui.demo.masterdetail",
                  settings: {
                     id: "masterdetail"
                  }
               })
            }).placeAt("content");
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


sap.ui.getCore().attachInit(function () {
    
    app.onUI5ready();
    //document.fireEvent('ui5ready');
});