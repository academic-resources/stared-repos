/*Validates fields on the savings page*/
function validateFields(){
	document.getElementById("transactionError").innerHTML = "";
	document.getElementById("amountError").innerHTML ="";
	var numTransactions = document.forms["calculateCost"]["numTransactions"].value;
	var amountProcessed = document.forms["calculateCost"]["amountProcessed"].value;
	var validTransactions;
	var validAmount;
	if (numTransactions > 0 || isNaN(numTransactions) == false){
		validTransactions = "yes";
	}
	else {
		validTransactions = "no";
		document.getElementById("transactionError").innerHTML ="Please enter a number of transactions greater than zero.";
	}
	if (amountProcessed > 0 || isNaN(amountProcessed) == false){
		validAmount = "yes";
	}
	else {
		validAmount = "no";
		document.getElementById("amountError").innerHTML ="Please enter an amount greater than zero.";

	}
	if (validTransactions == "yes" && validAmount == "yes") {
		calculateCost(numTransactions, amountProcessed);
	}
} 
/*Validates fields for widget that sends data to savings page*/
function validateFieldsWidget(){
	document.getElementById("transactionError").innerHTML = "";
	document.getElementById("amountError").innerHTML ="";
	var numTransactions = document.forms["calculateCost"]["numTransactions"].value;
	var amountProcessed = document.forms["calculateCost"]["amountProcessed"].value;
	var typeTransactions = document.forms["calculateCost"]["typeTransactions"].value;
	var validTransactions;
	var validAmount;
	if (numTransactions > 0 && isNaN(numTransactions) == false){
		validTransactions = "yes";
	}
	else {
		validTransactions = "no";
		document.getElementById("transactionError").innerHTML ="Please enter a number of transactions greater than zero.";
	}
	if (amountProcessed > 0 && isNaN(amountProcessed) == false){
		validAmount = "yes";
	}
	else {
		validAmount = "no";
		document.getElementById("amountError").innerHTML ="Please enter an amount greater than zero.";

	}
	if (validTransactions == "yes" && validAmount == "yes") {
		document.cookie = ":" + "spWidgetStart" + ":" + numTransactions + ":" + amountProcessed + ":" + typeTransactions;
		window.location.assign("http://simplepay.marketeeringgroupdev.com/savings/");
	}
} 

/*This function reads the cookie info and calculates the cost on the savings page*/
function widgetInfo(){
	var widgetArray = new Array();
	widgetArray = document.cookie.split(":");
	var widgInd = widgetArray.indexOf("spWidgetStart");
	var numTransactions = widgetArray[widgInd +1];
	var amountProcessed = widgetArray[widgInd + 2];
	var typeTransactions = widgetArray[widgInd + 3];
	if(numTransactions>0){
		document.getElementById("numTransactions").value = numTransactions;
		document.getElementById("amountProcessed").value = amountProcessed;
		var costSP;
		var costPayPal;
		var costSquare;
		var costStripe;
		var costAuthorize;
		var costBrainTree;
		if (typeTransactions == "swiped"){
			costSP = Math.round(0.1 * numTransactions + 0.019 * amountProcessed + 30);
			costSquare = Math.round(0.0275 * amountProcessed);
			costStripe = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
			costAuthorize = Math.round(0.3 * numTransactions + 0.029 * amountProcessed + 25);
			costPayPal = Math.round(0.3 * numTransactions + 0.027 * amountProcessed);
		}
		else if(typeTransactions == "keyed"){
			costSP = Math.round(0.3 * numTransactions + 0.0275 * amountProcessed + 30);
			costSquare = Math.round(0.035 * amountProcessed + 0.15 * numTransactions);
			costStripe = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
			costAuthorize = Math.round(0.3 * numTransactions + 0.029 * amountProcessed + 25);
			costPayPal = Math.round(0.15 * numTransactions + 0.035 * amountProcessed);
			costBrainTree = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
		}
		calculateSavings(costSP, costSquare, costStripe, costAuthorize, costPayPal, costBrainTree);
	}
}

function calculateCost(numTransactions, amountProcessed){
var typeTransactions = document.forms["calculateCost"]["typeTransactions"].value;
var costSP;
var costPayPal;
var costSquare;
var costStripe;
var costAuthorize;
var costBrainTree;
	if (typeTransactions == "swiped"){
		costSP = Math.round(0.1 * numTransactions + 0.019 * amountProcessed + 30);
		costSquare = Math.round(.0275 * amountProcessed);
		costStripe = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
		costAuthorize = Math.round(0.3 * numTransactions + 0.029 * amountProcessed + 25);
		costPayPal = Math.round(0.3 * numTransactions + 0.027 * amountProcessed);
	}
	else if(typeTransactions == "keyed"){
		costSP = Math.round(0.3 * numTransactions + 0.0275 * amountProcessed + 30);
		costSquare = Math.round(0.035 * amountProcessed + 0.15 * numTransactions);
		costStripe = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
		costAuthorize = Math.round(0.3 * numTransactions + 0.029 * amountProcessed + 25);
		costPayPal = Math.round(0.15 * numTransactions + 0.035 * amountProcessed);
		costBrainTree = Math.round(0.3 * numTransactions + 0.029 * amountProcessed);
	}
calculateSavings(costSP, costSquare, costStripe, costAuthorize, costPayPal, costBrainTree);
}

function calculateSavings (costSP, costSquare, costStripe, costAuthorize, costPayPal, costBrainTree){
	var savingsPayPal = costPayPal - costSP;
	var savingsSquare = costSquare - costSP;
	var savingsStripe = costStripe - costSP;
	var savingsAuthorize = costAuthorize - costSP;
	var savingsBrainTree = costBrainTree - costSP;
	if(isNaN(savingsBrainTree)){displayBrainTree = "BrainTree is only available for online payments.";}
	else{displayBrainTree = "Savings over BrainTree - $" + savingsBrainTree +" per month";}
	displayInfo(costSP, savingsPayPal, savingsSquare, savingsStripe, savingsAuthorize, savingsBrainTree);
}

function displayInfo(costSP, savingsPayPal, savingsSquare, savingsStripe, savingsAuthorize, savingsBrainTree){
	document.getElementById("cost-simplepay").innerHTML ="Your cost with SimplePay - $" + costSP +" per month";
	document.getElementById("cost-simplepay").style.fontWeight = 'bold';
	document.getElementById("cost-simplepay").style.fontSize = '22px';
	document.getElementById("savings-pp").innerHTML ="Savings over PayPal - $" + savingsPayPal + " per month";
	document.getElementById("savings-pp").style.fontWeight = 'bold';
	document.getElementById("savings-pp").style.fontSize = '22px';
	document.getElementById("savings-sq").innerHTML ="Savings over Square - $" + savingsSquare + " per month";
	document.getElementById("savings-sq").style.fontWeight = 'bold';
	document.getElementById("savings-sq").style.fontSize = '22px';
	document.getElementById("savings-stripe").innerHTML ="Savings over Stripe - $" + savingsStripe + " per month";
	document.getElementById("savings-stripe").style.fontWeight = 'bold';
	document.getElementById("savings-stripe").style.fontSize = '22px';
	document.getElementById("savings-authorize").innerHTML ="Savings over Authorize.net - $" + savingsAuthorize + " per month";
	document.getElementById("savings-authorize").style.fontWeight = 'bold';
	document.getElementById("savings-authorize").style.fontSize = '22px';
	document.getElementById("savings-bt").innerHTML =displayBrainTree;
	document.getElementById("savings-bt").style.fontWeight = 'bold';
	document.getElementById("savings-bt").style.fontSize = '22px';
}
