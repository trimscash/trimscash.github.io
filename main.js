var canvas;
var ctx;
// let hizas = [];
// let kosis = [];
// let tumasakis = [];
let atamas = []; //変数名くそで草ｗｗｗｗｗｗｗｗ（すんまへｎゆるしてください）
let legs = [];
let arms = [];
let where = 0;
$(function () {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "rgb(0,32,99)";

	setInterval(() => {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(0, 0, 1200, 800);
		ctx.fillStyle = "rgb(0,32,99)";
		// foreachでやりゃよかったのか
		// 描画してんで
		atamas.forEach((a, i) => {
			a.draw();
		});

		for (let i = 0; i < legs.length; i++) {
			legs[i].draw();
			legs[i].hone();
			legs[i].body();
			if (i !== legs.length - 1) {
				body(legs[i], legs[i + 1]);
			}
		}
		for (let i = 0; i < arms.length; i++) {
			arms[i].draw();
			arms[i].hone();
			arms[i].body();
		}


	}, 100);
	// tes.remove(20);
	var elements = document.getElementsByClassName("btn");
	let mode;
	console.log(elements.length);
	let text = document.getElementById("exp");
	for (var i = elements.length; i--;) {
		elements[i].onclick = function () {
			mode = this.getAttribute("data-mode");
			if (mode == 1) {
				text.innerText = "説明：頭\nただの円形のあたま"
			} else if (mode == 2) {
				text.innerText = "説明：腕\n三つの関節で構成される腕\n関節移動で変形可能！！！"

			} else if (mode == 3) {
				text.innerText = "説明：脚\n三つの関節で構成される脚\n関節移動で変形可能！！！\n二つ以上置くと腰ができる"

			} else if (mode == 4) {
				text.innerText = "説明：関節移動\n関節（まるくなってるとこ）をドラッグして移動できる\n関節のみ移動が可能"

			} else if (mode == 5) {
				text.innerText = "説明：パーツ移動\n関節（まるいとこ）を押してドラッグすると\n脚や腕ごと移動できるぜ！！"

			} else if (mode == 6) {
				text.innerText = "説明：削除\n関節（まるいとこ）や頭などを押すと消える\n脚や腕ごと消えてしまうので注意daze.."

			}
		}
	}









	let movepart;
	let clickflag = 0;
	canvas.addEventListener("touchstart", (e) => {
		event.preventDefault();
		var clientRect = canvas.getBoundingClientRect();
		var positionX = clientRect.left + window.pageXOffset;
		var positionY = clientRect.top + window.pageYOffset;

		var touches = e.changedTouches;
		let x = (touches[0].pageX - positionX) * 1200 / canvas.clientWidth;
		let y = (touches[0].pageY - positionY) * 800 / canvas.clientHeight;
		downcursor(x, y);

	});
	canvas.addEventListener("mousedown", (e) => {
		let x = e.offsetX * 1200 / canvas.clientWidth;
		let y = e.offsetY * 800 / canvas.clientHeight;
		downcursor(x, y);

	});

	function downcursor(x, y) {
		switch (mode) {
			// case "0":
			// 	kosis.push(new kosi(e.offsetX * 600 / canvas.clientWidth, e.offsetY * 400 / canvas.clientHeight));
			// 	kosis[kosis.length - 1].make();
			// 	break;
			// case "1":
			// 	console.log(mode);
			// 	hizas.push(new hiza(e.offsetX * 600 / canvas.clientWidth, e.offsetY * 400 / canvas.clientHeight));
			// 	hizas[hizas.length - 1].make();
			// 	break;
			// case "2":
			// 	tumasakis.push(new tumasaki(e.offsetX * 600 / canvas.clientWidth, e.offsetY * 400 / canvas.clientHeight));
			// 	tumasakis[tumasakis.length - 1].make();
			// 	break;
			case "1":
				atamas.push(new atama(x, y));
				break;
			case "2":
				// これは腕をつくるとこ
				arms.push(new arm(new kata(x, y), new hiji(x + 80, y + 50), new te(x + 150, y)));
				break;
			case "3":
				legs.push(new leg(new kosi(x, y), new hiza(x + 80, y + 80), new tumasaki(x - 30, y + 250)));
				break;

			case "4":
				if (clickflag === 0) {
					for (let i = 0; i < legs.length; i++) {
						if (legs[i].whatIsHit(x, y) !== 0) {
							movepart = legs[i].whatIsHit(x, y);
							clickflag = 1;
							break;
						}
					}
					for (let i = 0; i < arms.length; i++) {
						if (arms[i].whatIsHit(x, y) !== 0) {
							movepart = arms[i].whatIsHit(x, y);
							clickflag = 1;
							break;
						}
					}
				}
				break;




			case "5":
				legs.forEach((a) => {

					if (a.isHit(x, y)) {
						where = a.isHit(x, y);
						movepart = a
						clickflag = 1;
					}
				});
				arms.forEach((a) => {
					if (a.isHit(x, y)) {
						where = a.isHit(x, y);
						movepart = a
						clickflag = 1;

					}
				});
				atamas.forEach((a) => {

					if (a.isHit(x, y)) {
						movepart = a
						clickflag = 1;
					}
				});
				break;

			case "6":
				// 削除するとこ
				// ここら辺もっとスマートにやりてえ，，まいいか，，obujectと配列つかえばなんとかなりそ（てきとう）
				legs.forEach((a, i, t) => {
					if (a.isHit(x, y)) {
						t.splice(i, 1);
					}
				});
				arms.forEach((a, i, t) => {
					if (a.isHit(x, y)) {
						t.splice(i, 1);
					}
				});
				atamas.forEach((a, i, t) => {
					if (a.isHit(x, y)) {
						t.splice(i, 1);
					}
				});
				break;
		}
		// let hi = new hiza(e.offsetX * 600 / canvas.clientWidth, e.offsetY * 400 / canvas.clientHeight);
		// hi.make();
	}











	canvas.addEventListener("mousemove", (e) => {
		let x = e.offsetX * 1200 / canvas.clientWidth;
		let y = e.offsetY * 800 / canvas.clientHeight;
		// console.log(clickflag);
		movecursor(x, y);
	});
	canvas.addEventListener("touchmove", (e) => {
		event.preventDefault();
		var clientRect = canvas.getBoundingClientRect();
		var positionX = clientRect.left + window.pageXOffset;
		var positionY = clientRect.top + window.pageYOffset;

		var touches = e.changedTouches;
		let x = (touches[0].pageX - positionX) * 1200 / canvas.clientWidth;
		let y = (touches[0].pageY - positionY) * 800 / canvas.clientHeight;
		// console.log(clickflag);
		movecursor(x, y);


	});

	function movecursor(x, y) {
		switch (mode) {
			case "4":
				if (clickflag) {
					movepart.move(x, y);
				}
				break;
			case "5":
				if (clickflag) {
					movepart.move(x, y);
				}
				break;
		}

	}






	canvas.addEventListener("mouseup", uporend, false);
	canvas.addEventListener("touchend", uporend, false);

	function uporend() {
		switch (mode) {
			case "4":
				clickflag = 0;
				break;
			case "5":
				where = 0;
				clickflag = 0;
				break;
		}
	}

});








