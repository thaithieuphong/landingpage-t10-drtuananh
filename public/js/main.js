var alertElement = document.getElementsByClassName('alert');
for(i=0; i < alertElement.length; i++) {
	if(alertElement[i]) {
		let element = alertElement[i];
		let timerOut = setTimeout(closeAlert, 5000);
		function closeAlert() {
			element.remove();
		}
	}
}

function validatePhoneNumber(input_str) {
	let number = parseInt(input_str);
	return isNaN(number);
}
var createPhone = document.getElementById('input-phone');
createPhone.addEventListener('input', (e) => {
	if (validatePhoneNumber(e.target.value)) {
		document.getElementById('create_phone_error').classList.remove('off');
	} else {
		document.getElementById('create_phone_error').classList.add('off');
	}
})