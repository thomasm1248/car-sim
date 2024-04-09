
function Game(engine) {
	this.engine = engine;

	this.rockTimer = 0;

	this.countDownTimer = engine.config.countdowntimer;
	this.countDown = 3;
	this.countDownScale = engine.config.countdownstartscale;
}

Game.prototype.update = function() {
	var model = this.engine.model;
	var player = model.player;
	var config = this.engine.config;
	var canvas = this.engine.canvas;
	var ctx = this.engine.ctx;

	// Spawn more rocks on a timer
	if(this.countDown < 1) {
		this.rockTimer += config.basespawnrate * canvas.width;
		while(this.rockTimer >= 1) {
			this.rockTimer--;
			if(Math.random() < config.dartchance) {
				model.things.push(new Dart(new V(Math.random() * canvas.width, -20)));
			} else if(Math.random() < config.wallchance) {
				model.things.push(new Wall(new V(Math.random() * canvas.width, -20), config.wallwidth));
			} else {
				model.things.push(new Rock(new V(Math.random() * canvas.width, -20)));
			}
		}
	}

	// Update the things
	for(var i = 0; i < model.things.length; i++) {
		if(model.things[i].update(model)) {
			model.things.splice(i, 1);
			i--;
		}
	}

	// Move the Player
	if(config.mousecontrols) {
		player.pos = new V(this.engine.mouse.pos);
	} else {
		player.vel = player.vel.scale(config.playerfriction);
		steering = this.engine.doSteeringControls(config.playeraccel, config.playerrotationaccel, [38,37,40,39]);
		player.rotVel *= config.playerrotationfriction;
		player.rotVel += steering.rotate;
		player.rot += player.rotVel;
		player.vel.accum(V.trig(steering.move, player.rot));
		player.pos.accum(player.vel);
	}

	// Draw
	this.engine.model.draw("all");

	// Draw countdown at the beginning of the game
	if(this.countDown > 0) {
		// Make it smaller
		this.countDownScale *= 0.99;

		// Draw it
		ctx.save();
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.scale(this.countDownScale, this.countDownScale);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "bold 100px Serif";
		ctx.globalAlpha = 1 - this.countDownScale / config.countdownstartscale;
		ctx.fillText("" + this.countDown, 0, 40);
		ctx.restore();

		// Keep counting down
		this.countDownTimer--;
		if(this.countDownTimer < 0) {
			this.countDownTimer = config.countdowntimer;
			this.countDown--;
			this.countDownScale = config.countdownstartscale;
		}
	}

	// If the player is dead, switch to Game Over
	if(player.dead) {
		this.engine.state = new GameOver(this.engine);
	}
};