function hone(leg1, leg2) {
	ctx.beginPath();
	ctx.moveTo(leg1.kosi.x, leg1.kosi.y);
	ctx.lineTo(leg2.kosi.x, leg2.kosi.y);
	// ctx.lineTo(this.tumasaki.x, this.tumasaki.y);
	ctx.stroke();
}

function body(leg1, leg2) {
	let dots = [];
	dots[0] = f(leg1.kosi, leg2.kosi);
	dots[1] = f(leg2.kosi, leg1.kosi);
	// ctx.fillStyle = "rgb(0,0,0)"
	ctx.beginPath();
	ctx.moveTo(dots[0].x0, dots[0].y0);
	ctx.lineTo(dots[1].x0, dots[1].y0);
	ctx.lineTo(dots[1].x1, dots[1].y1);
	ctx.lineTo(dots[0].x1, dots[0].y1);
	ctx.fill();
}

class leg {
	constructor(kosi, hiza, tumasaki) {
		this.kosi = kosi;
		this.hiza = hiza;
		this.tumasaki = tumasaki;
	}

	hone() {
		ctx.beginPath();
		ctx.moveTo(this.kosi.x, this.kosi.y);
		ctx.lineTo(this.hiza.x, this.hiza.y);
		ctx.lineTo(this.tumasaki.x, this.tumasaki.y);
		ctx.stroke();
	}

	body() {

		let dots = [];
		dots[0] = f(this.kosi, this.hiza);
		dots[1] = f(this.hiza, this.kosi);
		// ctx.fillStyle = "rgb(0,0,0)"
		ctx.beginPath();
		ctx.moveTo(dots[0].x0, dots[0].y0);
		ctx.lineTo(dots[1].x0, dots[1].y0);
		ctx.lineTo(dots[1].x1, dots[1].y1);
		ctx.lineTo(dots[0].x1, dots[0].y1);
		ctx.fill();
		dots[2] = f(this.tumasaki, this.hiza);
		dots[3] = f(this.hiza, this.tumasaki);
		ctx.beginPath();
		ctx.moveTo(dots[2].x0, dots[2].y0);
		ctx.lineTo(dots[3].x0, dots[3].y0);
		ctx.lineTo(dots[3].x1, dots[3].y1);
		ctx.lineTo(dots[2].x1, dots[2].y1);
		ctx.fill();
		// ctx.fillStyle = "rgb(0,32,99)";
		// console.log(dots);

	}

