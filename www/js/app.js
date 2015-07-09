// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

	var errorFactor = 75;

	var colors = {};
	colors.cyan = "0,255,255"
		colors.magenta = "255,0,255"
		colors.yellow = "255,255,0"
		colors.black = "0,0,0"
		colors.red = "255,0,0"
		colors.green = "0,128,0"
		colors.blue = "0,0,255"
		colors.white = "255,255,255"

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
		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			targetWidth : 400,
			targetHeight : 400,
			destinationType : Camera.DestinationType.DATA_URL,
			correctOrientation : true
		});

	}

	function getYellowQR() {
		var canvas = document.getElementById('myCanvas');
		var context = canvas.getContext('2d');
		var x = 1;
		var y = 1;
		var check = true;

		context.drawImage(imageObj, x, y);

		var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
		var data = imageData.data;
		var found = false;

		for (var i = 0; i < data.length; i += 4) {

			found = false;
			var aData = [];
			aData.push(data[i]);
			aData.push(data[i + 1]);
			aData.push(data[i + 2]);

			if (checkColor(aData, 'yellow')) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
				found = true;

			}

			if (checkColor(aData, 'green')) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
				found = true;

			}

			if (checkColor(aData, 'red')) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
				found = true;

			}

			//Check if white
			if ((data[i] >= 200) && (data[i + 1] >= 200) && (data[i + 2] >= 200)) {
				found = true;
			}

			//Check if black
			if ((data[i] <= 50) && (data[i + 1] <= 50) && (data[i + 2] <= 50)) {
				found = true;
			}

			//If not found set to white
			if (found == false) {
				data[i] = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
			}

		}

		// overwrite original image
		context.putImageData(imageData, x, y);
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
