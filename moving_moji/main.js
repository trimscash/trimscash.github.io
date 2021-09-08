let enemies = [];

let key = [false, false, false, false];


$(function () {

	function scroll_control(event) {
		event.preventDefault();
	}

	function no_scroll() {
		document.addEventListener("mousewheel", scroll_control, {
			passive: false
		});
		document.addEventListener("touchmove", scroll_control, {
			passive: false
		});
	}
	no_scroll();
	makeparade();
	let play = new body("player", "🏃‍♀️", window.innerWidth / 2, 500);

	setInterval(function () {


		play.move(key);
		let a = enemies.length;
		enemies.forEach((e, i) => {

			enemies[i].body.move(key);
			if (enemies[enemies[i].id].body.isherestage()) {
				$("#" + enemies[i].id).remove();
				enemies.splice(i, 1);
			}
		});



	}, 10);

	document.body.addEventListener('keydown', event => {
		if (event.code === 'ArrowLeft') {
			key[0] = true;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowRight') {
			key[1] = true; // console.log(player.obj);
		}
		if (event.code === 'ArrowUp') {
			key[2] = true;

		}
		if (event.code === 'ArrowDown') {
			key[3] = true; // console.log(player.obj);
		}

	});

	document.body.addEventListener('keyup', event => {
		if (event.code === 'ArrowLeft') {
			key[0] = false;
		}
		if (event.code === 'ArrowRight') {
			key[1] = false;
		}
		if (event.code === 'ArrowUp') {
			key[2] = false;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowDown') {
			key[3] = false;
			// console.log(player.obj);
		}
	})



});



function makeparade() {
	enemies.push({
		id: 0,
		body: new body(0, "unko", window.innerWidth / 2, 10, )
	});
}


class body {
	constructor(id, name, posx, posy, textalign = 0) {
		this.id = id;

		$(".stage").append("<span id='" + id + "'>" + name + "</span>");

		this.$selector = $("#" + id);

		this.size = {
			width: this.$selector.width(),
			height: this.$selector.height(),
		};

		this.$selector.offset(function () {
			if (textalign) {
				return {
					top: posy,
					left: posx - this.size.width / 2
				};
			}
			return {
				top: posy,
				left: posx
			};
		});

		this.pos = this.$selector.offset();

		this.health = this.size.width / 10;

		this.speed = {
			left: 0,
			right: 0,
			up: 0,
			down: 0
		};
		this.obj = {
			...this.pos,
			...this.size,
			health: this.health,
			speed: {
				...this.speed
			}
		};

		console.log(this.obj);
		console.log(this.pos);
	}

	move(key) {

		let kansei = [0, 0, 0, 0];
		let accel = 0.1;
		//for de yareyo of the year!!
		if (key[0] === true) kansei[0] += accel;
		else kansei[0] -= accel;
		if (key[1] === true) kansei[1] += accel;
		else kansei[1] -= accel;
		if (key[2] === true) kansei[2] += accel;
		else kansei[2] -= accel;
		if (key[3] === true) kansei[3] += accel;
		else kansei[3] -= accel;
		//demo maa iika korede



		this.speed.left += kansei[0];
		this.speed.right += kansei[1];
		this.speed.up += kansei[2];
		this.speed.down += kansei[3];
		if (this.speed.left < 0) {
			this.speed.left = 0;
		}
		if (this.speed.right < 0) {
			this.speed.right = 0;
		}
		if (this.speed.up < 0) {
			this.speed.up = 0;
		}
		if (this.speed.down < 0) {
			this.speed.down = 0;
		}
		let max = 4;
		if (this.speed.left > max) {
			this.speed.left = max;
		}
		if (this.speed.right > max) {
			this.speed.right = max;
		}
		if (this.speed.up > max) {
			this.speed.up = max;
		}
		if (this.speed.down > max) {
			this.speed.down = max;
		}
		this.pos.left -= this.speed.left;
		this.pos.left += this.speed.right;
		this.pos.top -= this.speed.up;
		this.pos.top += this.speed.down;

// 		console.log(this.speed, key);

		this.$selector.offset({
			top: this.pos.top,
			left: this.pos.left
		});
		// console.log(this.obj);ss
	}

	atari(Aobj, Bobj) {
		for (let x = Aobj.left; x < Aobj.width + Aobj.left; x++) {
			for (let y = Aobj.top; y < Aobj.height + Aobj.top; y++) {
				if (x >= Bobj.left && x <= Bobj.left + Bobj.width) {
					if (y >= Bobj.top && y <= Bobj.top + Bobj.height) {
						return 1;
					}
				}
			}
		}
	}


	isherestage() {
		this.obj = {
			...this.pos,
			...this.size,
			health: this.health,
			...this.speed
		};
		let c = !(this.atari(this.obj, {
			top: 0,
			left: (window.innerWidth / 2) - 400,
			width: 800,
			height: 500
		}));
		return c;
	}
}
