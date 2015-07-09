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
		alert("taking picture");
		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			targetWidth : 400,
			targetHeight : 400,
			destinationType : Camera.DestinationType.DATA_URL,
			correctOrientation : true
		});

	}

	/* ---------------------------------- Local Functions ---------------------------------- */
	function findByName() {
		service.findByName($('.search-key').val()).done(function (employees) {
			var l = employees.length;
			var e;
			$('.employee-list').empty();
			for (var i = 0; i < l; i++) {
				e = employees[i];
				$('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
			}
		});
	}

	function onSuccess(imageData) {
		alert('success');
		var image = document.getElementById('image');
		image.src = "data:image/jpeg;base64," + imageData; 
		image.style.margin = "10px";
		image.style.display = "block";
	}

	function onFail(message) {
		alert(message);
	}

}
	());
