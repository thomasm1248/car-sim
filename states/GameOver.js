
function GameOver(distanceTraveled) {
	var ctx = Model.I.ctx;

	this.distanceTraveled = distanceTraveled;

	this.timerUntilTextDisplayed = config.gameovertexttimer;
	this.progress = 0;

	Player.I.speed = 0;
	Player.I.rotVel *= -2;

	// Stop making the camera follow the player
	Model.I.followPlayer = false;
	
	// Make the player stop phasing if they are
	Player.I.isPhasing = false;

	// Spawn a bunch of dust around the player
	for(var i = 0; i < config.crashdustamount; i++) {
		new Dust(Player.I.pos, new V(config.crashdustvelocity, config.crashdustvelocity));
	}
}

GameOver.prototype.update = function() {
	var canvas = Model.I.canvas;
	var ctx = Model.I.ctx;

	// Update cars
	for(var i = 0; i < Model.I.cars.length; i++) {
		if(Model.I.cars[i].update(Model.I)) {
			Model.I.cars.splice(i, 1);
			i--;
		}
	}

	// Move the Player
	Player.I.vel = Player.I.vel.scale(config.playercrashfriction);
	Player.I.rotVel *= config.playerrotationfriction;
	Player.I.rot += Player.I.rotVel;
	Player.I.vel.accum(V.trig(Player.I.rot, Player.I.speed));
	Player.I.pos.accum(Player.I.vel);
	
	// Spawn dust under the player
	var playerCarCorners = getRotatableBoxCorners(Player.I);
	if(Math.random() < config.dustspawnchance) new Dust(playerCarCorners[0], Player.I.vel);
	if(Math.random() < config.dustspawnchance) new Dust(playerCarCorners[3], Player.I.vel);

	// Update dust
	for(var i = 0; i < Model.I.dust.length; i++) {
		if(Model.I.dust[i].update(Model.I)) {
			Model.I.dust.splice(i, 1);
			i--;
		}
	}

	// Draw
	Model.I.draw("all");

	// Draw "Game Over"
	this.timerUntilTextDisplayed--;
	if(this.timerUntilTextDisplayed < 0) {
		this.progress = snap(0, this.progress + config.gameoverprogressrate, 1);
		ctx.save();
		ctx.fillStyle = "#f4d99f";
		ctx.globalAlpha = snap(0, this.progress, 0.6);
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width * this.progress, canvas.height);
		ctx.clip();
		ctx.globalAlpha = 0.5;
		ctx.textAlign = "center";
		ctx.font = "bold 120px Serif";
		ctx.fillStyle = "#110901";
		ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
		ctx.font = "bold 30px Serif";
		ctx.fillText("Press Spacebar to play again", canvas.width/2, canvas.height/2 + 100);
		ctx.restore();
	}

	// Display the distance driven from the origin
	ctx.fillStyle = "#352311";
	ctx.textAlign = "left";
	ctx.font = "bold 40px Serif";
	ctx.fillText("Distance: " + this.distanceTraveled, 40, canvas.height - 40);

	// Restart if the player presses the spacebar
	var keysPressed = Engine.I.keys.keyQueue;
	while(keysPressed.length)
		if(keysPressed.pop() == 32)
			Engine.I.state = new Game();
};
