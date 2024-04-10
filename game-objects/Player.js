
function Player(pos) {
	this.pos = new V(pos);
	this.vel = new V();
	this.speed = 0;

	this.rot = -Math.PI/2;
	this.rotVel = 0;

	this.boxOffset = new V(0, -20);
	this.boxSize = new V(60, 40);
	this.dead = false;

	Player.I = this;
}

Player.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.rot);
	ctx.strokeStyle = "orange";
	ctx.lineWidth = 5;
	ctx.strokeRect(this.boxOffset.x, this.boxOffset.y, this.boxSize.x, this.boxSize.y);
	ctx.restore();
}
