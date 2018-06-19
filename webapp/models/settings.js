sap.ui.define([
	"ca/metro/ui5/renoprice/walkthrough/models/shared"
], function ( Shared ) {
	"use strict";

	function initSettings() {
		var oSettings = {
			editMode 	: false,
			displayMode : true
		}

		Shared.setProp("/Settings", oSettings)
	}

function setEditMode(bEdit) {
		if (bEdit) {
			Shared.setProp("/Settings/editMode", true);
			Shared.setProp("/Settings/displayMode", false);
		}
		else{
			Shared.setProp("/Settings/editMode", false);
			Shared.setProp("/Settings/displayMode", true);
		}
		
	}

	return {
		initSettings 	: initSettings,
		setEditMode 	: setEditMode
	};


});