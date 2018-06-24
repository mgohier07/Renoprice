sap.ui.define([
	"sap/m/Button"
], function(Button) {
	"use strict";

	var instance = null;
	var resourceBundle = null;
	
	/*
	 * 
	 */
	function init(comp) {
		instance = comp;
		resourceBundle = comp.getModel("i18n").getResourceBundle();

	}
	
	function initRouter() {
		// initialize router instance and launch first route target
		instance.getRouter().initialize();		
	}

	/*
	 * 
	 */
	function getInstance() {
		return instance;
	}
	
	function getModel(sModel){
		return getInstance().getModel(sModel);
	}
	
	 
	function getText(textId, parameters) {
		return parameters ? resourceBundle.getText(textId, parameters) : resourceBundle.getText(textId);
	}
	
	function createButton(mParameter){
		
		var button = new Button({
			text: mParameter.text,
			icon: mParameter.icon,
			press: function () {
				mParameter.dialog.close();
				if(mParameter.onPressAction) {
					mParameter.onPressAction();
				}
			}
		});
		if(mParameter.styleClass)
		{
			button.addStyleClass(mParameter.styleClass);
		}
		
		return button;
		
	}
	
	function readModel(oModelParam){
		
		//Key construct = vide si on a pas de clé d'assignée
		var sKeyConstruct = oModelParam.key ? "(" + oModelParam.key + ")" : "";
		
		getModel(oModelParam.modelName).read("/" + oModelParam.collectionName + sKeyConstruct, {
			urlParameters: oModelParam.urlParameters,
			success: function(e) {
				if(oModelParam.resolve){
					oModelParam.resolve({ success: true, values: e });
				}
				else{
					oModelParam.callbackFunction(e);
				}
			},	
			error: function() {
				if(oModelParam.resolve){
					oModelParam.resolve({});
				}
				else{
					oModelParam.callbackFunction();
				}
			}
		});
	}
	
	
	return {
		init: init,
		initRouter: initRouter,
		getInstance : getInstance,
		getModel:getModel,
		getText: getText,
		createButton: createButton,
		readModel: readModel
	};
	
});