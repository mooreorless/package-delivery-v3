(function () {

  angular
	.module('packageDelivery')
	.controller('newOrderCtrl', newOrderCtrl);

  newOrderCtrl.$inject = ['$location', '$rootScope', 'meanData', 'functionService', 'toastr'];
  function newOrderCtrl($location, $rootScope, meanData, functionService, toastr) {

		var vm = this;
		vm.currentUser = {};

		vm.isLoggedIn = functionService.isLoggedIn();

		meanData.getProfile()
		.success(function(data) {
			vm.currentUser = data;
			console.log(data);
			vm.newOrder = {
				userID: vm.currentUser._id,
				userName: vm.currentUser.firstName+' '+vm.currentUser.lastName,
				pickUpNumber: vm.currentUser.streetNumber,
				pickUpName: vm.currentUser.streetName,
				pickUpSuburb: vm.currentUser.suburb,
				pickUpPostcode: vm.currentUser.postCode,
				dropOffNumber: '',
				dropOffName: '',
				dropOffSuburb: '',
				dropOffPostcode: '',
				notes: '',
				isFragile: '',
				isExpress: '',
				state: 'Order Placed',
				pickUpDate: ''
			};
			console.log(vm.newOrder);
		})
		.error(function (e) {
			toastr.error('Please sign in or make an account', 'Error');
			$location.path('/');
			console.log(e);
		});



		vm.onSubmit = function () {

			if (validateFields()) {
				console.log('Placing Order');
				console.log(vm.newOrder);
				functionService
					.placeOrder(vm.newOrder)
					.error(function(err){
						console.log(err);
						toastr.error(err, 'Error');
				})
				.then(function(){
					$location.path('orders')
				});
			}
		};

	  function validateFields() {
		  return checkPickUpStreetNumber() && checkPickUpStreetName() && checkPickUpSuburb() && checkPickupPostcode() && checkDropOffStreetNumber() && checkDropOffStreetName() && checkDropOffSuburb() && checkDropOffPostcode();
	  }//end validateFields()


	  //PICK UP VALIDATION

	  function checkPickUpStreetNumber() {
		  var streetNumber = document.getElementById('pickUpNumber').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(streetNumber)) || streetNumber == ''){
		  	formatInput("pickUpNumber", "Error: Please enter a valid pick up street number");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickupStreetNumber()

	  function checkPickUpStreetName() {
		  var streetName = document.getElementById('pickUpName').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(streetName)) || streetName == ''){
		  	formatInput("pickUpName", "Error: Please enter a valid pick up street name");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickupStreetName()

	  function checkPickUpSuburb() {
		  var suburb = document.getElementById('pickUpSuburb').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(suburb)) || suburb == ''){
		  	formatInput("pickUpSuburb", "Error: Please enter a valid pick up suburb");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickUpSuburb()

	  function checkPickupPostcode() {
		  var postCode = document.getElementById('pickUpPostcode').value;
		  var regExprContainsLetters = /[a-zA-Z]/;
		  var regExprInvalidPostcode = /([0-3][0-9]{3})|([5-9][0-9]{3})/;

		  if((regExprContainsLetters.test(postCode)) || regExprInvalidPostcode.test(postCode) || postCode == '' || postCode.length > 4 || postCode.length < 4){
		  	formatInput("pickUpPostcode", "Error: Please enter a valid QLD pick up postcode");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickupPostcode()

	  // DROP OFF VALIDATION

	  function checkDropOffStreetNumber() {
		  var streetNumber = document.getElementById('dropOffNumber').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(streetNumber)) || streetNumber == ''){
		  	formatInput("dropOffNumber", "Error: Please enter a valid delivery street number");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffStreetNumber()

	  function checkDropOffStreetName() {
		  var streetName = document.getElementById('dropOffName').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(streetName)) || streetName == ''){
		  	formatInput("dropOffName", "Error: Please enter a valid delivery street name");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffStreetName()

	  function checkDropOffSuburb() {
		  var suburb = document.getElementById('dropOffSuburb').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(suburb)) || suburb == ''){
		  	formatInput("dropOffSuburb", "Error: Please enter a valid delivery suburb");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffSuburb()

	  function checkDropOffPostcode() {
		  var postCode = document.getElementById('dropOffPostcode').value;
		  var regExprContainsLetters = /[a-zA-Z]/;
		  var regExprInvalidPostcode = /([0-3][0-9]{3})|([5-9][0-9]{3})/;

		  if((regExprContainsLetters.test(postCode)) || regExprInvalidPostcode.test(postCode) || postCode == '' || postCode.length > 4 || postCode.length < 4){
			  formatInput("dropOffPostcode", "Error: Please enter a valid QLD delivery postcode");
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffPostcode()

	  function formatInput(inputID, err) {

  		document.getElementById(inputID).style.borderColor = "red";
		document.getElementById(inputID).focus();
		document.getElementById("order-error-msg").innerHTML = err;
		document.getElementById("order-error-msg").style.display = "block";

	  }

  }

})();