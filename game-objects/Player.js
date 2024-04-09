
function Player(pos) {
	this.pos = pos;
	this.vel = new V();
	this.rot = 0;
	this.rotVel = 0;
	this.rad = 20;
	this.box = new V(this.rad, this.rad);
	this.dead = false;
}

Player.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.rot);
	ctx.strokeStyle = "orange";
	ctx.lineWidth = 5;
	ctx.strokeRect(-this.box.x, -this.box.y, this.box.x*2, this.box.y*2);
	ctx.restore();
}
