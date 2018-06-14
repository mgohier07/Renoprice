sap.ui.define([
	"sap/ui/demo/walkthrough/models/shared"
], function ( Shared ) {
	"use strict";

	function initProduct(){
		var oProducts = [
			{
				Name : "Product 1",
				Description : "20A",
				Price : 9.99,
				Currency : "CAD",
				Quantity: "10"
			},
			{
				Name : "Product 2",
				Description : "15A",
				Price : 5.99,
				Currency : "CAD",
				Quantity : "5"

			}
		]


		Shared.setProp("/Products", oProducts);
	}

	return {
		initProduct		: initProduct,
		setProductsModel: setProductsModel
	};


});