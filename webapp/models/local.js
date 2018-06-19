sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (UI5Object, JSONModel) {
	"use strict";

	return UI5Object.extend("ca.metro.ui5.renoprice.model.local", {

		model: null,
		
		/*
		 * 	
		 */
		constructor: function(data) {
			this.model = new JSONModel(data);
		},

		/*
		 * 
		 */
		getModel: function() {
			return this.model;		
		},
		
		/*
		 * 
		 */
		setProp: function(name, value) {
			// don't forget leading slash in the name (ex.: "/field")
			this.model.setProperty(name, value);
		},

		/*
		 * 
		 */
		setPropList: function(list) {
			var that = this;
			list.forEach(function(prop) {
				// don't forget leading slash in the name (ex.: "/field")
				that.model.setProperty(prop.name, prop.value);	
			});
		},

		/*
		 * 
		 */
		setPropMap: function(map) {
			for (var prop in map) {
			    if (map.hasOwnProperty(prop)) {
					this.model.setProperty(prop, map[prop]);	
			    }
			}
		},
	
		/*
		 * 
		 */
		getProp: function(property) {
			// don't forget leading slash (ex.: "/field")
			return this.model.getProperty(property);
		},

		/*
		 * 
		 */
		setData: function(data) {
			return this.model.setData(data);
		},
	
		/*
		 * 
		 */
		getData: function() {
			return this.model.getData();
		}
    	
    	
	});
	
});