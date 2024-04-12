
function Player(pos) {
	this.pos = new V(pos);
	this.vel = new V();
	this.speed = 0;

	this.rot = -Math.PI/2;
	this.rotVel = 0;

	this.boxOffset = new V(0, -20);
	this.boxSize = new V(60, 40);
	this.dead = false;

	this.isPhasing = false;
	this.phasingAnimationFrame = 0;
	this.phasingTimer = 0;

	Player.I = this;
}

Player.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.rot);
	// Apply phase effect if currently phasing
	if(this.isPhasing) {
		var stripeWidth = 10;
		var stripeLength = 25;
		ctx.beginPath();
		for(var i = (1-this.phasingAnimationFrame) * stripeWidth*2 - 30; i < 65; i += stripeWidth*2) {
			ctx.moveTo(i+stripeLength, -stripeLength);
			ctx.lineTo(i, 0);
			ctx.lineTo(i+stripeLength, stripeLength);
			ctx.lineTo(i+stripeLength+stripeWidth, stripeLength);
			ctx.lineTo(i+stripeWidth, 0);
			ctx.lineTo(i+stripeLength+stripeWidth, -stripeLength);
		}
		ctx.clip();
		this.phasingAnimationFrame += config.phaseanimationrate;
		this.phasingAnimationFrame %= 1;
		this.phasingTimer--;
		if(this.phasingTimer < 0) this.isPhasing = false;
	}
	// Draw phase power indicator
	if(Engine.I.state.phasingCooldown != undefined && Engine.I.state.phasingCooldown == 0) {
		ctx.fillStyle = "orange";
		var margin = 10;
		ctx.fillRect(this.boxOffset.x + margin, this.boxOffset.y + margin, this.boxSize.x - margin*2, this.boxSize.y - margin*2);
	}
	// Draw box
	ctx.strokeStyle = "#2867af";
	ctx.lineWidth = 5;
	ctx.strokeRect(this.boxOffset.x, this.boxOffset.y, this.boxSize.x, this.boxSize.y);
	ctx.restore();
}
