
function Game() {
	this.carSpawnTimer = 0;

	this.countDownTimer = config.countdowntimer;
	this.countDown = 3;
	this.countDownScale = config.countdownstartscale;
}

Game.prototype.update = function() {
	var canvas = Model.I.canvas;
	var ctx = Model.I.ctx;

	// Spawn more cars on a timer
	if(this.countDown < 1) {
		this.carSpawnTimer += config.basespawnrate * canvas.width;
		while(this.carSpawnTimer >= 1) {
			this.carSpawnTimer--;
			if(Model.I.cars.length > config.maxnumberofcars) continue;
			new Car(V.add(Player.I.pos, V.trig(Math.random() * Math.PI*2, config.carspawndistance)));
		}
	}

	// Update cars
	for(var i = 0; i < Model.I.cars.length; i++) {
		if(Model.I.cars[i].update(Model.I)) {
			Model.I.cars.splice(i, 1);
			i--;
		}
	}

	// Move the Player
	if(config.mousecontrols) {
		Player.I.pos = new V(Engine.I.mouse.pos);
	} else {
		Player.I.vel = Player.I.vel.scale(config.playerfriction);
		steering = Engine.I.doSteeringControls(config.playeraccel, config.playerrotationaccel, [38,37,40,39]);
		Player.I.rotVel *= config.playerrotationfriction;
		Player.I.rotVel += steering.rotate;
		Player.I.rot += Player.I.rotVel;
		Player.I.speed += steering.move;
		Player.I.vel.accum(V.trig(Player.I.rot, Player.I.speed));
		Player.I.pos.accum(Player.I.vel);
	}
	
	// Spawn gravel under the player
	var playerCarCorners = getRotatableBoxCorners(Player.I);
	if(Math.random() < config.gravelspawnchance) new Gravel(playerCarCorners[0], Player.I.vel);
	if(Math.random() < config.gravelspawnchance) new Gravel(playerCarCorners[3], Player.I.vel);

	// Update gravel
	for(var i = 0; i < Model.I.gravel.length; i++) {
		if(Model.I.gravel[i].update(Model.I)) {
			Model.I.gravel.splice(i, 1);
			i--;
		}
	}

	// Draw
	Model.I.draw("all");

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
	if(Player.I.dead) {
		Engine.I.state = new GameOver();
	}
};
