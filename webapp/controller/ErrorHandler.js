sap.ui.define([
		"sap/ui/base/Object",
		"sap/m/MessageBox"
	], function (UI5Object, MessageBox) {
		"use strict";

		return UI5Object.extend("ca.metro.ui5.renoprice.controller.ErrorHandler", {

			/**
			 * Handles application errors by automatically attaching to the model events and displaying errors when needed.
			 * @class
			 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
			 * @public
			 * @alias sap.ui.demo.masterdetail.controller.ErrorHandler
			 */
			constructor : function (oComponent, oModel) {
				this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
				this._oComponent = oComponent;
				this._oModel = oModel;
				this._bMessageOpen = false;
				this._sErrorText = this._oResourceBundle.getText("errorText");
				this._sErrorTitle = this._oResourceBundle.getText("errorTitle");

				this._oModel.attachMetadataFailed(function (oEvent) {
					var oParams = oEvent.getParameters();
					this._showServiceError(oParams.response);
				}, this);

				this._oModel.attachRequestFailed(function (oEvent) {
					var oParams = oEvent.getParameters();
					// An entity that was not found in the service is also throwing a 404 error in oData.
					// We already cover this case with a notFound target so we skip it here.
					// A request that cannot be sent to the server is a technical error that we have to handle though
					if	(oParams.response.statusCode !== "404" || 
						(oParams.response.statusCode === "404" && oParams.response.responseText.indexOf("Cannot POST") === 0) ||
						(oParams.response.statusCode === "404" && oParams.response.responseText.indexOf("Resource not found for the segment") >= 0)) {
						this._showServiceError(oParams.response);
					}
				}, this);
			},

			/**
			 * Shows a {@link sap.m.MessageBox} when a service call has failed.
			 * Only the first error message will be display.
			 * @param {string} sDetails a technical error to be displayed on request
			 * @private
			 */
			_showMetadataError: function(sDetails) {
				MessageBox.show(
					this._sErrorText, {
					icon: MessageBox.Icon.ERROR,
					title: this._sErrorTitle,
					details: sDetails,
					styleClass: this._oComponent.getContentDensityClass(),
					actions: [MessageBox.Action.RETRY, MessageBox.Action.CLOSE],
					onClose: function(sAction) {
						if (sAction === MessageBox.Action.RETRY) {
							this._oModel.refreshMetadata();
						}
					}.bind(this)
					}
				);
			},

			/*
			 * Shows a {@link sap.m.MessageBox} when a service call has failed.
			 * Only the first error message will be display.
			 * @param {string} sDetails a technical error to be displayed on request
			 * @private
			 */
			_showServiceError : function (e) {
				var that = this;
				if (this._bMessageOpen) {
					return;
				}
				this._bMessageOpen = true;
				
				var oErrorDetails = this._parseError(e);
			
				MessageBox.show(oErrorDetails.sMessage, {
					icon: MessageBox.Icon.ERROR,
					title: this._oResourceBundle.getText("modelErrorPopupTitle"),
					actions: [MessageBox.Action.CLOSE],
					defaultAction: MessageBox.Action.CLOSE,
					details: oErrorDetails.sDetails,
					onClose: function() {
	    				that._bMessageOpen = false;
					}
				});
			},
			
			/*
			* 
			*/
			getErrorContent: function(oParameter) {
				return this._parseError(oParameter).sMessage;
			},
	    	
			/*
			 * 
			 */
	    	_parseError: function(oParameter) {
				var sMessage = "",
				sDetails = "",
				oEvent = null,
				oResponse = null,
				oError = {},
				that = this;
				
				if (oParameter.getParameters()) {
					oEvent = oParameter;
					sMessage = oEvent.getParameter("response").message;
					sDetails = oEvent.getParameter("response").responseText;
				} else {
					oResponse = oParameter;
					sMessage = oResponse.message;
					sDetails = oResponse.response.body;
				}
				
				if (jQuery.sap.startsWith(sDetails, "{\"error\":")) {
					var oErrModel = new sap.ui.model.json.JSONModel();
					oErrModel.setJSON(sDetails);
					sMessage = oErrModel.getProperty("/error/message/value");
					// check for backend error message
					var parts = sMessage.split(":"), errdet = oErrModel.getProperty("/error/innererror/errordetails");
					
					if (parts.length === 3 && parts[0].length === 1 && parts[2].split(" ")[0].length === 3) {
						var code = sMessage;
						if (errdet) {
							errdet.forEach(function(det) {
							if (det.code === "/IWBEP/CX_SD_GEN_DPC_BUSINS" && det.message !== code) {
								sMessage = det.message;
							}
							});
						}
					} 
					else {
						if (errdet) {
							errdet.forEach(function(det) {
							if (det.message !== "" && sMessage.indexOf(det.message) < 0 && !that.isGenericErrorMsg(det)) {
								sMessage += (sMessage === "" ? "" : " ") + det.message;
							}
							});	    				
						}
					}
				}
				else if (sDetails.indexOf("<message>") > 0) {
					var xml = sDetails.split("<message>");
					sMessage = xml[xml.length - 1].split("</message>")[0];
				}
				
				oError.sDetails = sDetails;
				oError.sMessage = sMessage;
				return oError;
	    	},
	    	
	    	/*
	    	 *
	    	 */
			isGenericErrorMsg: function(obj) {
				return obj.code === "/IWBEP/CX_SD_GEN_DPC_BUSINS" && obj.message === this._oResourceBundle.getText("genericErrorText");
			}

		});

	}
);