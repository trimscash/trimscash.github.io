let enemies = [];



$(function () {
	makeparade();
	let player = new body("player", "PLAYER", window.innerWidth / 2, 500);

	player.speed = {
		speedx: 0,
		speedy: 0
	}
	setInterval(function () {
		player.move();
		let a = enemies.length;
		enemies.forEach((e, i) => {
			enemies[i].body.move();
			if (enemies[i].body.isherestage()) {
				$("#" + enemies[i].id).remove();
				enemies.splice(i, 1);
			}
		});

	}, 10);
	document.body.addEventListener('keydown', event => {
		if (event.code === 'ArrowLeft') {
			player.speed.speedx = -3;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowRight') {
			player.speed.speedx = 3;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowUp') {
			player.speed.speedy = -3;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowDown') {
			player.speed.speedy = 3;
			// console.log(player.obj);
		}

	})


	document.body.addEventListener('keyup', event => {
		if (event.code === 'ArrowLeft') {
			player.speed.speedx = 0;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowRight') {
			player.speed.speedx = 0;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowUp') {
			player.speed.speedy = 0;
			// console.log(player.obj);
		}
		if (event.code === 'ArrowDown') {
			player.speed.speedy = 0;
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
			speedx: 0,
			speedy: 20 / this.size.width
		};
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
		this.pos.top += this.speed.speedy;
		this.pos.left += this.speed.speedx
		this.$selector.offset({
			top: this.pos.top,
			left: this.pos.left
		});
		// console.log(this.obj);
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