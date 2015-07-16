// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {


	
		/* ---------------------------------- Local Variables ---------------------------------- */
		var service = new EmployeeService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});

	/* --------------------------------- Event Registration -------------------------------- */
	$('.search-key').on('keyup', findByName);
	$('.help-btn').on('click', function () {
		alert("Employee Directory v3.4");
	});
	$('#picture-btn').on('click', function () {
		takePicture();
	});

	function takePicture() {
		errorFactor = $('#errorFactor').val();
		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			targetWidth : 300,
			targetHeight : 300,
			destinationType : Camera.DestinationType.DATA_URL,
			correctOrientation : true
		});

	}

	function onSuccess(imageData) {
		var imageObj = new Image();
		imageObj.src = "data:image/jpeg;base64," + imageData;
		imageObj.style.margin = "10px";
		imageObj.style.display = "block";

		var canvas = document.getElementById('image');
		var context = canvas.getContext('2d');
		var x = 1;
		var y = 1;

		context.drawImage(imageObj, x, y);

		getYellowQR(imageObj);
	}

	function onFail(message) {
		alert(message);
	}

}
	());
