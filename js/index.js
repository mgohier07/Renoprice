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

        
    },



    onUI5ready: function() {
        
        ui5ready = true;
        console.log('UI5 Ready');
        
        this.initializeApp();
        this.startApp();
        
    },

    initializeApp: function() {

        //Create of fetch Database.
       // this.myDB = window.sqlitePlugin.openDatabase({name: "Renoprice.db", location: 'default'});
    },

    startApp: function(){
        // Start UI5 app
        sap.ui.require([
            "ca/metro/ui5/renoprice/localService/mockserver",
            "sap/m/Shell",
            "sap/ui/core/ComponentContainer"
            ], function (mockserver, Shell, ComponentContainer) {
            // set up test service for local testing
            // TODO: remove this when switching to a real service
            //mockserver.init();
            // initialize the UI component
            new Shell({
               app: new ComponentContainer({
                  height: "100%",
                  name: "ca.metro.ui5.renoprice",
                  settings: {
                     id: "renoprice"
                  }
               })
            }).placeAt("content");
        });
    },

};

app.initialize();

sap.ui.getCore().attachInit(function () {
    
    app.onUI5ready();
    //document.fireEvent('ui5ready');
});