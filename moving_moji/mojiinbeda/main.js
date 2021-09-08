let enemies = [];

let key = [false, false, false, false];


$(function () {
	makeparade();
	let player = new body("player", "PLAYER", window.innerWidth / 2, 500);

	setInterval(function () {

		if (key[0] == true) {
			player.force.left = -8;
		} else {
			player.force.left = 0;
		}

		if (key[1] == true) {
			player.force.right = 8;
		} else {
			player.force.right = 0;
		}

		if (key[2] == true) {
			player.force.up = -8;
		} else {
			player.force.up = 0;
		}

		if (key[3] == true) {
			player.force.down = 8;
		} else {
			player.force.down = 0;
		}



		player.move();
		let a = enemies.length;
		enemies.forEach((e, i) => {

			enemies[i].body.move();
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

		this.mass = this.size.height * this.size.width / (2 * 1000);

		this.speed = {
			sleft: 0,
			sright: 0,
			sup: 0,
			sdown: 0
		};
		this.accel = {
			left: 0,
			right: 0,
			up: 0,
			down: 0
		};
		this.force = {
			left: 0,
			right: 0,
			up: 0,
			down: 0
		};
		this.fu = 0.2;
		this.friction = this.mass * 9.8 * this.fu;
		this.obj = {
			...this.pos,
			...this.size,
			health: this.health,
			...this.speed
		};

		console.log(this.obj);
		console.log(this.pos);
	}

	move() {

		this.accel = {
			left: (this.force.left) / this.mass,
			right: (this.force.right) / this.mass,
			top: (this.force.up) / this.mass,
			down: (this.force.down) / this.mass,
		};
		// (Math.abs(this.speed.speedx) > 0.01 && Math.abs(this.speed.speedx < 0.05))
		if (this.speed.speedx != 0) {

			this.accel.x += (-1 * this.friction * ((this.speed.speedx) / (Math.abs(this.speed.speedx)))) / this.mass;
		}
		// (Math.abs(this.speed.speedy) > 0.01 && Math.abs(this.speed.speedy < 0.05))
		if (this.speed.speedy != 0) {

			this.accel.y += (-1 * this.friction * ((this.speed.speedy) / (Math.abs(this.speed.speedy)))) / this.mass;
		}
		this.speed.speedx += this.accel.x * 0.01;
		this.speed.speedy += this.accel.y * 0.01;
		this.speed.speedx = Math.round(this.speed.speedx * 100) / 100;
		this.speed.speedy = Math.round(this.speed.speedy * 100) / 100;
		this.pos.top += this.speed.speedy;
		this.pos.left += this.speed.speedx;
		// console.log(this.accel, this.speed);
		if (this.speed.speedx > 3) {
			this.speed.speedx = 3;
		} else if (this.speed.speedx < -3) {
			this.speed.speedx = -3;
		}
		if (this.speed.speedy > 3) {
			this.speed.speedy = 3;
		} else if (this.speed.speedy < -3) {
			this.speed.speedy = -3;
		}


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

// function atari(Aobj,Bobj) {
// 	for (let x = Aobj.x; x < Aobj.weight + Aobj.x; x++) {
// 		for (let y = Aobj.y; y < Aobj.height + Aobj.y; y++) {
// 			if(x>=Bobj.x&&x<=Bobj.x+Bobj.weight){
// 				if (y>=Bobj.y&&y<=Bobj.y+Bobj.height) {
// 					return 1;
// 				}
// 			}
// 		}
// 	}

// }