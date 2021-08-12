$(function () {
	let canvas;
	let ctx;
	let maskcanvas;
	let maskctx;
	let color;
	let num = 2;
	let gridsize = 50;

	let textarea = document.getElementById('textarea');
	let clientHeight = textarea.clientHeight;



	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	maskcanvas = document.getElementById('maskcanvas');
	maskctx = maskcanvas.getContext('2d');
	// gridsize = $("#gridsize").val();
	canvas.width = Math.round($("#width").val() * gridsize);
	canvas.height = Math.round($("#height").val() * gridsize);

	let imgdata = new Array(Math.round($("#height").val()))
	for (let i = 0; i < Math.round($("#height").val()); i++) {
		imgdata[i] = new Array(Math.round($("#width").val())).fill(1);
	}

	maskcanvas.width = canvas.width;
	maskcanvas.height = canvas.height;
	setInterval(() => {
		$("#stage").css({
			width: canvas.clientWidth,
			height: canvas.clientHeight
		});

	}, 10);

	setGrid();
	setGrid(); //仕様による線のぼやけを消せる

	let $buttons = $("#buttons input");
	$buttons.each((i, element) => $(element).on("click", function () {
		color = $(element).data("color");
		num = $(element).data("num");
		console.log(color);
	}));
	let emoji = ["⬜️", "⬛️", "🟪", "🟦", "🟩", "🟨", "🟧", "🟥", "🟫"];
	$("#changebtn").on("click", () => {
		textarea.value = "";
		imgdata.forEach(element => {
			for(let i=0;i<Math.round($("#width").val();i++){
				for (let j = 1; i < 10; j++) {
					if (j == element[i]) {
						textarea.value += emoji[j - 1];
					}
				}
			}
			textarea.value += "\n";
		});
		textarea.style.height = clientHeight + "px";
		let scrollHeight = textarea.scrollHeight;
		textarea.style.height = scrollHeight + "px";
		let url = "https://twitter.com/intent/tweet?&text=" + textarea.value + "&hashtags=" +"絵かいて絵文字"+ "&url=https://trimscash.github.io/etoemoji/";
		let encoded = encodeURI(url);
		$("#tweet").attr("href", encoded);

	});

	$("#setbtn").on("click", () => {
		canvas.width = Math.round($("#width").val() * gridsize);
		canvas.height = Math.round($("#height").val() * gridsize);
		maskcanvas.width = canvas.width;
		maskcanvas.height = canvas.height;
		$("#stage").css({
			width: canvas.clientWidth,
			height: canvas.clientHeight
		});

		imgdata = new Array(Math.round($("#height").val()))
		for (let i = 0; i < Math.round($("#height").val()); i++) {
			imgdata[i] = new Array(Math.round($("#width").val())).fill(1);
		}

		setGrid();
		setGrid(); //仕様による線のぼやけを消せる
	});


	let flag = 0;
	eventFunc("mousedown", (e) => {
		let x = e.offsetX * canvas.width / canvas.clientWidth;
		let y = e.offsetY * canvas.height / canvas.clientHeight;
		fillGrid(x, y);
		// setGrid();
		flag = 1;
	});
	eventFunc("mousemove", (e) => {
		if (flag) {
			let x = e.offsetX * canvas.width / canvas.clientWidth;
			let y = e.offsetY * canvas.height / canvas.clientHeight;
			fillGrid(x, y);
			// setGrid();
			// console.log(e);
		}
	});
	eventFunc("mouseup", () => {
		flag = 0;
	});


	eventFunc("touchstart", (e) => {
		event.preventDefault();
		var clientRect = canvas.getBoundingClientRect();
		var positionX = clientRect.left + window.pageXOffset;
		var positionY = clientRect.top + window.pageYOffset;

		var touches = e.changedTouches;
		let x = (touches[0].pageX - positionX) * canvas.width / canvas.clientWidth;
		let y = (touches[0].pageY - positionY) * canvas.height / canvas.clientHeight;
		fillGrid(x, y);
		// setGrid();
		flag = 1;
	});
	eventFunc("touchmove", (e) => {
		event.preventDefault();
		var clientRect = canvas.getBoundingClientRect();
		var positionX = clientRect.left + window.pageXOffset;
		var positionY = clientRect.top + window.pageYOffset;

		var touches = e.changedTouches;
		let x = (touches[0].pageX - positionX) * canvas.width / canvas.clientWidth;
		let y = (touches[0].pageY - positionY) * canvas.height / canvas.clientHeight;
		if (flag) {
			fillGrid(x, y);
			// setGrid();
			// console.log(e);
		}
	});
	eventFunc("touchend", () => {
		flag = 0;
	});



	function eventFunc(event, func) {
		maskcanvas.addEventListener(event, func);
	}


	function fillGrid(x, y) {
		let gridx = Math.floor((x - 1) / gridsize) * gridsize;
		let gridy = Math.floor((y - 1) / gridsize) * gridsize;
		ctx.fillStyle = color;
		imgdata[Math.floor((y - 1) / gridsize)][Math.floor((x - 1) / gridsize)] = num;
		console.log(imgdata);
		ctx.fillRect(gridx, gridy, gridsize, gridsize);

	}



	function setGrid() {
		let gridx = canvas.width / gridsize
		let gridy = canvas.height / gridsize
		for (let i = 1; i < gridx; i++) {
			maskctx.fillStyle = "black"
			maskctx.moveTo(i * gridsize, 0);
			maskctx.lineTo(i * gridsize, canvas.height);
			maskctx.stroke();
		}
		for (let i = 1; i < gridy; i++) {
			maskctx.fillStyle = "black"
			maskctx.moveTo(0, i * gridsize);
			maskctx.lineTo(canvas.width, i * gridsize);
			maskctx.stroke();
		}
	}

});
