
/*
Form handling for the register
 */
(function () {

  angular
    .module('packageDelivery')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'functionService', 'toastr'];
  function registerCtrl($location, functionService, toastr) {
    var vm = this;

    //create object to be populated with form data, this will be sent in http request to server
    vm.credentials = {
      firstName : "",
      lastName : "",
      email : "",
      password: "",
      streetNumber: "",
      streetName: "",
      suburb: "",
      postCode: ""
    };

	/*
	When the user submits the, do all validation and transport data given to the back end
	 */
    vm.onSubmit = function () {
      console.log('Submitting registration');
			if (validateFields()) { //check for valid fields
				functionService
					.register(vm.credentials)
					.error(function(err){
						toastr.error('There\'s already an account registered with that email address', 'Error');
					})
					.then(function(){
						$location.path('/profile');
				});
			}
    };

    /*
    Makes a check of all the fields for validity
     */
    function validateFields() {
	    return checkFirstName() && checkLastName() && checkEmail() && checkPassword() && checkStreetName() && checkStreetNumber() && checkSuburb() && checkPostcode();
    }

		/*
		Checks the first name for invalid input
		 */
	  function checkFirstName() {
		  var name = document.getElementById('firstName').value;
		  var regExprContainsNumbers = /[0-9]/;
			// if first name is empty, contains numbers inform user with animation and colour that it is incorrect
		  if(name === ''){
			  document.getElementById("firstName").style.borderColor = "red";
			  document.getElementById("firstName").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a first name";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  if(regExprContainsNumbers.test(name)){
				  document.getElementById("firstName").style.borderColor = "red";
				  document.getElementById("firstName").focus();
				  document.getElementById("register-error-msg").innerHTML = "Please enter a valid first name";
				  document.getElementById("register-error-msg").style.display = "block";
				  return false;
			  } else {
				  document.getElementById("firstName").style.borderColor = "transparent";
				  return true;
			  }//end if
		  }//end if
	  }//end checkFirstName()

		/*
		 Checks the last name for invalid input
		 */
	  function checkLastName() {
		  var name = document.getElementById('lastName').value;
		  var regExprContainsNumbers = /[0-9]/;
			// if last name is empty, contains numbers inform user with animation and colour that it is incorrect
		  if(name === ''){
			  document.getElementById("lastName").style.borderColor = "red";
			  document.getElementById("lastName").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a last name";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  if(regExprContainsNumbers.test(name)){
				  document.getElementById("lastName").style.borderColor = "red";
				  document.getElementById("lastName").focus();
				  document.getElementById("register-error-msg").innerHTML = "Please enter a valid last name";
				  document.getElementById("register-error-msg").style.display = "block";
				  return false;
			  } else {
				  document.getElementById("lastName").style.borderColor = "transparent";
				  return true;
			  }//end if
		  }//end if
	  }//end checkLastName()

		/*
		 Checks the  email for invalid input
		 */
	  function checkEmail() {
		  var email = document.getElementById('email').value;
		  var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		  if(email === ''){
			  document.getElementById("email").style.borderColor = "red";
			  document.getElementById("email").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter an email";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  if(re.test(email)){
				  document.getElementById("email").style.borderColor = "transparent";
				  return true;
			  } else {
				  document.getElementById("email").style.borderColor = "red";
				  document.getElementById("email").focus();
				  document.getElementById("register-error-msg").innerHTML = "Please enter a valid email";
				  document.getElementById("register-error-msg").style.display = "block";
				  return false;
			  }//end if
		  }//end if
	  }//end checkEmail()

		/*
		 Checks the password for invalid input
		 */
	  function checkPassword() {
		  var password = document.getElementById('password').value;
		  if(password.length < 5) {
			  document.getElementById("password").style.borderColor = "red";
			  document.getElementById("password").focus();
			  document.getElementById("register-error-msg").innerHTML = "Password cannot be less than 5 characters";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else if(password.length > 20) {
			  document.getElementById("password").style.borderColor = "red";
			  document.getElementById("password").focus();
			  document.getElementById("register-error-msg").innerHTML = "Password cannot be more than 20 characters";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  document.getElementById("password").style.borderColor = "transparent";
			  return true;
		  }//end if
	  }//end checkPassword()

		/*
		 Checks the  street number for invalid input
		 */
	  function checkStreetNumber() {
		  var streetNumber = document.getElementById('streetNumber').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(streetNumber)) || streetNumber == ''){
			  document.getElementById("streetNumber").style.borderColor = "red";
			  document.getElementById("streetNumber").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a valid street number";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkStreetNumber()

		/*
		 Checks the street name for invalid input
		 */
	  function checkStreetName() {
		  var streetName = document.getElementById('streetName').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(streetName)) || streetName == ''){
			  document.getElementById("streetName").style.borderColor = "red";
			  document.getElementById("streetName").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a valid street name";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkStreetName()

		/*
		 Checks the suburb for invalid input
		 */
	  function checkSuburb() {
		  var suburb = document.getElementById('suburb').value;
		  var regExprContainsNumbers = /[0-9]/;

		  if((regExprContainsNumbers.test(suburb)) || suburb == ''){
			  document.getElementById("suburb").style.borderColor = "red";
			  document.getElementById("suburb").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a valid suburb";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkSuburb()

		/*
		 Checks the postcode for invalid input
		 */
	  function checkPostcode() {
		  var postCode = document.getElementById('postCode').value;
		  var regExprContainsLetters = /[a-zA-Z]/;

		  if((regExprContainsLetters.test(postCode)) || postCode == '' || postCode.length > 4 || postCode.length < 4){
			  document.getElementById("postCode").style.borderColor = "red";
			  document.getElementById("postCode").focus();
			  document.getElementById("register-error-msg").innerHTML = "Please enter a valid postcode";
			  document.getElementById("register-error-msg").style.display = "block";
			  return false;
		  } else {
			  return true;
		  }
	  }//end checkPostcode()

  }

})();