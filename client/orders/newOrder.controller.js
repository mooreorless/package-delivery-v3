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
		  return checkPickUpStreetNumber() && checkPickUpStreetName() && checkPickUpSuburb() && checkDropOffStreetNumber() && checkDropOffStreetName() && checkDropOffSuburb() && checkDropOffPostcode();
	  }//end validateFields()


	  //PICK UP VALIDATION

	  function checkPickUpStreetNumber() {
		  var streetNumber = document.getElementById('pickUpNumber').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(streetNumber)) || streetNumber == ''){
			  document.getElementById("pickUpNumber").style.borderColor = "red";
			  document.getElementById("pickUpNumber").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid pick up street number";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickupStreetNumber()

	  function checkPickUpStreetName() {
		  var streetName = document.getElementById('pickUpName').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(streetName)) || streetName == ''){
			  document.getElementById("pickUpName").style.borderColor = "red";
			  document.getElementById("pickUpName").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid pick up street name";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickupStreetName()

	  function checkPickUpSuburb() {
		  var suburb = document.getElementById('pickUpSuburb').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(suburb)) || suburb == ''){
			  document.getElementById("pickUpSuburb").style.borderColor = "red";
			  document.getElementById("pickUpSuburb").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid pick up suburb";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPickUpSuburb()

	  function checkPickupPostcode() {
		  var postCode = document.getElementById('pickUpPostcode').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(postCode)) || postCode == '' || postCode.length > 4 || postCode.length < 4){
			  document.getElementById("pickUpPostcode").style.borderColor = "red";
			  document.getElementById("pickUpPostcode").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid pick up postcode";
			  document.getElementById("order-error-msg").style.display = "block";
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
			  document.getElementById("dropOffNumber").style.borderColor = "red";
			  document.getElementById("dropOffNumber").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid delivery street number";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffStreetNumber()

	  function checkDropOffStreetName() {
		  var streetName = document.getElementById('dropOffName').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(streetName)) || streetName == ''){
			  document.getElementById("dropOffName").style.borderColor = "red";
			  document.getElementById("dropOffName").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid delivery street name";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffStreetName()

	  function checkDropOffSuburb() {
		  var suburb = document.getElementById('dropOffSuburb').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(suburb)) || suburb == ''){
			  document.getElementById("dropOffSuburb").style.borderColor = "red";
			  document.getElementById("dropOffSuburb").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid delivery suburb";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffSuburb()

	  function checkDropOffPostcode() {
		  var postCode = document.getElementById('dropOffPostcode').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(postCode)) || postCode == '' || postCode.length > 4 || postCode.length < 4){
			  document.getElementById("dropOffPostcode").style.borderColor = "red";
			  document.getElementById("dropOffPostcode").focus();
			  document.getElementById("order-error-msg").innerHTML = "Error: Please enter a valid delivery postcode";
			  document.getElementById("order-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkDropOffPostcode()

  }

})();