	draw() {
		this.kosi.draw();
		this.hiza.draw();
		this.tumasaki.draw();
	}


	// remove() {
	// 	this.kosi.remove();
	// 	this.hiza.remove();
	// 	this.tumasaki.remove();
	// 	ctx.fillStyle = "rgb(255,255,255)";
	// 	this.body();
	// 	ctx.fillStyle = "rgb(0,32,99)";
	// }

	//このコードつくったやつくっそあたまわるい（ワイ）
	move(x, y) {
		let subx0 = 0;
		let suby0 = 0;
		let subx1 = 0;
		let suby1 = 0;
		if (where == 1) {
			subx0 = this.kosi.x - this.hiza.x
			subx1 = this.kosi.x - this.tumasaki.x
			suby0 = this.kosi.y - this.hiza.y
			suby1 = this.kosi.y - this.tumasaki.y
			this.kosi.move(x, y);
			this.hiza.move(x - subx0, y - suby0);
			this.tumasaki.move(x - subx1, y - suby1);

		} else if (where == 2) {
			subx0 = this.hiza.x - this.kosi.x
			subx1 = this.hiza.x - this.tumasaki.x
			suby0 = this.hiza.y - this.kosi.y
			suby1 = this.hiza.y - this.tumasaki.y
			this.hiza.move(x, y);
			this.kosi.move(x - subx0, y - suby0);
			this.tumasaki.move(x - subx1, y - suby1);

		} else if (where == 3) {
			subx0 = this.tumasaki.x - this.kosi.x
			subx1 = this.tumasaki.x - this.hiza.x
			suby0 = this.tumasaki.y - this.kosi.y
			suby1 = this.tumasaki.y - this.hiza.y
			this.tumasaki.move(x, y);
			this.kosi.move(x - subx0, y - suby0);
			this.hiza.move(x - subx1, y - suby1);
		}

	}

	isHit(x, y) {
		if (this.kosi.isHit(x, y)) {
			return 1;
		} else if (this.hiza.isHit(x, y)) {
			return 2;
		} else if (this.tumasaki.isHit(x, y)) {
			return 3;
		} else {
			return 0;
		}
	}

	whatIsHit(x, y) {
		if (this.kosi.isHit(x, y)) {
			return this.kosi;
		} else if (this.hiza.isHit(x, y)) {
			return this.hiza;
		} else if (this.tumasaki.isHit(x, y)) {
			return this.tumasaki;
		} else {
			return 0;
		}
	}
}


class arm extends leg {
	constructor(kata, hiji, te) {
		super(kata, hiji, te);
	}
}


function f(joint1, joint2) {
	let ysub = joint1.y - joint2.y;
	let f = 0;
	if (!ysub) {
		ysub += 0.01;
		joint2.y += 0.01;
		f = 1;
	}

	let a1 = -(joint1.x - joint2.x) / (ysub);
	let ROOTBU = Math.sqrt(((joint1.r) * (joint1.r)) / (1 + (a1 * a1)));
	let x0 = ROOTBU + joint1.x;
	let y0 = a1 * (x0 - joint1.x) + joint1.y;
	let x1 = -ROOTBU + joint1.x;
	let y1 = a1 * (x1 - joint1.x) + joint1.y;
	// console.log(ysub);

	return {
		x0: x0,
		y0: y0,
		x1: x1,
		y1: y1,
		f: f
	};
}

class circle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 10;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
		ctx.fill();
	}

	move(x, y) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.arc(this.x, this.y, this.r + 1, 0, 2 * Math.PI, true);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "rgb(0,32,99)";
		ctx.arc(x, y, this.r, 0, 2 * Math.PI, true);
		ctx.fill();

		this.x = x;
		this.y = y;

	}
	remove() {
		ctx.beginPath();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.arc(this.x, this.y, this.r + 1, 0, 2 * Math.PI, true);
		ctx.fill();
		ctx.fillStyle = "rgb(0,32,99)";
	}

	isHit(x, y) {
		let distance = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
		let hit = distance < this.r * this.r;
		return hit;
	}

}

class kosi extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 50;
	}
}
class hiza extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 30;
	}
}
class tumasaki extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 20;
	}
}
class atama extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 45;
	}
}
class kata extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 35;
	}
}
class hiji extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 25;
	}
}
class te extends circle {
	constructor(x, y) {
		super(x, y);
		super.r = 15;
	}
}

function savePng() {
	let png = canvas.toDataURL();
	let ha = document.getElementById("gazo")
	ha.src = png;
}